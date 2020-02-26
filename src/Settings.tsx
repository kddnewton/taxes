import React from "react";

import bracketSets from "./bracketSets.json";
import Select from "./Select";
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
  const handleIncomeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onIncomeChange(parseInt(event.target.value, 10));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor="year">
        Fiscal Year
        <Select<BracketSetsKey>
          id="year"
          name="year"
          className="form-control"
          onChange={onBracketSetsKeyChange}
          options={Object.keys(bracketSets).map(value => ({
            label: value, value
          }))}
          value={bracketSetsKey}
        />
      </label>
      <label htmlFor="type">
        Filing Type
        <Select<FilingType>
          id="type"
          name="type"
          className="form-control"
          onChange={onFilingTypeChange}
          options={[
            { label: "Single", value: "single" },
            { label: "Married Filing Jointly", value: "joint" },
            { label: "Heads of Households", value: "heads" }
          ]}
          value={filingType}
        />
      </label>
      <label htmlFor="income">
        Income
        <input
          className="form-control"
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
    </div>
  );
};

export default Settings;
