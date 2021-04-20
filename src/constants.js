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
