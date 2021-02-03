import React, { Suspense } from "react";
import Radio from "../../../components/form/Radio";
import Title from "../../../components/typo/Title";
import ActionsBar from "../../../components/ActionsBar";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";

function QuestionVatType({ t }) {
  const { inputProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: {},
    stepKey: STEPS.VAT_TYPE,
    errorMessage: t("Seleziona una opzione"),
    inputs: {
      minimum: {
        id: "minimum",
        type: "radio",
      },
      flat: {
        id: "flat",
        type: "radio",
      },
      simplified: {
        id: "simplified",
        type: "radio",
      },
    },
  });

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Che tipo di Partita Iva possiedi?")}</Title>
      </Suspense>
      <Radio label={t("Regime dei minimi")} inputProps={inputProps.minimum} />
      <Radio label={t("Regime forfettario")} inputProps={inputProps.flat} />
      <Radio
        label={t("Regime semplificato/ordinario")}
        inputProps={inputProps.simplified}
      />
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
      {error}
    </section>
  );
}

export default QuestionVatType;
