import React from "react";

import bracketSets from "./bracketSets.json";
import { BracketSetsKey, FilingType } from "./typings";

type IncomeButtonProps = {
  value: number;
  onClick: (value: number) => void;
};

const IncomeButton: React.FC<IncomeButtonProps> = ({ children, value, onClick }) => (
  <button type="button" onClick={() => onClick(value)}>
    {children || `${value / 1000}K`}
  </button>
);

type SettingsProps = {
  bracketSetsKey: BracketSetsKey;
  filingType: FilingType;
  income: number;
  onBracketSetsKeyChange: (value: BracketSetsKey) => void;
  onFilingTypeChange: (value: FilingType) => void;
  onIncomeChange: (value: number) => void;
};

const Settings: React.FC<SettingsProps> = ({
  bracketSetsKey,
  filingType,
  income,
  onBracketSetsKeyChange,
  onFilingTypeChange,
  onIncomeChange
}) => {
  const handleBracketSetsKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onBracketSetsKeyChange(event.target.value as BracketSetsKey);
  };

  const handleFilingTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilingTypeChange(event.target.value as FilingType);
  };

  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onIncomeChange(parseInt(event.target.value, 10));
  };

  return (
    <p style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="year">
        Year
        <select id="year" name="year" onChange={handleBracketSetsKeyChange} value={bracketSetsKey}>
          {Object.keys(bracketSets).map(key => (
            <option key={key} value={key}>{key}</option>
          ))}
        </select>
      </label>
      <label htmlFor="type">
        Filing Type
        <select id="type" name="type" onChange={handleFilingTypeChange} value={filingType}>
          <option value="single">Single</option>
          <option value="joint">Married Filing Jointly</option>
          <option value="heads">Heads of Households</option>
        </select>
      </label>
      <label htmlFor="income">
        Income
        <input
          type="number"
          id="income"
          name="income"
          onChange={handleIncomeChange}
          value={income}
        />
      </label>
      <p>
        <IncomeButton value={50000} onClick={onIncomeChange} />
        <IncomeButton value={100000} onClick={onIncomeChange} />
        <IncomeButton value={250000} onClick={onIncomeChange} />
        <IncomeButton value={500000} onClick={onIncomeChange} />
        <IncomeButton value={1000000} onClick={onIncomeChange}>
          1M
        </IncomeButton>
      </p>
    </p>
  );
};

export default Settings;
