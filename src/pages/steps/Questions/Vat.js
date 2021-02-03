import React, { Suspense } from "react";

import Title from "../../../components/typo/Title";
import Radio from "../../../components/form/Radio";
import ActionsBar from "../../../components/ActionsBar";
import { useStepManager } from "../../../hooks";
import { STEPS } from "../../../constants";

function QuestionVat({ t, className }) {
  const {
    inputProps,
    handleSubmit,
    error,
    prevStep,
    selection,
  } = useStepManager({
    initialState: {},
    stepKey: STEPS.VAT,
    errorMessage: t("Seleziona una opzione"),
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
    <section className={className}>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Possiedi già una Partita IVA?")}</Title>
      </Suspense>

      <Radio.Group
        onChange={inputProps.yes.onChange}
        value={selection[STEPS.VAT]}
      >
        <Radio value={inputProps.yes.id}>{t("Si")}</Radio>
        <Radio value={inputProps.no.id}>{t("No")}</Radio>
      </Radio.Group>
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
      {error}
    </section>
  );
}

export default QuestionVat;
