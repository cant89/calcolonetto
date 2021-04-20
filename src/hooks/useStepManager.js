import { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";
import { STEPS } from "../constants";
import { getNextStep } from "../helpers/stepsManager";
import useQueryParams from "./useQueryParams";

const useAppHistory = () => {
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
    const { [prevStep]: preStepData, ...newData } = data;

    history.push(
      `?step=${prevStep}&stepsHistory=${JSON.stringify(
        newStepsHistory
      )}&data=${JSON.stringify(newData)}`
    );
  };

  return { nextStep, prevStep };
};

const useStepManager = ({ stepKey, errorMessage, isValid = () => true }) => {
  const { data = {} } = useQueryParams();
  const dataRef = useRef(data);
  const { nextStep, prevStep } = useAppHistory();
  const [selection, setSelection] = useState(data);
  const [error, setError] = useState();
  const timeout = useRef();

  useEffect(() => {
    const { [stepKey]: stepVal } = dataRef?.current || {};

    stepVal !== undefined &&
      setSelection({
        ...selection,
        [stepKey]: stepVal,
      });
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

  return {
    selection,
    handleSubmit,
    handleChange,
    error,
    nextStep,
    prevStep,
  };
};

export default useStepManager;
