import React from "react";

import Dollars from "./Dollars";
import Tooltip from "./Tooltip";
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
    let percent: number;

    if (income < minimum) {
      total = 0;
      percent = 0;
    } else if (!maximum) {
      total = income - minimum;
      percent = 0;
    } else if (income < maximum) {
      total = income - minimum;
      percent = (income - minimum) / (maximum - minimum) * 100;
    } else {
      total = maximum - minimum;
      percent = 100;
    }

    return {
      minimum,
      maximum,
      total,
      rate: bracket.rate,
      amount: total * bracket.rate / 100,
      percent
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
        <Dollars amount={segment.minimum} />
      </td>
      <td>
        {segment.maximum && <Dollars amount={segment.maximum} />}
      </td>
      <td>
        <Dollars amount={segment.total} />
      </td>
      <td>
        <Tooltip>
          <Tooltip.Trigger>{segment.rate}%</Tooltip.Trigger>
          <Tooltip.Content>
            The rate of this tax bracket. Income earned above the bottom and
            below the top of this bracket will be taxed at this rate.
          </Tooltip.Content>
        </Tooltip>
      </td>
      <td>
        <Dollars amount={segment.amount} />
      </td>
    </tr>
    <tr className="progress">
      <td colSpan={5}>
        <div
          data-percent={segment.percent}
          style={{ width: `${segment.percent}%` }}
        />
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
        <tbody className="monospace">
          {segments.map(segment => (
            <TableRow key={segment.rate} income={income} segment={segment} />
          ))}
        </tbody>
        <tfoot className="monospace">
          <tr className="bordered">
            <td colSpan={3} />
            <td>
              {(amount / income * 100).toFixed(2)}%
            </td>
            <td>
              <Dollars amount={amount} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
