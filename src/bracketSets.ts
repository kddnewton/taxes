export type Bracket = {
  min: number;
  rate: number;
};

export type BracketSet = Bracket[];

const bracketSets: { [key: string]: BracketSet } = {
  "2020": [
    { rate: 10.0, min: 0      },
    { rate: 12.0, min: 19750  },
    { rate: 22.0, min: 80250  },
    { rate: 24.0, min: 171050 },
    { rate: 32.0, min: 326600 },
    { rate: 35.0, min: 414700 },
    { rate: 37.0, min: 622050 }
  ],
  "2019": [
    { rate: 10.0, min: 0      },
    { rate: 12.0, min: 19400  },
    { rate: 22.0, min: 78950  },
    { rate: 24.0, min: 168400 },
    { rate: 32.0, min: 321450 },
    { rate: 35.0, min: 408200 },
    { rate: 37.0, min: 612350 }
  ],
  "2018": [
    { rate: 10.0, min: 0      },
    { rate: 12.0, min: 19050  },
    { rate: 22.0, min: 77400  },
    { rate: 24.0, min: 165000 },
    { rate: 32.0, min: 315000 },
    { rate: 35.0, min: 400000 },
    { rate: 37.0, min: 600000 }
  ],
  "2013": [
    { rate: 10.0, min: 0      },
    { rate: 15.0, min: 17850  },
    { rate: 25.0, min: 72500  },
    { rate: 28.0, min: 146400 },
    { rate: 33.0, min: 223050 },
    { rate: 35.0, min: 398350 },
    { rate: 39.6, min: 450000 }
  ],
  "2012": [
    { rate: 10.0, min: 0      },
    { rate: 15.0, min: 17400  },
    { rate: 25.0, min: 70700  },
    { rate: 28.0, min: 142700 },
    { rate: 33.0, min: 217450 },
    { rate: 35.0, min: 388350 }
  ]
};

export default bracketSets;
