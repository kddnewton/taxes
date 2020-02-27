import React, { useState } from "react";

import bracketSets from "./bracketSets.json";
import Gutter from "./display/Gutter";
import Settings from "./Settings";
import Table from "./Table";
import { BracketSetsKey, FilingType } from "./typings";

import styles from "./container.module.css";

const App: React.FC = () => {
  const [bracketSetsKey, setBracketSetsKey] = useState<BracketSetsKey>("2020");
  const [filingType, setFilingType] = useState<FilingType>("single");
  const [income, setIncome] = useState<number>(50000);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        US Federal Income Taxes
      </h1>
      <Gutter height={2} />
      <Settings
        bracketSetsKey={bracketSetsKey}
        filingType={filingType}
        income={income}
        onBracketSetsKeyChange={setBracketSetsKey}
        onFilingTypeChange={setFilingType}
        onIncomeChange={setIncome}
      />
      <Gutter height={2} />
      <Table
        bracketSet={bracketSets[bracketSetsKey]}
        filingType={filingType}
        income={income}
      />
    </div>
  );
};

export default App;
