import {
  STEPS,
  VAT_TYPES,
  VAT_TYPE_TYPES,
  FORFETTARIO_LIMIT,
} from "../constants";

const isVat = (data) => {
  if (data.VAT === VAT_TYPES.YES) {
    return STEPS.VAT_YEAR;
  }
  if (data.VAT === VAT_TYPES.NO) {
    return STEPS.SALARY;
  }
};

const isVatYear = ({ VAT_YEAR }) => {
  // regime dei minimi - introduced in 2008
  // regime forfettario - introduced in 2015
  if (Number(VAT_YEAR) < 2008) {
    return STEPS.SALARY;
  }

  return STEPS.VAT_TYPE;
};

const isVatType = () => {
  return STEPS.SALARY;
};

const isSalary = ({ VAT_TYPE, SALARY }) => {
  if (
    VAT_TYPE === VAT_TYPE_TYPES.FORFETTARIO ||
    (!VAT_TYPE && SALARY < FORFETTARIO_LIMIT)
  ) {
    return STEPS.ATECO;
  }
  return STEPS.PENSION;
};

const isAteco = (data) => {
  return STEPS.PENSION;
};

const isPension = (data) => {
  return STEPS.LOCATION;
};

const isLocation = (data) => {
  return STEPS.RESULTS;
};

export const getNextStep = (currentStep, data) => {
  switch (currentStep) {
    case STEPS.VAT:
      return isVat(data);
    case STEPS.VAT_YEAR:
      return isVatYear(data);
    case STEPS.VAT_TYPE:
      return isVatType(data);
    case STEPS.SALARY:
      return isSalary(data);
    case STEPS.ATECO:
      return isAteco(data);
    case STEPS.PENSION:
      return isPension(data);
    case STEPS.LOCATION:
      return isLocation(data);
    default:
      return STEPS.VAT;
  }
};
