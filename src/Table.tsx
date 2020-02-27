import React from "react";

import Dollars from "./display/Dollars";
import ProgressBar from "./display/ProgressBar";
import Tooltip from "./display/Tooltip";
import { Bracket, BracketSet, FilingType } from "./typings";

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
        <Tooltip>
          <Tooltip.Trigger>
            <Dollars amount={segment.minimum} />
          </Tooltip.Trigger>
          <Tooltip.Content>
            This is the bottom of this tax bracket. Any income you earn below
            this amount will be taxed at a lower rate. Any income you earn above
            this amount and below the maximum of this bracket will be taxed at
            this rate.
          </Tooltip.Content>
        </Tooltip>
      </td>
      <td>
        {segment.maximum && (
          <Tooltip>
            <Tooltip.Trigger>
              <Dollars amount={segment.maximum} />
            </Tooltip.Trigger>
            <Tooltip.Content>
              This is the top of this tax bracket. Any income you earn above
              this amount will be taxed at a higher rate.
            </Tooltip.Content>
          </Tooltip>
        )}
      </td>
      <td>
        <Tooltip>
          <Tooltip.Trigger>
            <Dollars amount={segment.total} />
          </Tooltip.Trigger>
          <Tooltip.Content>
            This is the total amount of your income that falls within this tax
            bracket.
          </Tooltip.Content>
        </Tooltip>
      </td>
      <td>
        <Tooltip>
          <Tooltip.Trigger>{segment.rate}%</Tooltip.Trigger>
          <Tooltip.Content>
            This is the rate of this tax bracket. Any income you earn above the
            bottom and below the top of this bracket will be taxed at this rate.
          </Tooltip.Content>
        </Tooltip>
      </td>
      <td>
        <Tooltip>
          <Tooltip.Trigger>
            <Dollars amount={segment.amount} />
          </Tooltip.Trigger>
          <Tooltip.Content>
            This is the total amount of taxes that you're paying for this tax
            bracket. It is the result of multiplying the total amount of income
            that falls within this bracket by the rate of this bracket.
          </Tooltip.Content>
        </Tooltip>
      </td>
    </tr>
    <tr className="progress">
      <td colSpan={5}>
        <Tooltip>
          <Tooltip.Trigger as="div">
            <ProgressBar value={segment.percent} />
          </Tooltip.Trigger>
          <Tooltip.Content>
            This represents the percentage of the above bracket that your income
            fulfills. If the line is green, it means that your income is above
            the top of this bracket. If the line is blue, it means that your
            income falls between the bottom and top of this bracket.
          </Tooltip.Content>
        </Tooltip>
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
              <Tooltip>
                <Tooltip.Trigger>
                  {(amount / income * 100).toFixed(2)}%
                </Tooltip.Trigger>
                <Tooltip.Content>
                  This is what is called your "effective rate". It is a result
                  of dividing the total amount of taxes that you owe by your
                  income. Another way of thinking about it is the weighted
                  average of the rates of the tax brackets in which your income
                  falls.
                </Tooltip.Content>
              </Tooltip>
            </td>
            <td>
              <Tooltip>
                <Tooltip.Trigger>
                  <Dollars amount={amount} />
                </Tooltip.Trigger>
                <Tooltip.Content>
                  This is the total amount of money that you owe in federal
                  income taxes. It is the result of adding up each number in
                  this column, which represent the total in each bracket.
                </Tooltip.Content>
              </Tooltip>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
