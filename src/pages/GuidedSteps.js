import React from "react";
import QuestionVat from "./steps/QuestionVat";
import QuestionVatYear from "./steps/QuestionVatYear";
import QuestionVatType from "./steps/QuestionVatType";
import QuestionSalary from "./steps/QuestionSalary";
import QuestionPension from "./steps/QuestionPension";
import { useQuery } from "../hooks";
import { STEPS } from "../constants";

const StepsComponents = {
  [STEPS.VAT]: QuestionVat,
  [STEPS.SALARY]: QuestionSalary,
  [STEPS.VAT_YEAR]: QuestionVatYear,
  [STEPS.VAT_TYPE]: QuestionVatType,
  [STEPS.PENSION]: QuestionPension,
};

function GuidedSteps() {
  let { step = STEPS.VAT } = useQuery();
  const Step = StepsComponents[step];

  return (
    <section>
      <Step />
    </section>
  );
}

export default GuidedSteps;
