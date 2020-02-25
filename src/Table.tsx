import React from "react";

import Dollars from "./Dollars";
import { Bracket, BracketSet, FilingType } from "./typings";

type Segment = {
  minimum: number;
  maximum?: number;
  rate: number;
  bracketTotal: number;
  taxTotal: number;
};

const getBracketTotal = (income: number, minimum: number, maximum?: number) => {
  if (income < minimum) {
    return 0;
  }
  if (!maximum || income < maximum) {
    return income - minimum;
  }
  return maximum - minimum;
};

const makeSegments = ({ bracketSet, filingType, income }: TableProps): Segment[] => (
  bracketSet.map((bracket, index) => {
    const minimum = bracket[filingType];

    const nextBracket = bracketSet[index + 1];
    const maximum = nextBracket && nextBracket[filingType];

    const bracketTotal = getBracketTotal(income, minimum, maximum);

    return {
      minimum,
      maximum,
      rate: bracket.rate,
      bracketTotal,
      taxTotal: bracketTotal * bracket.rate / 100
    };
  })
);

type TableRowProps = {
  segment: Segment;
};

const TableRow: React.FC<TableRowProps> = ({ segment }) => (
  <tr>
    <td>
      <Dollars amount={segment.minimum} />
    </td>
    <td>
      {segment.maximum && <Dollars amount={segment.maximum} />}
    </td>
    <td>{segment.rate}%</td>
    <td>
      <Dollars amount={segment.bracketTotal} />
    </td>
    <td>
      <Dollars amount={segment.taxTotal} />
    </td>
  </tr>
);

type TableProps = {
  bracketSet: BracketSet;
  filingType: FilingType;
  income: number;
};

const Table: React.FC<TableProps> = ({ bracketSet, filingType, income }) => {
  const segments = makeSegments({ bracketSet, filingType, income });

  let taxTotal = 0;
  segments.forEach(segment => {
    taxTotal += segment.taxTotal;
  });

  return (
    <>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Bottom</th>
            <th>Top</th>
            <th>Rate</th>
            <th>Bracket Total</th>
            <th>Bracket Amount</th>
          </tr>
        </thead>
        <tbody>
          {segments.map(segment => (
            <TableRow key={segment.rate} segment={segment} />
          ))}
        </tbody>
      </table>
      <p>
        <strong>Total:</strong> <Dollars amount={taxTotal} />
      </p>
      <p>
        <strong>Effective Rate:</strong> {(taxTotal / income * 100).toFixed(2)}%
      </p>
    </>
  );
};

export default Table;
