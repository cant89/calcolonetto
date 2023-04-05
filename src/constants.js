export const STEPS = {
  VAT: "VAT",
  VAT_YEAR: "VAT_YEAR",
  VAT_TYPE: "VAT_TYPE",
  SALARY: "SALARY",
  ATECO: "ATECO",
  PENSION: "PENSION",
  LOCATION: "LOCATION",
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
    tax: 25,
  },
  {
    from: 28001,
    to: 50000,
    tax: 35,
  },
  {
    from: 50001,
    to: Number.MAX_VALUE,
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
  marche: [
    { from: 0, to: 15000.0, tax: 1.23 },
    { from: 15000.01, to: 28000.0, tax: 1.53 },
    { from: 28000.01, to: 50000.0, tax: 1.7 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 1.73 },
  ],
  lombardia: [
    { from: 0, to: 15000.0, tax: 1.23 },
    { from: 15000.01, to: 28000.0, tax: 1.58 },
    { from: 28000.01, to: 50000.0, tax: 1.72 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 1.73 },
  ],
  molise: [
    { from: 0, to: 15000.0, tax: 1.73 },
    { from: 15000.01, to: 28000.0, tax: 1.93 },
    { from: 28000.01, to: 50000.0, tax: 2.13 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 2.33 },
  ],
  valledaosta: [{ from: 0, to: Number.MAX_VALUE, tax: 1.23 }],
  abruzzo: [{ from: 0, to: Number.MAX_VALUE, tax: 1.73 }],
  liguria: [
    { from: 0, to: 15000.0, tax: 1.23 },
    { from: 15000.01, to: 28000.0, tax: 1.79 },
    { from: 28000.01, to: 50000.0, tax: 2.31 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 2.33 },
  ],
  puglia: [
    { from: 0, to: 15000.0, tax: 1.33 },
    { from: 15000.01, to: 28000.0, tax: 1.43 },
    { from: 28000.01, to: 50000.0, tax: 1.63 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 1.85 },
  ],
  trento: [
    { from: 0, to: 15000.0, tax: 1.23 },
    { from: 15000.01, to: 28000.0, tax: 1.23 },
    { from: 28000.01, to: 50000.0, tax: 1.23 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 1.73 },
  ],
  emiliaromagna: [
    { from: 0, to: 15000.0, tax: 1.33 },
    { from: 15000.01, to: 28000.0, tax: 1.93 },
    { from: 28000.01, to: 50000.0, tax: 2.03 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 2.27 },
  ],
  umbria: [
    { from: 0, to: 15000.0, tax: 1.23 },
    { from: 15000.01, to: 28000.0, tax: 1.62 },
    { from: 28000.01, to: 50000.0, tax: 1.67 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 1.83 },
  ],
  campania: [
    { from: 0, to: 15000.0, tax: 1.73 },
    { from: 15000.01, to: 28000.0, tax: 2.96 },
    { from: 28000.01, to: 50000.0, tax: 3.2 },
    { from: 50000.01, to: Number.MAX_VALUE, tax: 3.33 },
  ],
  basilicata: [{ from: 0, to: Number.MAX_VALUE, tax: 1.23 }],
  sicilia: [{ from: 0, to: Number.MAX_VALUE, tax: 1.23 }],
  veneto: [{ from: 0, to: Number.MAX_VALUE, tax: 1.23 }],
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
      to: 50000,
      tax: 1.23,
    },
    {
      from: 50001,
      to: Number.MAX_VALUE,
      tax: 1.73,
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
      to: 50000,
      tax: 1.23,
    },
    {
      from: 50001,
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
      to: 50000,
      tax: 1.68,
    },
    {
      from: 50001,
      to: Number.MAX_VALUE,
      tax: 1.73,
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
      to: 50000,
      tax: 2.75,
    },
    {
      from: 50001,
      to: Number.MAX_VALUE,
      tax: 3.33,
    },
  ],
  sardegna: [
    {
      from: 0,
      to: Number.MAX_VALUE,
      tax: 1.23,
    },
  ],
  calabria: [
    {
      from: 0,
      to: Number.MAX_VALUE,
      tax: 1.73,
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
      tax: 3.33,
    },
    {
      from: 28001,
      to: 50000,
      tax: 3.33,
    },
    {
      from: 50001,
      to: Number.MAX_VALUE,
      tax: 3.33,
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
      to: Number.MAX_VALUE,
      tax: 0.8,
    },
  ],
};

export const PENSIONS = [
  {
    name: "inps",
    percentage: [
      { from: 0, to: 113000.52, tax: 26.63 },
      { from: 113000.52, to: Number.MAX_VALUE, tax: 0 },
    ],
    label: "Gestione separata INPS",
  },
  {
    name: "inarcassa",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Architetti e Ingegneri",
    disabled: true,
  },
  {
    name: "epap",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Attuari, Agronomi e Forestali, Chimici, Geologi",
    disabled: true,
  },
  {
    name: "enpab",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Biologi",
    disabled: true,
  },
  {
    name: "enpacl",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Consulenti del lavoro",
    disabled: true,
  },
  {
    name: "inpgi",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Giornalisti",
    disabled: true,
  },
  {
    name: "enpaf",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Farmacisti",
    disabled: true,
  },
  {
    name: "cnpadc",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Commercialisti",
    disabled: true,
  },
  {
    name: "cnpr",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 10 }],
    label: "Ragionieri e Periti commerciali",
    disabled: true,
  },
  {
    name: "ipsoa",
    percentage: [{ from: 0, to: Number.MAX_VALUE, tax: 24 }],
    label: "Artigiani e commercianti",
    disabled: true,
  },
];

export const REGIONS = [
  { id: "abbruzzo", name: "Abbruzzo" },
  { id: "basilicata", name: "Basilicata" },
  { id: "bolzano", name: "Bolzano" },
  { id: "calabria", name: "Calabria" },
  { id: "campania", name: "Campania" },
  { id: "emiliaromagna", name: "Emilia Romagna" },
  { id: "friuliveneziagiulia", name: "Friuli Venezia Giulia" },
  { id: "lazio", name: "Lazio" },
  { id: "liguria", name: "Liguria" },
  { id: "lombardia", name: "Lombardia" },
  { id: "marche", name: "Marche" },
  { id: "molise", name: "Molise" },
  { id: "piemonte", name: "Piemonte" },
  { id: "puglia", name: "Puglia" },
  { id: "sardegna", name: "Sardegna" },
  { id: "sicilia", name: "Sicilia" },
  { id: "toscana", name: "Toscana" },
  { id: "trento", name: "Trento" },
  { id: "umbria", name: "Umbria" },
  { id: "valledaosta", name: "Valle d'Aosta" },
  { id: "veneto", name: "Veneto" },
];
