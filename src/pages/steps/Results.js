import React, { useState } from "react";
import { useQuery } from "react-query";

import { STEPS } from "../../constants";
import useStepManager from "../../hooks/useStepManager";
import { getResult } from "../../helpers/calculator";
import getAtecoCodes from "../../services/getAtecoCodes";

const Results = () => {
  const [selectedCode, setSelectedCode] = useState();

  const { selection } = useStepManager({
    stepKey: STEPS.RESULTS,
  });

  const { isLoading } = useQuery("ateco", getAtecoCodes, {
    onSuccess: (data) => {
      if (selection[STEPS.ATECO]) {
        setSelectedCode(
          data.find((el) => el.atecoCode === selection[STEPS.ATECO])
        );
      }
    },
  });

  if (isLoading) {
    return "Loading...";
  }

  const result = getResult(selection, { atecoData: selectedCode });
  console.log(result);

  return <>Results</>;
};

export default Results;
