import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import InputText from "../form/InputText";
import Title from "../typo/Title";
import Button from "../Button";
import { useQuery, getNextStepUrl } from "../../utils";
import { STEPS } from "../../constants";

function QuestionSalary() {
  const { t } = useTranslation();
  let history = useHistory();
  let { data } = useQuery();
  const [selection, setSelection] = useState({});
  const [error, setError] = useState();

  const inputProps = {
    name: STEPS.SALARY,
    placeholder: "Inserisci il salario lordo annuo",
    onChange: ({ target }) => {
      if (target.value)
        setSelection({
          [target.name]: target.value,
        });
    },
  };

  const handleSubmit = () => {
    console.log(selection);

    if (!selection[STEPS.SALARY]) {
      setError(t("Inserisci il salario"));
      return;
    }

    console.log(data);

    history.push(getNextStepUrl(STEPS.PENSION, { ...data, ...selection }));
  };

  return (
    <section>
      <Suspense fallback="loading">
        <Title>{t("Quale è il salario annuo lordo?")}</Title>
      </Suspense>
      <InputText inputProps={inputProps} />
      <Button onClick={handleSubmit}>Continua</Button>
      {error}
    </section>
  );
}

export default QuestionSalary;
