import React from "react";
import Radio from "../../components/form/Radio";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import useStepManager from "../../hooks/useStepManager";
import { STEPS, VAT_TYPE_TYPES } from "../../constants";

function QuestionVatType({ t }) {
  const {
    handleChange,
    handleSubmit,
    error,
    prevStep,
    selection,
  } = useStepManager({
    stepKey: STEPS.VAT_TYPE,
    errorMessage: t("Seleziona una opzione"),
  });

  return (
    <section>
      <Title>{t("Che tipo di Partita Iva possiedi?")}</Title>

      <Radio.Group
        onChange={({ target }) => handleChange(target.value)}
        value={selection[STEPS.VAT_TYPE]}
      >
        <Radio hasError={Boolean(error)} value={VAT_TYPE_TYPES.MINIMI}>
          Regime dei minimi
        </Radio>
        <Radio hasError={Boolean(error)} value={VAT_TYPE_TYPES.FORFETTARIO}>
          Regime forfettario
        </Radio>
        <Radio hasError={Boolean(error)} value={VAT_TYPE_TYPES.SEMPLIFICATO}>
          Regime semplificato/ordinario
        </Radio>
      </Radio.Group>
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
    </section>
  );
}

export default QuestionVatType;
