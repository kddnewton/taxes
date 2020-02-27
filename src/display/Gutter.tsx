import React from "react";

type GutterProps = {
  height?: number;
};

const Gutter: React.FC<GutterProps> = ({ height = 1 }) => (
  <div style={{ height: `${height * 1.2}em` }} />
);

export default Gutter;
