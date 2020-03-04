import React from "react";

import Dollars from "./display/Dollars";
import Modal from "./display/Modal";
import ProgressBar from "./display/ProgressBar";
import { BracketSet, FilingType } from "./typings";

type Segment = {
  minimum: number;
  maximum?: number;
  total: number;
  rate: number;
  amount: number;
  percent: number;
};

const makeSegments = ({ bracketSet, filingType, income }: TableProps): Segment[] => (
  bracketSet.map((bracket, index) => {
    const minimum = bracket[filingType];

    const nextBracket = bracketSet[index + 1];
    const maximum = nextBracket && nextBracket[filingType];

    let total: number;

    if (income < minimum) {
      total = 0;
    } else if (!maximum || income < maximum) {
      total = income - minimum;
    } else {
      total = maximum - minimum;
    }

    return {
      minimum,
      maximum,
      total,
      rate: bracket.rate,
      amount: total * bracket.rate / 100,
      percent: maximum ? (total / (maximum - minimum)) * 100 : 0
    };
  })
);

type TableRowProps = {
  income: number;
  segment: Segment;
};

const TableRow: React.FC<TableRowProps> = ({ income, segment }) => (
  <>
    <tr className={income <= segment.minimum ? "bordered disabled" : "bordered"}>
      <td>
        <Modal>
          <Modal.Trigger>
            <Dollars amount={segment.minimum} />
          </Modal.Trigger>
          <Modal.Content>
            This is the bottom of this tax bracket. Any income you earn below
            this amount will be taxed at a lower rate. Any income you earn above
            this amount and below the maximum of this bracket will be taxed at
            this rate.
          </Modal.Content>
        </Modal>
      </td>
      <td>
        {segment.maximum && (
          <Modal>
            <Modal.Trigger>
              <Dollars amount={segment.maximum} />
            </Modal.Trigger>
            <Modal.Content>
              This is the top of this tax bracket. Any income you earn above
              this amount will be taxed at a higher rate.
            </Modal.Content>
          </Modal>
        )}
      </td>
      <td>
        <Modal>
          <Modal.Trigger>
            <Dollars amount={segment.total} />
          </Modal.Trigger>
          <Modal.Content>
            This is the total amount of your income that falls within this tax
            bracket.
          </Modal.Content>
        </Modal>
      </td>
      <td>
        <Modal>
          <Modal.Trigger>{segment.rate}%</Modal.Trigger>
          <Modal.Content>
            This is the rate of this tax bracket. Any income you earn above the
            bottom and below the top of this bracket will be taxed at this rate.
          </Modal.Content>
        </Modal>
      </td>
      <td>
        <Modal>
          <Modal.Trigger>
            <Dollars amount={segment.amount} />
          </Modal.Trigger>
          <Modal.Content>
            This is the total amount of taxes that you&apos;re paying for this
            tax bracket. It is the result of multiplying the total amount of
            income that falls within this bracket by the rate of this bracket.
          </Modal.Content>
        </Modal>
      </td>
    </tr>
    <tr className="progress">
      <td colSpan={5}>
        <ProgressBar value={segment.percent} />
      </td>
    </tr>
  </>
);

type TableProps = {
  bracketSet: BracketSet;
  filingType: FilingType;
  income: number;
};

const Table: React.FC<TableProps> = ({ bracketSet, filingType, income }) => {
  const segments = makeSegments({ bracketSet, filingType, income });

  let amount = 0;
  segments.forEach(segment => {
    amount += segment.amount;
  });

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Bottom</th>
            <th>Top</th>
            <th>Total</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {segments.map(segment => (
            <TableRow key={segment.rate} income={income} segment={segment} />
          ))}
        </tbody>
        <tfoot>
          <tr className="bordered">
            <td colSpan={3} />
            <td>
              <Modal>
                <Modal.Trigger>
                  {(amount / income * 100).toFixed(2)}%
                </Modal.Trigger>
                <Modal.Content>
                  This is what is called your &quot;effective rate&quot;. It is
                  a result of dividing the total amount of taxes that you owe by
                  your income. Another way of thinking about it is the weighted
                  average of the rates of the tax brackets in which your income
                  falls.
                </Modal.Content>
              </Modal>
            </td>
            <td>
              <Modal>
                <Modal.Trigger>
                  <Dollars amount={amount} />
                </Modal.Trigger>
                <Modal.Content>
                  This is the total amount of money that you owe in federal
                  income taxes. It is the result of adding up each number in
                  this column, which represent the total in each bracket.
                </Modal.Content>
              </Modal>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
