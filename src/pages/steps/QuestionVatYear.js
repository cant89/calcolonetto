import React, { Suspense, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputNumber from "../../components/form/InputNumber";
import Title from "../../components/typo/Title";
import Button from "../../components/Button";
import { useAppHistory, useQuery } from "../../hooks";
import { STEPS } from "../../constants";
import BackButton from "../../components/BackButton";

function QuestionVatYear() {
  const { t } = useTranslation();
  const { nextStep, prevStep } = useAppHistory();
  const { data } = useQuery();
  const [selection, setSelection] = useState({ [STEPS.VAT_YEAR]: "" });
  const [error, setError] = useState();

  useEffect(() => {
    data?.VAT_YEAR &&
      setSelection({
        [STEPS.VAT_YEAR]: data.VAT_YEAR,
      });
  }, []);

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
      <Suspense fallback="loading">
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
