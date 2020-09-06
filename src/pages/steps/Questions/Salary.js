import React, { Suspense, useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import InputText from "../../../components/form/InputText";
import Title from "../../../components/typo/Title";
import Button from "../../../components/Button";
import { useAppHistory, useQueryParams } from "../../../hooks";
import { STEPS } from "../../../constants";
import BackButton from "../../../components/BackButton";

function QuestionSalary() {
  const { t } = useTranslation();
  const { nextStep, prevStep } = useAppHistory();
  const { data } = useQueryParams();
  const [selection, setSelection] = useState({ [STEPS.SALARY]: "" });
  const [error, setError] = useState();
  const dataRef = useRef(data);

  useEffect(() => {
    dataRef?.SALARY &&
      setSelection({
        [STEPS.SALARY]: dataRef.SALARY,
      });
  }, [dataRef]);

  const inputProps = {
    name: STEPS.SALARY,
    placeholder: "Inserisci il salario lordo annuo",
    onChange: ({ target }) => {
      if (target.value)
        setSelection({
          [target.name]: target.value,
        });
    },
    value: selection[STEPS.SALARY],
  };

  const handleSubmit = () => {
    console.log(selection);

    if (!selection[STEPS.SALARY]) {
      setError(t("Inserisci il salario"));
      return;
    }

    nextStep(selection);
  };

  return (
    <section>
      <Suspense fallback={t("Loading")}>
        <Title>{t("Quale è il salario annuo lordo?")}</Title>
      </Suspense>
      <InputText inputProps={inputProps} />
      <BackButton onClick={prevStep} />
      <Button onClick={handleSubmit}>{t("Continua")}</Button>
      {error}
    </section>
  );
}

export default QuestionSalary;
