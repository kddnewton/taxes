import React from "react";

export const formatAmount = (amount: number, full?: boolean): string => {
  const dollars = Math.floor(amount).toLocaleString("en");
  const cents = amount.toFixed(2).split(".")[1];

  return cents == "00" && !full ? `$${dollars}` : `$${dollars}.${cents}`;
};

type DollarProps = {
  amount: number;
  full?: boolean;
};

const Dollars: React.FC<DollarProps> = ({ amount, full }) => (
  <>{formatAmount(amount, full)}</>
);

export default Dollars;
