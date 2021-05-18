import React from "react";
import InputNumber from "../../components/form/InputNumber";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import useStepManager from "../../hooks/useStepManager";
import { STEPS, VAT_TYPES } from "../../constants";

function QuestionSalary({ t }) {
  const { handleChange, handleSubmit, error, prevStep, selection } =
    useStepManager({
      stepKey: STEPS.SALARY,
      errorMessage: t("Inserisci il tuo salario"),
    });

  const hasVat = selection[STEPS.VAT] === VAT_TYPES.YES;

  return (
    <section>
      <Title>
        {hasVat
          ? "Qual'è il tuo salario annuo lordo?"
          : "Quanto pensi di fatturare in un'anno?"}
      </Title>

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
