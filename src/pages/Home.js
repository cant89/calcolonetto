import React from "react";
import QuestionVat from "../components/steps/QuestionVat";
import QuestionVatYear from "../components/steps/QuestionVatYear";
import QuestionVatType from "../components/steps/QuestionVatType";
import QuestionSalary from "../components/steps/QuestionSalary";
import QuestionPension from "../components/steps/QuestionPension";
import { useQuery } from "../utils";
import { STEPS } from "../constants";

const StepsComponents = {
  [STEPS.VAT]: QuestionVat,
  [STEPS.SALARY]: QuestionSalary,
  [STEPS.VAT_YEAR]: QuestionVatYear,
  [STEPS.VAT_TYPE]: QuestionVatType,
  [STEPS.PENSION]: QuestionPension,
};

function Home() {
  let { step = STEPS.VAT } = useQuery();
  const Step = StepsComponents[step];

  return (
    <section>
      <Step />
    </section>
  );
}

export default Home;
