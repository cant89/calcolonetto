import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Radio from "../form/Radio";
import Title from "../typo/Title";
import Button from "../Button";
import { useQuery, getNextStepUrl } from "../../utils";
import { STEPS } from "../../constants";

function QuestionVat() {
  const { t } = useTranslation();
  let history = useHistory();
  let { data } = useQuery();
  const [selection, setSelection] = useState({});
  const [error, setError] = useState();

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

    let nextStep;

    if (!selection[STEPS.VAT]) {
      setError(t("Seleziona una scelta"));
      return;
    }

    if (selection[STEPS.VAT] === "yes") {
      nextStep = STEPS.VAT_YEAR;
    }

    if (selection[STEPS.VAT] === "no") {
      nextStep = STEPS.SALARY;
    }

    history.push(getNextStepUrl(nextStep, { ...data, ...selection }));
  };

  const yesInputProps = { ...inputProps, id: "yes" };
  const noInputProps = { ...inputProps, id: "no" };

  return (
    <section>
      <Suspense fallback="loading">
        <Title>{t("Possiedi già la Partita IVA?")}</Title>
      </Suspense>
      <Radio label="Si" inputProps={yesInputProps} />
      <Radio label="No" inputProps={noInputProps} />
      <Button onClick={handleSubmit}>Continua</Button>
      {error}
    </section>
  );
}

export default QuestionVat;
