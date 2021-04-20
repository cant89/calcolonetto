import {
  VAT_TYPE_TYPES,
  VAT_TYPES,
  IRPEF_SEMPLIFICATO,
  PENSION_TYPE_TYPES,
} from "../constants";

const getVatType = ({ SALARY, VAT }) => {
  if (Number(SALARY) < 65000 && VAT === VAT_TYPES.NO) {
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
      amount: IRPEF_SEMPLIFICATO.reduce((tot, { from, to, tax }) => {
        const increment =
          irpefTaxableSalary < from
            ? 0
            : ((Math.min(to, irpefTaxableSalary) - from) / 100) * tax;
        return tot + increment;
      }, 0),
    };
  }
};

const getPensionPercentage = ({ PENSION }) => {
  if (PENSION === PENSION_TYPE_TYPES.inps) {
    return 25.72;
  }

  return 10;
};

const getIrpefTaxableSalary = ({ vat, atecoData, SALARY, pension }) => {
  return vat.type === VAT_TYPE_TYPES.FORFETTARIO
    ? (SALARY / 100) * atecoData.coeff - pension.amount
    : SALARY - pension.amount;
};

const getPensionTaxableSalary = ({ vat, atecoData, SALARY }) => {
  return vat.type === VAT_TYPE_TYPES.FORFETTARIO
    ? (SALARY / 100) * atecoData.coeff
    : SALARY;
};

const getPensionAmount = ({ SALARY, vat, pensionPercentage, atecoData }) => {
  const taxableSalary = getPensionTaxableSalary({ vat, atecoData, SALARY });
  return (taxableSalary / 100) * pensionPercentage;
};

export const getResult = (
  { VAT, VAT_TYPE, VAT_YEAR, ATECO, PENSION, SALARY },
  { atecoData }
) => {
  const vatType = VAT_TYPE || getVatType({ SALARY, VAT });
  const vatCoeff = getVatCoeff({ vatType, atecoData });
  const hasFivePercent = getHasFivePercent({ VAT_YEAR, vatType });
  const vat = {
    type: vatType,
    coeff: vatCoeff,
    hasFivePercent,
  };

  const pensionPercentage = getPensionPercentage({ PENSION });
  const pensionAmount = getPensionAmount({
    SALARY,
    vat,
    pensionPercentage,
    atecoData,
  });
  const pension = {
    type: PENSION,
    percentage: pensionPercentage,
    amount: pensionAmount,
  };

  const irpefTaxableSalary = getIrpefTaxableSalary({
    vat,
    atecoData,
    SALARY,
    pension,
  });

  const irpef = getTaxesIrpef({ vat, irpefTaxableSalary });
  const taxes = {
    irpef,
  };

  return {
    vat,
    pension,
    taxes,
  };

  /*
  {
    net,
    vat: {
      type,
      coeff,
      fivePercent
    }
    taxes: {
      irpef: {
        amount,
        percentage
      }
      regional: {
        amount,
        percentage
      },
      comunal: {
        amount,
        percentage
      },
    },
    pension: {
      amount,
      percentage,
      type
    },


  }
  */
};
