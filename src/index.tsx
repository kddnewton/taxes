import React, { useState } from "react";
import ReactDOM from "react-dom";

import bracketSets from "./bracketSets.json";
import Money from "./Money";

type BracketSets = typeof import("./bracketSets.json");
type BracketSetKey = keyof BracketSets;

type Bracket = BracketSets extends ({ [key: string]: (infer U)[] }) ? U : never;

type IncomeButtonProps = {
  value: number;
  setIncome: (value: number) => void;
};

const IncomeButton: React.FC<IncomeButtonProps> = ({ children, value, setIncome }) => (
  <button type="button" onClick={() => setIncome(value)}>
    {children || `${value / 1000}K`}
  </button>
);

const getAmount = (income: number, min: number, max?: number) => {
  if (income < min) {
    return 0;
  }
  if (!max || income < max) {
    return income - min;
  }
  return max - min;
};

type SegmentProps = {
  amount: number;
  bracket: Bracket;
  nextBracket?: Bracket;
  income: number;
};

const Segment: React.FC<SegmentProps> = ({ amount, bracket, nextBracket, income }) => (
  <tr>
    <td>
      <Money amount={bracket.joint} />
    </td>
    <td>
      {nextBracket && <Money amount={nextBracket.joint} />}
    </td>
    <td>{bracket.rate}%</td>
    <td>
      <Money amount={amount} />
    </td>
    <td>
      <Money amount={amount * bracket.rate / 100} />
    </td>
  </tr>
);

const App = () => {
  const [bracketSetKey, setBracketSetKey] = useState<BracketSetKey>("2020");
  const onBracketSetKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBracketSetKey(event.target.value as BracketSetKey);
  };

  const [income, setIncome] = useState<number>(100000);
  const onIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(parseInt(event.target.value, 10));
  };

  let taxTotal = 0;
  const bracketSet = bracketSets[bracketSetKey];

  const amounts = bracketSet.map((bracket, index) => {
    const nextBracket = bracketSet[index + 1];
    const amount = getAmount(income, bracket.joint, nextBracket && nextBracket.joint);

    taxTotal += amount * bracket.rate / 100;
    return amount;
  });

  return (
    <div style={{ width: "50%", margin: "10% 25%", textAlign: "center" }}>
      <p>
        <label htmlFor="year">
          Year
          <select id="year" name="year" onChange={onBracketSetKeyChange} value={bracketSetKey}>
            {Object.keys(bracketSets).map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <label htmlFor="income">
          Income
          <input
            type="number"
            id="income"
            name="income"
            onChange={onIncomeChange}
            value={income}
          />
        </label>
      </p>
      <p>
        <IncomeButton value={50000} setIncome={setIncome} />
        <IncomeButton value={100000} setIncome={setIncome} />
        <IncomeButton value={250000} setIncome={setIncome} />
        <IncomeButton value={500000} setIncome={setIncome} />
        <IncomeButton value={1000000} setIncome={setIncome}>
          1M
        </IncomeButton>
      </p>
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
          {bracketSet.map((bracket, index) => (
            <Segment
              key={bracket.rate}
              amount={amounts[index]}
              bracket={bracket}
              nextBracket={bracketSet[index + 1]}
              income={income}
            />
          ))}
        </tbody>
      </table>
      <p>
        <strong>Total:</strong> <Money amount={taxTotal} />
      </p>
      <p>
        <strong>Effective Rate:</strong> {(taxTotal / income * 100).toFixed(2)}%
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
