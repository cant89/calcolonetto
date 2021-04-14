import React from "react";

import { STEPS } from "../../constants";
import useStepManager from "../../hooks/useStepManager";
import { getResult } from "../../helpers/calculator";

const Results = () => {
  const { selection } = useStepManager({
    stepKey: STEPS.RESULTS,
  });

  // const result = getResult(selection);

  return null;
};

export default Results;
