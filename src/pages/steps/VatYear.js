import React from "react";

import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import InputText from "../../components/form/InputText";
import { STEPS } from "../../constants";
import useStepManager from "../../hooks/useStepManager";

function QuestionVatYear({ t }) {
  const {
    handleChange,
    handleSubmit,
    error,
    prevStep,
    selection,
  } = useStepManager({
    stepKey: STEPS.VAT_YEAR,
    errorMessage: t("Inserisci un anno valido"),
    isValid: (value) =>
      value > 0 && value < new Date().getFullYear() && Number(value) == value,
  });

  return (
    <section>
      <Title>{t("In quale anno hai aperto la Partita IVA?")}</Title>

      <InputText
        placeholder="Es. 2016"
        autoFocus
        width="200px"
        maxLength={4}
        value={selection[STEPS.VAT_YEAR]}
        hasError={Boolean(error)}
        onChange={({ target }) => handleChange(target.value)}
      />

      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
    </section>
  );
}

export default QuestionVatYear;
