import React, { Suspense, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import InputText from "../../components/form/InputText";
import Title from "../../components/typo/Title";
import Button from "../../components/Button";
import { useAppHistory, useQuery } from "../../hooks";
import { STEPS } from "../../constants";
import BackButton from "../../components/BackButton";

function QuestionSalary() {
  const { t } = useTranslation();
  const { nextStep, prevStep } = useAppHistory();
  const { data } = useQuery();
  const [selection, setSelection] = useState({ [STEPS.SALARY]: "" });
  const [error, setError] = useState();

  useEffect(() => {
    data?.SALARY &&
      setSelection({
        [STEPS.SALARY]: data.SALARY,
      });
  }, []);

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
      <Suspense fallback="loading">
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
