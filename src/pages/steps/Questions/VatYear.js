import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";
import InputText from "../../../components/form/InputText";

function QuestionVatYear() {
  const { t } = useTranslation();

  const { inputsProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: { [STEPS.VAT_YEAR]: "" },
    stepKey: STEPS.VAT_YEAR,
    errorMessage: t("Insert the year"),
    inputs: {
      year: {
        id: STEPS.VAT_YEAR,
        placeholder: t("16/6/2005"),
        type: "input",
      },
    },
  });

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("In which year have you opened the VAT?")}</Title>
      </Suspense>
      <InputText inputProps={inputsProps.year} />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continue")}</Button>
      {error}
    </section>
  );
}

export default QuestionVatYear;
