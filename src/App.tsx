import React, { useState } from "react";

import bracketSets from "./bracketSets.json";
import Settings from "./Settings";
import Table from "./Table";
import { BracketSetsKey, FilingType } from "./typings";

const App: React.FC = () => {
  const [bracketSetsKey, setBracketSetsKey] = useState<BracketSetsKey>("2020");
  const [filingType, setFilingType] = useState<FilingType>("single");
  const [income, setIncome] = useState<number>(100000);

  return (
    <div style={{ width: "50%", margin: "10% 25%", textAlign: "center" }}>
      <Settings
        bracketSetsKey={bracketSetsKey}
        filingType={filingType}
        income={income}
        onBracketSetsKeyChange={setBracketSetsKey}
        onFilingTypeChange={setFilingType}
        onIncomeChange={setIncome}
      />
      <Table
        bracketSet={bracketSets[bracketSetsKey]}
        filingType={filingType}
        income={income}
      />
    </div>
  );
};

export default App;
