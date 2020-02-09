import React, { useState } from "react";
import ReactDOM from "react-dom";

type Bracket = {
  min: number;
  rate: number;
};

const bracketSets: { [key: string]: Bracket[] } = {
  "2013": [
    { min: 0,      rate: 10   },
    { min: 17850,  rate: 15   },
    { min: 72500,  rate: 25   },
    { min: 146400, rate: 28   },
    { min: 223050, rate: 33   },
    { min: 398350, rate: 35   },
    { min: 450000, rate: 39.6 }
  ],
  "2012": [
    { min: 0,      rate: 10 },
    { min: 17400,  rate: 15 },
    { min: 70700,  rate: 25 },
    { min: 142700, rate: 28 },
    { min: 217450, rate: 33 },
    { min: 388350, rate: 35 }
  ]
};

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

type AmountProps = {
  amount: number;
};

const Amount: React.FC<AmountProps> = ({ amount }) => {
  const [dollars, cents] = amount.toFixed(2).split(".");
  let formatted = dollars;

  if (formatted.length > 3) {
    const separated: string[] = [];

    formatted.split("").reverse().forEach((digit, index) => {
      if (index > 0 && index % 3 === 0) {
        separated.push(",")
      }

      separated.push(digit);
    });

    formatted = separated.reverse().join("");
  }

  return <>${formatted}.{cents}</>;
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
      <Amount amount={bracket.min} />
    </td>
    <td>
      {nextBracket && <Amount amount={nextBracket.min} />}
    </td>
    <td>{bracket.rate}%</td>
    <td>
      <Amount amount={amount} />
    </td>
    <td>
      <Amount amount={amount * bracket.rate / 100} />
    </td>
  </tr>
);

const App = () => {
  const [bracketSet, setBracketSet] = useState<string>("2013");
  const onBracketSetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBracketSet(event.target.value);
  };

  const [income, setIncome] = useState<number>(100000);
  const onIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(parseInt(event.target.value, 10));
  };

  let taxTotal = 0;
  const amounts = bracketSets[bracketSet].map((bracket, index, brackets) => {
    const nextBracket = brackets[index + 1];
    const amount = getAmount(income, bracket.min, nextBracket && nextBracket.min);

    taxTotal += amount * bracket.rate / 100;
    return amount;
  });

  return (
    <div style={{ width: "50%", margin: "10% 25%", textAlign: "center" }}>
      <p>
        <label htmlFor="year">
          Year
          <select id="year" name="year" onChange={onBracketSetChange} value={bracketSet}>
            {Object.keys(bracketSets).map(bracketSet => (
              <option key={bracketSet} value={bracketSet}>{bracketSet}</option>
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
          {bracketSets[bracketSet].map((bracket, index, brackets) => (
            <Segment
              key={bracket.min}
              amount={amounts[index]}
              bracket={bracket}
              nextBracket={brackets[index + 1]}
              income={income}
            />
          ))}
        </tbody>
      </table>
      <p>
        <strong>Total:</strong> <Amount amount={taxTotal} />
      </p>
      <p>
        <strong>Effective Rate:</strong> {(taxTotal / income * 100).toFixed(2)}%
      </p>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
