import React, { Suspense } from "react";
import Radio from "../../../components/form/Radio";
import Title from "../../../components/typo/Title";
import ActionsBar from "../../../components/ActionsBar";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";

function QuestionPension({ t }) {
  const { inputProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: {},
    stepKey: STEPS.PENSION,
    errorMessage: t("Seleziona una opzione"),
    inputs: {
      inps: {
        id: "inps",
        type: "radio",
      },
      helpMe: {
        id: "helpMe",
        type: "radio",
      },
    },
  });

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Quale ente previdenziale devi usare?")}</Title>
      </Suspense>
      <Radio label={t("Gestione separata INPS")} inputProps={inputProps.inps} />
      <Radio label={t("Non lo so, aiutami")} inputProps={inputProps.helpMe} />
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
      {error}
    </section>
  );
}

export default QuestionPension;
