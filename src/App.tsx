import React, { useState } from "react";

import bracketSets from "./bracketSets.json";
import Gutter from "./display/Gutter";
import Settings from "./Settings";
import Table from "./Table";
import { BracketSetsKey, FilingType } from "./typings";

const App: React.FC = () => {
  const [bracketSetsKey, setBracketSetsKey] = useState<BracketSetsKey>("2020");
  const [filingType, setFilingType] = useState<FilingType>("single");
  const [income, setIncome] = useState<number>(100000);

  return (
    <div className="container">
      <h1>US Federal Income Taxes</h1>
      <Gutter />
      <Gutter />
      <Settings
        bracketSetsKey={bracketSetsKey}
        filingType={filingType}
        income={income}
        onBracketSetsKeyChange={setBracketSetsKey}
        onFilingTypeChange={setFilingType}
        onIncomeChange={setIncome}
      />
      <Gutter />
      <Gutter />
      <Table
        bracketSet={bracketSets[bracketSetsKey]}
        filingType={filingType}
        income={income}
      />
    </div>
  );
};

export default App;
