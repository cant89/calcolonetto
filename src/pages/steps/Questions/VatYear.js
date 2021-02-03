import React, { Suspense } from "react";
import Title from "../../../components/typo/Title";
import ActionsBar from "../../../components/ActionsBar";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";
import InputText from "../../../components/form/InputText";

function QuestionVatYear({ t }) {
  const {
    inputProps,
    handleSubmit,
    error,
    prevStep,
    selection,
  } = useStepManager({
    initialState: { [STEPS.VAT_YEAR]: "" },
    stepKey: STEPS.VAT_YEAR,
    errorMessage: t("Insert the year"),
    inputs: {
      year: {
        id: STEPS.VAT_YEAR,
        placeholder: t("2010"),
        type: "input",
      },
    },
  });

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("In quale anno hai aperto la Partita IVA?")}</Title>
      </Suspense>
      <InputText inputProps={inputProps.year} />
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
      {error}
    </section>
  );
}

export default QuestionVatYear;
