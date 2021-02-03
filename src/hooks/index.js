import { useRef, useMemo, useState, useEffect, useCallback } from "react";
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

export const useStepManager = ({
  stepKey,
  errorMessage,
  inputs,
  initialState,
}) => {
  const { data } = useQueryParams();
  const dataRef = useRef(data);
  const { nextStep, prevStep } = useAppHistory();
  const [selection, setSelection] = useState(initialState);
  const [error, setError] = useState();

  useEffect(() => {
    const { [stepKey]: stepVal } = dataRef?.current || {};

    stepVal !== undefined &&
      setSelection({
        [stepKey]: stepVal,
      });
  }, [dataRef, stepKey, setSelection]);

  const inputProps = useMemo(
    () =>
      Object.keys(inputs).reduce((acc, key) => {
        const { id, type, ...rest } = inputs[key];

        return {
          ...acc,
          [key]: {
            id,
            name: stepKey,
            checked: type === "radio" ? selection[stepKey] === id : undefined,
            value: type === "input" ? selection[stepKey] : undefined,
            onChange: ({ target }) => {
              setSelection({
                [stepKey]: target.value,
              });
            },
            ...rest,
          },
        };
      }, {}),
    [inputs, selection, stepKey]
  );

  const handleSubmit = () => {
    console.log(selection);

    if (!selection[stepKey]) {
      setError(errorMessage);
      return;
    }

    nextStep(selection);
  };

  console.log(selection, inputProps);

  return {
    selection,
    inputProps,
    handleSubmit,
    error,
    nextStep,
    prevStep,
  };
};
