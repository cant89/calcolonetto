import React, { Suspense, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Radio from "../../../components/form/Radio";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useAppHistory, useQueryParams } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionVat() {
  const { t } = useTranslation();
  const { nextStep, prevStep } = useAppHistory();
  const { data } = useQueryParams();
  const [selection, setSelection] = useState({});
  const [error, setError] = useState();
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef?.VAT &&
      setSelection({
        [STEPS.VAT]: dataRef.VAT,
      });
  }, [dataRef]);

  const inputProps = {
    name: STEPS.VAT,
    onChange: ({ target }) => {
      setSelection({
        [target.name]: target.id,
      });
    },
  };

  const handleSubmit = () => {
    console.log(selection);

    if (!selection[STEPS.VAT]) {
      setError(t("Select a choice"));
      return;
    }

    nextStep(selection);
  };

  const yesInputProps = {
    ...inputProps,
    id: "yes",
    checked: selection[STEPS.VAT] === "yes",
  };
  const noInputProps = {
    ...inputProps,
    id: "no",
    checked: selection[STEPS.VAT] === "no",
  };

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Do you already have a VAT?")}</Title>
      </Suspense>
      <Radio label={t("Yes")} inputProps={yesInputProps} />
      <Radio label={t("No")} inputProps={noInputProps} />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continue")}</Button>
      {error}
    </section>
  );
}

export default QuestionVat;
