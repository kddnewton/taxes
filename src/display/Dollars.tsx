import React from "react";

export const formatAmount = (amount: number) => {
  const dollars = Math.floor(amount).toLocaleString("en");
  const cents = amount.toFixed(2).split(".")[1];

  return cents == "00" ? `$${dollars}` : `$${dollars}.${cents}`;
};

type DollarProps = {
  amount: number;
};

const Dollars: React.FC<DollarProps> = ({ amount }) => (
  <>{formatAmount(amount)}</>
);

export default Dollars;
