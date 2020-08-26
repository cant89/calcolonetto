import React from "react";
import QuestionVat from "./steps/Questions/Vat";
import QuestionVatYear from "./steps/Questions/VatYear";
import QuestionVatType from "./steps/Questions/VatType";
import QuestionSalary from "./steps/Questions/Salary";
import QuestionPension from "./steps/Questions/Pension";
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
