import { useLocation, useHistory } from "react-router-dom";
import { STEPS, _STEPS } from "./constants";

export function useQuery() {
  const res = {};
  const params = new URLSearchParams(useLocation().search);
  for (const [key, value] of params.entries()) {
    try {
      res[key] = JSON.parse(value);
    } catch {
      res[key] = value;
    }
  }
  return res;
}

export const useNextStepUrl = () => {
  const { data } = useQuery();

  return (step, newData) => {
    const mergedData = { ...data, ...newData };
    return `/?step=${step}&data=${JSON.stringify(mergedData)}`;
  };
};

const getNextStep = (currentStep, data) => {
  if (currentStep === STEPS.VAT) {
    if (data.VAT === "yes") {
      return STEPS.VAT_YEAR;
    }
    if (data.VAT === "no") {
      return STEPS.SALARY;
    }
  }

  if (currentStep === STEPS.VAT_YEAR) {
    // regime dei minimi - introduced in 2008
    // regime dei minimi - introduced in 2015
    if (Number(data.VAT_YEAR) < 2008) {
      return STEPS.SALARY;
    }

    return STEPS.VAT_TYPE;
  }

  if (currentStep === STEPS.VAT_TYPE) {
    return STEPS.SALARY;
  }
};

export const useAppHistory = () => {
  const { data = {}, step = STEPS.VAT, stepsHistory = [] } = useQuery();
  const history = useHistory();

  const nextStep = (payload) => {
    const mergedData = { ...data, ...payload };
    const nextStep = getNextStep(step, mergedData);
    const newStepsHistory = [...stepsHistory, step];

    history.push(
      `?step=${nextStep}&stepsHistory=${JSON.stringify(
        newStepsHistory
      )}&data=${JSON.stringify(mergedData)}`
    );
  };

  const prevStep = () => {
    const prevStep = stepsHistory.pop(-1);

    if (!prevStep) {
      history.push("/");
      return;
    }

    const newStepsHistory = stepsHistory.splice(-1, 1);

    history.push(
      `?step=${prevStep}&stepsHistory=${JSON.stringify(
        newStepsHistory
      )}&data=${JSON.stringify(data)}`
    );
  };

  return { nextStep, prevStep };
};
