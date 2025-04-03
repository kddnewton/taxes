export type BracketSets = typeof import("./bracketSets.json");
export type BracketSetsKey = keyof BracketSets;

export type BracketSet = BracketSets extends ({ [K in BracketSetsKey]: (infer U) }) ? U : never;
export type Bracket = BracketSet extends (infer U)[] ? U : never;

export type FilingType = "single" | "joint" | "head";
