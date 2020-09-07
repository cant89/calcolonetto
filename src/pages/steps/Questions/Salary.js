import React, { Suspense } from "react";
import { useTranslation } from "react-i18next";
import InputText from "../../../components/form/InputText";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionSalary() {
  const { t } = useTranslation();

  const { inputsProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: { [STEPS.SALARY]: "" },
    stepKey: STEPS.SALARY,
    errorMessage: t("Insert the salary"),
    inputs: {
      salary: {
        id: STEPS.SALARY,
        placeholder: t("Ex: 40000"),
        type: "input",
      },
    },
  });

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("What's your yearly salary?")}</Title>
      </Suspense>
      <InputText inputProps={inputsProps.salary} />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continue")}</Button>
      {error}
    </section>
  );
}

export default QuestionSalary;
