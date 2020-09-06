import { useLocation, useHistory } from "react-router-dom";
import { STEPS } from "../constants";
import { getNextStep } from "../stepsManager";

export function useQueryParams() {
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
  const { data } = useQueryParams();

  return (step, newData) => {
    const mergedData = { ...data, ...newData };
    return `/?step=${step}&data=${JSON.stringify(mergedData)}`;
  };
};

export const useAppHistory = () => {
  const { data = {}, step = STEPS.VAT, stepsHistory = [] } = useQueryParams();
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
