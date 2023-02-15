import React, { useState } from "react";

import bracketSets from "./bracketSets.json";
import Gutter from "./display/Gutter";
import Modal from "./display/Modal";
import Settings from "./Settings";
import Table from "./Table";
import { BracketSetsKey, FilingType } from "./typings";

import styles from "./container.module.css";

type WikiProps = {
  children: React.ReactNode;
  page: string;
};

const Wiki: React.FC<WikiProps> = ({ children, page }) => (
  <a href={`https://en.wikipedia.org/wiki/${page}`}>{children}</a>
);

const bracketSetsKeys = Object.keys(bracketSets).map((key) => parseInt(key, 10)).sort((left, right) => right - left);
const defaultBracketSetsKey = bracketSetsKeys[0].toString() as BracketSetsKey;

const App: React.FC = () => {
  const [bracketSetsKey, setBracketSetsKey] = useState<BracketSetsKey>(defaultBracketSetsKey);
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
            <svg viewBox="0 0 12 12" className={styles.icon} aria-hidden>
              <circle cx={6} cy={6} r={5} />
              <path d="M6,9 l0,-3" />
              <path d="M6,5 l0,-1" />
            </svg>
            {" "}
            What is this?
          </Modal.Trigger>
          <Modal.Content>
            <h2>
              What is this?
            </h2>
            <p>
              This web page is meant to give you an idea of how a progressive
              tax system (like the one in place for US federal income tax)
              works. Almost everything on this page is clickable, so be sure to
              click around and get an explanation of each of the terms and
              numbers.
            </p>
            <p>
              You can set your income using the input below. Note that this is
              &quot;taxable&quot; income, which means it&apos;s how much you
              make after deducting things like retirement or charitable
              contributions.
            </p>
            <p>
              Your income is first broken up into sections called{" "}
              <Wiki page="Tax_bracket">&quot;brackets&quot;</Wiki>. Each bracket
              then has its own rate at which income that falls between its lower
              and upper limit is taxed. Once you add up each bracket&apos;s
              total, you get the total amount of federal income tax that you
              owe.
            </p>
            <p>
              Note that this page does not take into account a lot of other
              pieces of the tax code like{" "}
              <Wiki page="Alternative_minimum_tax">alternative minimum tax</Wiki>,{" "}
              <Wiki page="Capital_gains_tax">capital gains taxes</Wiki>,{" "}
              or <Wiki page="Itemized_deduction">itemized deductions</Wiki>. The
              function of this page is more to give a general sense of how these
              things work than to give you a definitive number on your tax bill.
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
