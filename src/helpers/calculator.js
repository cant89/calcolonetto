import {
  VAT_TYPE_TYPES,
  VAT_TYPES,
  IRPEF_SEMPLIFICATO,
  IRPEF_REGIONAL_ADDITIONS,
  IRPEF_MUNICIPALITY_ADDITION,
} from "../constants";

const calcIncrmentalTax = ({ schema = [], amount }) =>
  schema.reduce((tot, { from, to, tax }) => {
    const increment =
      amount < from ? 0 : ((Math.min(to, amount) - from) / 100) * tax;
    return tot + increment;
  }, 0);

const getVatType = ({ SALARY, VAT }) => {
  if (SALARY < 65000 && VAT === VAT_TYPES.NO) {
    return VAT_TYPE_TYPES.FORFETTARIO;
  }

  return VAT_TYPE_TYPES.SEMPLIFICATO;
};

const getVatCoeff = ({ vatType, atecoData }) => {
  if (vatType !== VAT_TYPE_TYPES.FORFETTARIO) {
    return;
  }

  return atecoData?.coeff;
};

const getHasFivePercent = ({ VAT_YEAR, vatType }) => {
  if (vatType !== VAT_TYPE_TYPES.FORFETTARIO) {
    return;
  }

  return !VAT_YEAR || new Date().getFullYear() - Number(VAT_YEAR) <= 5;
};

const getTaxesIrpef = ({ vat, irpefTaxableSalary }) => {
  if (vat.type === VAT_TYPE_TYPES.FORFETTARIO) {
    return {
      percentage: vat.hasFivePercent ? 5 : 15,
      amount: (irpefTaxableSalary / 100) * (vat.hasFivePercent ? 5 : 15),
    };
  }

  if (vat.type === VAT_TYPE_TYPES.MINIMI) {
    return {
      percentage: 5,
      amount: (irpefTaxableSalary / 100) * 5,
    };
  }

  if (vat.type === VAT_TYPE_TYPES.SEMPLIFICATO) {
    return {
      percentage: IRPEF_SEMPLIFICATO,
      amount: calcIncrmentalTax({
        schema: IRPEF_SEMPLIFICATO,
        amount: irpefTaxableSalary,
      }),
    };
  }
};

const getTaxesIrpefRegional = ({ vat, irpefTaxableSalary, LOCATION }) => {
  if (vat.type !== VAT_TYPE_TYPES.SEMPLIFICATO) {
    return {
      amount: 0,
      percentage: 0,
    };
  }

  return {
    percentage: IRPEF_REGIONAL_ADDITIONS[LOCATION],
    amount: calcIncrmentalTax({
      schema: IRPEF_REGIONAL_ADDITIONS[LOCATION],
      amount: irpefTaxableSalary,
    }),
  };
};

const getTaxesIrpefMunicipality = ({ vat, irpefTaxableSalary }) => {
  if (vat.type !== VAT_TYPE_TYPES.SEMPLIFICATO) {
    return {
      amount: 0,
      percentage: 0,
    };
  }

  const municipality = "sample";

  return {
    percentage: IRPEF_MUNICIPALITY_ADDITION[municipality],
    amount: calcIncrmentalTax({
      schema: IRPEF_MUNICIPALITY_ADDITION[municipality],
      amount: irpefTaxableSalary,
    }),
  };
};

const getIrpefTaxableSalary = ({ vat, atecoData, SALARY, pension }) => {
  return vat.type === VAT_TYPE_TYPES.FORFETTARIO
    ? (SALARY / 100) * atecoData?.coeff - pension.amount
    : SALARY - pension.amount;
};

const getPensionTaxableSalary = ({ vat, atecoData, SALARY }) => {
  return vat.type === VAT_TYPE_TYPES.FORFETTARIO
    ? (SALARY / 100) * atecoData?.coeff
    : SALARY;
};

const getPensionAmount = ({ SALARY, vat, pensionPercentage, atecoData }) => {
  const taxableSalary = getPensionTaxableSalary({ vat, atecoData, SALARY });
  return (taxableSalary / 100) * pensionPercentage;
};

export const getResult = (
  { VAT, VAT_TYPE, VAT_YEAR, ATECO, PENSION, LOCATION, SALARY, monthsNum = 12 },
  { atecoData }
) => {
  const vatType = VAT_TYPE || getVatType({ SALARY, VAT });
  const vatCoeff = getVatCoeff({ vatType, atecoData });
  const hasFivePercent = getHasFivePercent({ VAT_YEAR, vatType });
  const vat = {
    type: vatType,
    coeff: vatCoeff,
    hasFivePercent,
    ateco: atecoData,
    year: VAT_YEAR,
  };

  const pensionAmount = getPensionAmount({
    SALARY,
    vat,
    pensionPercentage: PENSION?.percentage,
    atecoData,
  });
  const pension = {
    type: PENSION?.name,
    percentage: PENSION?.percentage,
    amount: pensionAmount,
  };

  const irpefTaxableSalary = getIrpefTaxableSalary({
    vat,
    atecoData,
    SALARY,
    pension,
  });

  const irpef = getTaxesIrpef({ vat, irpefTaxableSalary });
  const irpefRegional = getTaxesIrpefRegional({
    vat,
    irpefTaxableSalary,
    LOCATION,
  });
  const irpefMunicipality = getTaxesIrpefMunicipality({
    vat,
    irpefTaxableSalary,
  });
  const taxes = {
    irpef,
    irpefRegional,
    irpefMunicipality,
    amount: irpef.amount + irpefRegional.amount + irpefMunicipality.amount,
  };

  const yearlyNet = SALARY - pension.amount - taxes.amount;

  const net = {
    monthly: yearlyNet / monthsNum,
    yearly: yearlyNet,
  };

  const gross = {
    monthly: SALARY / monthsNum,
    yearly: SALARY,
  };

  return {
    gross,
    location: LOCATION,
    monthsNum,
    net,
    vat,
    pension,
    taxes,
  };
};
