import React from "react";

const formatDollars = (dollars: string) => {
  if (dollars.length <= 3) {
    return dollars;
  }

  const separated: string[] = [];

  dollars.split("").reverse().forEach((digit, index) => {
    if (index > 0 && index % 3 === 0) {
      separated.push(",")
    }
    separated.push(digit);
  });

  return separated.reverse().join("");
};

const formatAmount = (amount: number) => {
  const [dollars, cents] = amount.toFixed(2).split(".");

  return `${formatDollars(dollars)}.${cents}`;
};

type DollarProps = {
  amount: number;
};

const Dollars: React.FC<DollarProps> = ({ amount }) => (
  <>{formatAmount(amount)}</>
);

export default Dollars;
