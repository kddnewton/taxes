import React, { useState } from "react";
import ReactDOM from "react-dom";

type Bracket = {
  minimum: number;
  rate: number;
};

const brackets: Bracket[] = [
  { minimum: 0,      rate: 10   },
  { minimum: 17850,  rate: 15   },
  { minimum: 72500,  rate: 25   },
  { minimum: 146400, rate: 28   },
  { minimum: 223050, rate: 33   },
  { minimum: 398350, rate: 35   },
  { minimum: 450000, rate: 39.6 }
];

type IncomeButtonProps = {
  value: number;
  setIncome: (value: number) => void;
};

const IncomeButton: React.FC<IncomeButtonProps> = ({ value, setIncome }) => (
  <button type="button" onClick={() => setIncome(value)}>
    {value / 1000}K
  </button>
);

const getAmount = (income: number, minimum: number, maximum?: number) => {
  if (income < minimum) {
    return 0;
  }
  if (!maximum || income < maximum) {
    return income - minimum;
  }
  return maximum - minimum;
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
      <Amount amount={bracket.minimum} />
    </td>
    <td>
      {nextBracket && <Amount amount={nextBracket.minimum} />}
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
  const [income, setIncome] = useState<number>(100000);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIncome(parseInt(event.target.value, 10));
  };

  let taxTotal = 0;
  const amounts = brackets.map((bracket, index) => {
    const nextBracket = brackets[index + 1];
    const amount = getAmount(income, bracket.minimum, nextBracket && nextBracket.minimum);

    taxTotal += amount * bracket.rate / 100;
    return amount;
  });

  return (
    <div style={{ width: "50%", margin: "10% 25%", textAlign: "center" }}>
      <input
        type="number"
        name="income"
        onChange={onChange}
        value={income}
      />
      <p>
        <IncomeButton value={50000} setIncome={setIncome} />
        <IncomeButton value={100000} setIncome={setIncome} />
        <IncomeButton value={250000} setIncome={setIncome} />
        <IncomeButton value={500000} setIncome={setIncome} />
        <IncomeButton value={1000000} setIncome={setIncome} />
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
          {brackets.map((rate, index) => (
            <Segment
              key={rate.minimum}
              amount={amounts[index]}
              bracket={rate}
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
