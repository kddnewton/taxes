import React from "react";

import styles from "./progress.module.css";

type ProgressBarProps = {
  value: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => (
  <div
    className={styles.progress}
    style={{ width: `${value}%` }}
    role="progressbar"
    aria-valuenow={value}
    aria-valuemin={0}
    aria-valuemax={100}
  />
);

export default ProgressBar;
