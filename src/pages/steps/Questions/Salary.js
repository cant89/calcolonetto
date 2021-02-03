import React, { Suspense } from "react";
import InputNumber from "../../../components/form/InputNumber";
import Title from "../../../components/typo/Title";
import ActionsBar from "../../../components/ActionsBar";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";

function QuestionSalary({ t }) {
  const { inputProps, handleSubmit, error, prevStep } = useStepManager({
    initialState: { [STEPS.SALARY]: "" },
    stepKey: STEPS.SALARY,
    errorMessage: t("Inserisci il tuo salario"),
    inputs: {
      salary: {
        id: STEPS.SALARY,
        type: "input",
      },
    },
  });

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Qual'è il tuo salario annuo lordo?")}</Title>
      </Suspense>
      <InputNumber
        autoFocus
        inputProps={inputProps.salary}
        width="200px"
        step={1000}
        parser={(value) => value.replace(/\€\s?|(,*)/g, "")}
        formatter={(value) =>
          `€ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        }
      />
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
      {error}
    </section>
  );
}

export default QuestionSalary;
