import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import InputNumber from "../form/InputNumber";
import Title from "../typo/Title";
import Button from "../Button";
import { useQuery, getNextStepUrl } from "../../utils";
import { STEPS } from "../../constants";

function QuestionVatYear() {
  const { t } = useTranslation();
  let history = useHistory();
  let { data } = useQuery();
  const [selection, setSelection] = useState({});
  const [error, setError] = useState();

  const inputProps = {
    name: STEPS.VAT_YEAR,
    placeholder: "Inserisci qui l'anno",
    onChange: ({ target }) => {
      if (target.value)
        setSelection({
          [target.name]: target.value,
        });
    },
  };

  const handleSubmit = () => {
    console.log(selection);

    if (!selection[STEPS.VAT_YEAR]) {
      setError(t("Inserisci l'anno"));
      return;
    }

    console.log(data);

    history.push(getNextStepUrl(STEPS.VAT_TYPE, { ...data, ...selection }));
  };

  return (
    <section>
      <Suspense fallback="loading">
        <Title>{t("In che anno hai aperto la Parita IVA?")}</Title>
      </Suspense>
      <InputNumber inputProps={inputProps} />
      <Button onClick={handleSubmit}>Continua</Button>
      {error}
    </section>
  );
}

export default QuestionVatYear;
