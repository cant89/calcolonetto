import React, { Suspense, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Radio from "../../../components/form/Radio";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useAppHistory, useQueryParams } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionVatType() {
  const { t } = useTranslation();
  const { nextStep, prevStep } = useAppHistory();
  const { data } = useQueryParams();
  const [selection, setSelection] = useState({});
  const [error, setError] = useState();
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef?.VAT_TYPE &&
      setSelection({
        [STEPS.VAT_TYPE]: dataRef.VAT_TYPE,
      });
  }, [dataRef]);

  const inputProps = {
    name: STEPS.VAT_TYPE,
    onChange: ({ target }) => {
      setSelection({
        [target.name]: target.id,
      });
    },
  };

  const handleSubmit = () => {
    console.log(selection);

    if (!selection[STEPS.VAT_TYPE]) {
      setError(t("Seleziona una scelta"));
      return;
    }

    nextStep(selection);
  };

  const minimumInputProps = {
    ...inputProps,
    id: "minimum",
    checked: selection[STEPS.VAT_TYPE] === "minimum",
  };
  const flatInputProps = {
    ...inputProps,
    id: "flat",
    checked: selection[STEPS.VAT_TYPE] === "flat",
  };
  const simplifiedInputProps = {
    ...inputProps,
    id: "simplified",
    checked: selection[STEPS.VAT_TYPE] === "simplified",
  };

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Che tipo di partita IVA possiedi?")}</Title>
      </Suspense>
      <Radio label={t("Regime dei minimi")} inputProps={minimumInputProps} />
      <Radio label={t("Regime forfettario")} inputProps={flatInputProps} />
      <Radio
        label={t("Regime semplificato/ordinario")}
        inputProps={simplifiedInputProps}
      />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continua")}</Button>
      {error}
    </section>
  );
}

export default QuestionVatType;
