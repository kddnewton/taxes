export type Bracket = {
  min: number;
  rate: number;
};

export type BracketSet = Bracket[];

const bracketSets: { [key: string]: BracketSet } = {
  "2013": [
    { min: 0,      rate: 10   },
    { min: 17850,  rate: 15   },
    { min: 72500,  rate: 25   },
    { min: 146400, rate: 28   },
    { min: 223050, rate: 33   },
    { min: 398350, rate: 35   },
    { min: 450000, rate: 39.6 }
  ],
  "2012": [
    { min: 0,      rate: 10 },
    { min: 17400,  rate: 15 },
    { min: 70700,  rate: 25 },
    { min: 142700, rate: 28 },
    { min: 217450, rate: 33 },
    { min: 388350, rate: 35 }
  ]
};

export default bracketSets;
