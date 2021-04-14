import React from "react";
import InputNumber from "../../components/form/InputNumber";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import useStepManager from "../../hooks/useStepManager";
import { STEPS } from "../../constants";

function QuestionSalary({ t }) {
  const {
    handleChange,
    handleSubmit,
    error,
    prevStep,
    selection,
  } = useStepManager({
    stepKey: STEPS.SALARY,
    errorMessage: t("Inserisci il tuo salario"),
  });

  return (
    <section>
      <Title>{t("Qual'è il tuo salario annuo lordo?")}</Title>

      <InputNumber
        onChange={handleChange}
        value={selection[STEPS.SALARY]}
        hasError={Boolean(error)}
        autoFocus
        width="200px"
        step={1000}
        parser={(value) => value.replace(/€\s?|(,*)/g, "")}
        formatter={(value) =>
          `€ ${String(value)
            .replace(/\D*/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
        }
      />
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
    </section>
  );
}

export default QuestionSalary;
