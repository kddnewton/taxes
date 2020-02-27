import React from "react";

import bracketSets from "./bracketSets.json";
import Gutter from "./display/Gutter";
import NumberInput from "./display/NumberInput";
import Select from "./display/Select";
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
}) => (
  <div className="flex-column">
    <div className="flex-row">
      <Select<BracketSetsKey>
        name="year"
        onChange={onBracketSetsKeyChange}
        options={Object.keys(bracketSets).map(value => ({
          label: value,
          value: value as BracketSetsKey
        }))}
        value={bracketSetsKey}
      >
        Fiscal Year
      </Select>
      <Select<FilingType>
        name="type"
        onChange={onFilingTypeChange}
        options={[
          { label: "Single", value: "single" },
          { label: "Married Filing Jointly", value: "joint" },
          { label: "Head of Household", value: "head" }
        ]}
        value={filingType}
      >
        Filing Type
      </Select>
    </div>
    <Gutter />
    <NumberInput
      name="income"
      onChange={onIncomeChange}
      value={income}
      min={0}
      step={1000}
    >
      Income
    </NumberInput>
    <div className="shortcuts">
      <IncomeButton value={25000} onClick={onIncomeChange} />
      <IncomeButton value={50000} onClick={onIncomeChange} />
      <IncomeButton value={100000} onClick={onIncomeChange} />
      <IncomeButton value={250000} onClick={onIncomeChange} />
      <IncomeButton value={500000} onClick={onIncomeChange} />
      <IncomeButton value={1000000} onClick={onIncomeChange}>
        1M
      </IncomeButton>
    </div>
  </div>
);

export default Settings;
