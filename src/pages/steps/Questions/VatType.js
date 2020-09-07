import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import Radio from "../../../components/form/Radio";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionVatType() {
  const { t } = useTranslation();
  const { inputsProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: {},
    stepKey: STEPS.VAT_TYPE,
    errorMessage: t("Select a choice"),
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
        <Title>{t("What kind of VAT do you have?")}</Title>
      </Suspense>
      <Radio label={t("Regime dei minimi")} inputProps={inputsProps.minimum} />
      <Radio label={t("Regime forfettario")} inputProps={inputsProps.flat} />
      <Radio
        label={t("Regime semplificato/ordinario")}
        inputProps={inputsProps.simplified}
      />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continue")}</Button>
      {error}
    </section>
  );
}

export default QuestionVatType;
