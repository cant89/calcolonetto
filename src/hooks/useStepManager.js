import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { STEPS } from "../constants";
import { getNextStep } from "../helpers/stepsManager";
import useQueryParams from "./useQueryParams";
import { useMemo } from "react";

const useAppHistory = () => {
  const {
    data = {},
    resData = {},
    step = STEPS.VAT,
    stepsHistory = [],
  } = useQueryParams();
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
    const prevStep = stepsHistory[stepsHistory.length - 1];

    if (!prevStep) {
      history.push("/");
      return;
    }

    const newStepsHistory = stepsHistory.splice(0, stepsHistory.length - 1);
    const { [step]: removedCurrentStepData, ...newData } = data;

    history.push(
      `?step=${prevStep}&stepsHistory=${JSON.stringify(
        newStepsHistory
      )}&data=${JSON.stringify(newData)}`
    );
  };

  const updateHistoryData = (key, value) => {
    const isKeyInData = data[key] !== undefined;

    const unchangedHistory = `?step=${step}&stepsHistory=${JSON.stringify(
      stepsHistory
    )}`;

    if (isKeyInData) {
      const mergedData = {
        ...data,
        [key]: value,
      };

      history.push(
        `${unchangedHistory}&data=${JSON.stringify(
          mergedData
        )}&resData=${JSON.stringify(resData)}`
      );
    } else {
      const mergedResData = {
        ...resData,
        [key]: value,
      };

      history.push(
        `${unchangedHistory}&data=${JSON.stringify(
          data
        )}&resData=${JSON.stringify(mergedResData)}`
      );
    }
  };

  return { nextStep, prevStep, updateHistoryData };
};

const useStepManager = ({ stepKey, errorMessage, isValid = () => true }) => {
  const { data = {}, resData = {} } = useQueryParams();
  const dataRef = useRef(data);
  const { nextStep, prevStep, updateHistoryData } = useAppHistory();
  const [selection, setSelection] = useState({ ...resData, ...data });
  const [error, setError] = useState();
  const timeout = useRef();
  const memoizedAggregatedData = useMemo(
    () => JSON.stringify({ ...resData, ...data }),
    [resData, data]
  );

  useEffect(() => {
    const { [stepKey]: stepVal } = dataRef?.current || {};

    stepVal !== undefined &&
      setSelection((selection) => ({
        ...selection,
        [stepKey]: stepVal,
      }));
  }, [dataRef, stepKey, setSelection]);

  const checkError = () => {
    if (!selection[stepKey] || !isValid(selection[stepKey])) {
      setError(errorMessage);
      return true;
    }
    setError();
    return false;
  };

  const handleSubmit = () => {
    if (!checkError()) {
      nextStep(selection);
    }
  };

  const handleChange = (value) => {
    setSelection({
      ...selection,
      [stepKey]: value,
    });

    isValid(value) && setError();
  };

  useEffect(() => {
    if (error) {
      message.error(error, 3);
      timeout.current = setTimeout(() => setError(), 3000);
    }

    if (!error) {
      message.destroy();
      timeout.current && clearTimeout(timeout.current);
    }
  }, [error]);

  useEffect(() => {
    if (JSON.stringify(selection) !== memoizedAggregatedData) {
      setSelection({ ...data, ...resData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memoizedAggregatedData]);

  return {
    selection,
    handleSubmit,
    handleChange,
    error,
    nextStep,
    prevStep,
    updateHistoryData,
  };
};

export default useStepManager;
