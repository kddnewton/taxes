import React from "react";

import styles from "./progress.module.css";

type ProgressBarProps = {
  value: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const style = {
    opacity: (value / 200) + 0.5,
    width: `${value}%`
  };

  return (
    <div
      className={styles.progress}
      style={style}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
};

export default ProgressBar;
