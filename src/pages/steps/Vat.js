import React from "react";
import { Typography } from "antd";

import Title from "../../components/typo/Title";
import Radio from "../../components/form/Radio";
import ActionsBar from "../../components/ActionsBar";
import useStepManager from "../../hooks/useStepManager";
import { STEPS } from "../../constants";

function QuestionVat({ t, className }) {
  const { handleChange, handleSubmit, error, selection } = useStepManager({
    stepKey: STEPS.VAT,
    errorMessage: t("Seleziona una opzione"),
  });

  return (
    <section className={className}>
      <Title>{t("Possiedi già una Partita IVA?")}</Title>

      <Radio.Group
        onChange={({ target }) => handleChange(target.value)}
        value={selection[STEPS.VAT]}
      >
        <Radio hasError={Boolean(error)} value="yes">
          {t("Si")}
        </Radio>
        <Radio hasError={Boolean(error)} value="no">
          {t("No")}
        </Radio>
      </Radio.Group>
      <ActionsBar onNextClick={handleSubmit} />
    </section>
  );
}

export default QuestionVat;
