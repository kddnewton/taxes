import React, { useState } from "react";

import bracketSets from "./bracketSets.json";
import Gutter from "./display/Gutter";
import Modal from "./display/Modal";
import Settings from "./Settings";
import Table from "./Table";
import { BracketSetsKey, FilingType } from "./typings";

import styles from "./container.module.css";

const App: React.FC = () => {
  const [bracketSetsKey, setBracketSetsKey] = useState<BracketSetsKey>("2020");
  const [filingType, setFilingType] = useState<FilingType>("single");
  const [income, setIncome] = useState<number>(50000);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.heading}>
          US Federal Income Taxes
        </h1>
        <Modal>
          <Modal.Trigger className={styles.about}>
            What is this?
          </Modal.Trigger>
          <Modal.Content>
            <p>
              This web page is meant to give you an idea of how a progressive tax
              system (like the one in place for US federal income tax) works.
              Income is broken up into sections called &quot;brackets&quot;, each
              taxed at a different rate.
            </p>
            <p>
              As you make more money, you may start to earn money within a higher
              tax bracket. Don&apos;t worry! The money that you made that was
              taxed at a lower rate is still taxed at the lower rate. It is only
              the income made between the bottom and top of each bracket that is
              taxed at the rate of that bracket.
            </p>
          </Modal.Content>
        </Modal>
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
    </div>
  );
};

export default App;
