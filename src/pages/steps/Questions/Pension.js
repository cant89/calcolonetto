import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import Radio from "../../../components/form/Radio";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionPension() {
  const { t } = useTranslation();

  const { inputsProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: {},
    stepKey: STEPS.PENSION,
    errorMessage: t("Select a choice"),
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
        <Title>{t("Which pension scheme do you have to use?")}</Title>
      </Suspense>
      <Radio
        label={t("Gestione separata INPS")}
        inputProps={inputsProps.inps}
      />
      <Radio
        label={t("I don't know, help me to understand")}
        inputProps={inputsProps.helpMe}
      />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continue")}</Button>
      {error}
    </section>
  );
}

export default QuestionPension;
