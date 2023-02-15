import React from "react";

import Dollars from "./display/Dollars";
import Modal from "./display/Modal";
import ProgressBar from "./display/ProgressBar";
import { BracketSet, FilingType } from "./typings";

import styles from "./table.module.css";

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

const TableRow: React.FC<TableRowProps> = ({ income, segment }) => {
  const disabled = income <= segment.minimum;

  return (
    <>
      <tr className={styles.data}>
        <td>
          <Modal>
            <Modal.Trigger disabled={disabled}>
              <Dollars amount={segment.minimum} />
            </Modal.Trigger>
            <Modal.Content>
              <h2>
                <Dollars amount={segment.minimum} />
              </h2>
              <p>
                This is the lower limit of this tax bracket. Any income you earn
                below this amount will be taxed at a lower rate (if there is
                one). Any income you earn between this amount
                (<Dollars amount={segment.minimum} />) and the upper limit of
                this bracket
                ({segment.maximum ? <Dollars amount={segment.maximum} /> : "none"})
                will be taxed at the rate of this bracket.
              </p>
            </Modal.Content>
          </Modal>
        </td>
        <td>
          {segment.maximum && (
            <Modal>
              <Modal.Trigger disabled={disabled}>
                <Dollars amount={segment.maximum} />
              </Modal.Trigger>
              <Modal.Content>
                <h2>
                  <Dollars amount={segment.maximum} />
                </h2>
                <p>
                  This is the upper limit of this tax bracket. Any income you
                  earn above this amount will be taxed at a higher rate. Any
                  income earned between the lower limit of this bracket and this
                  amount will be taxed at the rate of this bracket.
                </p>
              </Modal.Content>
            </Modal>
          )}
        </td>
        <td>
          <Modal>
            <Modal.Trigger disabled={disabled}>
              {segment.rate}%
            </Modal.Trigger>
            <Modal.Content>
              <h2>
                {segment.rate}%
              </h2>
              <p>
                This is the rate of this tax bracket. Any income you earn above
                the lower limit and below the upper of this bracket will be
                taxed at this rate.
              </p>
            </Modal.Content>
          </Modal>
        </td>
        <td>
          <Modal>
            <Modal.Trigger disabled={disabled}>
              <Dollars amount={segment.amount} full />
            </Modal.Trigger>
            <Modal.Content>
              <h2>
                <Dollars amount={segment.amount} />
              </h2>
              <p>
                This is the total amount of taxes that you&apos;re paying for
                this tax bracket. It is the result of multiplying the total
                amount of income that falls within this bracket
                (<Dollars amount={segment.total} />) by the rate of this bracket
                ({segment.rate}%).
              </p>
            </Modal.Content>
          </Modal>
        </td>
      </tr>
      <tr className={styles.progress}>
        <td colSpan={4}>
          <ProgressBar value={segment.percent} />
        </td>
      </tr>
    </>
  );
};

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

  const effectiveRate = (amount / income * 100).toFixed(2);

  return (
    <table className={styles.table}>
      <thead className={styles.header}>
        <tr>
          <th>Lower</th>
          <th>Upper</th>
          <th>Rate</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {segments.map(segment => (
          <TableRow key={segment.rate} income={income} segment={segment} />
        ))}
      </tbody>
      <tfoot className={styles.footer}>
        <tr className={styles.data}>
          <td colSpan={2} />
          <td>
            <Modal>
              <Modal.Trigger>
                {effectiveRate}%
              </Modal.Trigger>
              <Modal.Content>
                <h2>{effectiveRate}%</h2>
                <p>
                  This is what is called your &quot;effective rate&quot;. It is
                  a result of dividing the total amount of taxes that you owe by
                  your income. Another way of thinking about it is the weighted
                  average of the rates of the tax brackets in which your income
                  falls.
                </p>
              </Modal.Content>
            </Modal>
          </td>
          <td>
            <Modal>
              <Modal.Trigger>
                <Dollars amount={amount} full />
              </Modal.Trigger>
              <Modal.Content>
                <h2>
                  <Dollars amount={amount} />
                </h2>
                <p>
                  This is the total amount of money that you owe in federal
                  income taxes. It is the result of adding up each number in
                  this column, which represent the total in each bracket.
                </p>
              </Modal.Content>
            </Modal>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Table;
