export const STEPS = {
  VAT: "VAT",
  VAT_YEAR: "VAT_YEAR",
  VAT_TYPE: "VAT_TYPE",
  SALARY: "SALARY",
  ATECO: "ATECO",
  PENSION: "PENSION",
  RESULTS: "RESULTS",
};

export const ROUTES = {
  HOME: "/",
  GUIDED_STEPS: "/gsteps/",
  ADVANCED_CONFIGURATOR: "/advconf/",
};

export const VAT_TYPE_TYPES = {
  MINIMI: "minimi",
  FORFETTARIO: "forfettario",
  SEMPLIFICATO: "semplificato",
};

export const VAT_TYPES = {
  YES: "yes",
  NO: "no",
};

export const IRPEF_SEMPLIFICATO = [
  {
    from: 0,
    to: 15000,
    tax: 23,
  },
  {
    from: 15001,
    to: 28000,
    tax: 27,
  },
  {
    from: 28001,
    to: 55000,
    tax: 38,
  },
  {
    from: 55001,
    to: 75000,
    tax: 41,
  },
  {
    from: 75001,
    to: 99999999999,
    tax: 43,
  },
];

export const PENSION_TYPE_TYPES = {
  inps: "inps",
  inarcassa: "inarcassa",
  epap: "epap",
  enpab: "enpab",
  enpacl: "enpacl",
  inpgi: "inpgi",
  enpaf: "enpaf",
  cnpadc: "cnpadc",
  cnpr: "cnpr",
};

/* 
The following is updated to 2021
Official list:
https://www1.finanze.gov.it/finanze2/dipartimentopolitichefiscali/fiscalitalocale/addregirpef/sceltaregione.htm
*/
export const IRPEF_REGIONAL_ADDITIONS = {
  abbruzzo: [{ from: 0, tax: 1.73, tp: Number.MAX_VALUE }],
  basilicata: [
    {
      from: 0,
      to: 15000,
      tax: 1.23,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.23,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.23,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.73,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 2.33,
    },
  ],
  bolzano: [
    {
      from: 0,
      to: 15000,
      tax: 1.23,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.23,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.23,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.23,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.73,
    },
  ],
  calabria: [{ from: 0, tax: 1.73, tp: Number.MAX_VALUE }],
  campania: [{ from: 0, tax: 2.03, tp: Number.MAX_VALUE }],
  emiliaRomagna: [
    {
      from: 0,
      to: 15000,
      tax: 1.33,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.93,
    },
    {
      from: 28001,
      to: 55000,
      tax: 2.03,
    },
    {
      from: 55001,
      to: 75000,
      tax: 2.23,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 2.33,
    },
  ],
  friuliveneziagiulia: [
    {
      from: 0,
      to: 15000,
      tax: 0.7,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.23,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.23,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.23,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.23,
    },
  ],
  lazio: [
    {
      from: 0,
      to: 15000,
      tax: 1.73,
    },
    {
      from: 15001,
      to: 28000,
      tax: 2.73,
    },
    {
      from: 28001,
      to: 55000,
      tax: 2.93,
    },
    {
      from: 55001,
      to: 75000,
      tax: 3.23,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 3.33,
    },
  ],
  liguria: [
    {
      from: 0,
      to: 15000,
      tax: 1.23,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.81,
    },
    {
      from: 28001,
      to: 55000,
      tax: 2.31,
    },
    {
      from: 55001,
      to: 75000,
      tax: 2.32,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 2.33,
    },
  ],
  lombardia: [
    {
      from: 0,
      to: 15000,
      tax: 1.23,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.58,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.72,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.73,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.74,
    },
  ],
  marche: [
    {
      from: 0,
      to: 15000,
      tax: 1.23,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.53,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.7,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.72,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.73,
    },
  ],
  molise: [
    {
      from: 0,
      to: 15000,
      tax: 1.73,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.93,
    },
    {
      from: 28001,
      to: 55000,
      tax: 2.13,
    },
    {
      from: 55001,
      to: 75000,
      tax: 2.23,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 2.33,
    },
  ],
  piemonte: [
    {
      from: 0,
      to: 15000,
      tax: 1.62,
    },
    {
      from: 15001,
      to: 28000,
      tax: 2.13,
    },
    {
      from: 28001,
      to: 55000,
      tax: 2.75,
    },
    {
      from: 55001,
      to: 75000,
      tax: 3.32,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 3.33,
    },
  ],
  puglia: [
    {
      from: 0,
      to: 15000,
      tax: 1.33,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.43,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.71,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.72,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.73,
    },
  ],
  sardegna: [
    {
      from: 0,
      to: Number.MAX_VALUE,
      tax: 1.23,
    },
  ],
  sicilia: [
    {
      from: 0,
      to: Number.MAX_VALUE,
      tax: 1.23,
    },
  ],
  toscana: [
    {
      from: 0,
      to: 15000,
      tax: 1.42,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.43,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.68,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.72,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.73,
    },
  ],
  trento: [
    {
      from: 0,
      to: 15000,
      tax: 1.23,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.23,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.23,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.73,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.73,
    },
  ],
  umbria: [
    {
      from: 0,
      to: 15000,
      tax: 1.23,
    },
    {
      from: 15001,
      to: 28000,
      tax: 1.63,
    },
    {
      from: 28001,
      to: 55000,
      tax: 1.68,
    },
    {
      from: 55001,
      to: 75000,
      tax: 1.73,
    },
    {
      from: 75001,
      to: Number.MAX_VALUE,
      tax: 1.83,
    },
  ],
  valledaosta: [
    {
      from: 0,
      to: Number.MAX_VALUE,
      tax: 1.23,
    },
  ],
  veneto: [
    {
      from: 0,
      to: Number.MAX_VALUE,
      tax: 1.23,
    },
  ],
};

export const IRPEF_MUNICIPALITY_ADDITION = {
  sample: [
    {
      from: 0,
      to: 15000,
      tax: 0.55,
    },
    {
      from: 15001,
      to: 28000,
      tax: 0.57,
    },
    {
      from: 28001,
      to: 55000,
      tax: 0.7,
    },
    {
      from: 55001,
      to: 75000,
      tax: 0.75,
    },
    {
      from: 75001,
      to: 99999999999,
      tax: 0.8,
    },
  ],
};

export const PENSIONS = [
  { name: "inarcassa", percentage: "10", label: "Architetti e Ingegneri" },
  {
    name: "epap",
    percentage: "10",
    label: "Attuari, Agronomi e Forestali, Chimici, Geologi",
  },
  { name: "enpab", percentage: "10", label: "Biologi" },
  { name: "enpacl", percentage: "10", label: "Consulenti del lavoro" },
  { name: "inpgi", percentage: "10", label: "Giornalisti" },
  { name: "enpaf", percentage: "10", label: "Farmacisti" },
  { name: "cnpadc", percentage: "10", label: "Commercialisti" },
  { name: "cnpr", percentage: "10", label: "Ragionieri e Periti commerciali" },
  { name: "inps", percentage: "25.72", label: "Altro" },
];
