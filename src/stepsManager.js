import { STEPS } from "./constants";

const isVat = (data) => {
  if (data.VAT === "yes") {
    return STEPS.VAT_YEAR;
  }
  if (data.VAT === "no") {
    return STEPS.SALARY;
  }
};

const isVatYear = (data) => {
  // regime dei minimi - introduced in 2008
  // regime dei minimi - introduced in 2015
  if (Number(data.VAT_YEAR) < 2008) {
    return STEPS.SALARY;
  }

  return STEPS.VAT_TYPE;
};

const isVatType = (data) => {
  return STEPS.SALARY;
};

export const getNextStep = (currentStep, data) => {
  switch (currentStep) {
    case STEPS.VAT:
      return isVat(data);
    case STEPS.VAT_YEAR:
      return isVatYear(data);
    case STEPS.VAT_TYPE:
      return isVatType(data);
    default:
      return STEPS.VAT;
  }
};
