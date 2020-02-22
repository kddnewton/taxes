import React from "react";

const getFormattedDollars = (dollars: string) => {
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

type MoneyProps = {
  amount: number;
};

const Money: React.FC<MoneyProps> = ({ amount }) => {
  const [dollars, cents] = amount.toFixed(2).split(".");

  return <>${getFormattedDollars(dollars)}.{cents}</>;
};

export default Money;
