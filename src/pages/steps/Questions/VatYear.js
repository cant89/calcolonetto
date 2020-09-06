import React, { Suspense, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import InputNumber from "../../../components/form/InputNumber";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useAppHistory, useQueryParams } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionVatYear() {
  const { t } = useTranslation();
  const { nextStep, prevStep } = useAppHistory();
  const { data } = useQueryParams();
  const [selection, setSelection] = useState({ [STEPS.VAT_YEAR]: "" });
  const [error, setError] = useState();
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef?.VAT_YEAR &&
      setSelection({
        [STEPS.VAT_YEAR]: dataRef.VAT_YEAR,
      });
  }, [dataRef]);

  const inputProps = {
    name: STEPS.VAT_YEAR,
    placeholder: "Inserisci qui l'anno",
    onChange: ({ target }) => {
      if (target.value)
        setSelection({
          [target.name]: target.value,
        });
    },
    value: selection[STEPS.VAT_YEAR],
  };

  const handleSubmit = () => {
    console.log(selection);

    if (!selection[STEPS.VAT_YEAR]) {
      setError(t("Inserisci l'anno"));
      return;
    }

    nextStep(selection);
  };

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("In che anno hai aperto la Parita IVA?")}</Title>
      </Suspense>
      <InputNumber inputProps={inputProps} />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continua")}</Button>
      {error}
    </section>
  );
}

export default QuestionVatYear;
