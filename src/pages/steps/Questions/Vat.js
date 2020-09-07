import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import Radio from "../../../components/form/Radio";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionVat() {
  const { t } = useTranslation();
  const { inputsProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: {},
    stepKey: STEPS.VAT,
    errorMessage: t("Select a choice"),
    inputs: {
      yes: {
        id: "yes",
        type: "radio",
      },
      no: {
        id: "no",
        type: "radio",
      },
    },
  });

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Do you already have a VAT?")}</Title>
      </Suspense>
      <Radio label={t("Yes")} inputProps={inputsProps.yes} />
      <Radio label={t("No")} inputProps={inputsProps.no} />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continue")}</Button>
      {error}
    </section>
  );
}

export default QuestionVat;
