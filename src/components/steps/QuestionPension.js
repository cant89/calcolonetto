import React, { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import Radio from "../form/Radio";
import Title from "../typo/Title";
import Button from "../Button";
import { useQuery, getNextStepUrl } from "../../utils";
import { STEPS } from "../../constants";

function QuestionPension() {
  const { t } = useTranslation();
  let history = useHistory();
  let { data } = useQuery();
  const [selection, setSelection] = useState({});
  const [error, setError] = useState();

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

    history.push(getNextStepUrl(STEPS.SALARY, { ...data, ...selection }));
  };

  const minimumInputProps = { ...inputProps, id: "minimum" };
  const flatInputProps = { ...inputProps, id: "flat" };
  const simplifiedInputProps = { ...inputProps, id: "simplified" };

  return (
    <section>
      <Suspense fallback="loading">
        <Title>{t("Che tipo di partita IVA possiedi?")}</Title>
      </Suspense>
      <Radio label={t("Regime dei minimi")} inputProps={minimumInputProps} />
      <Radio label={t("Regime forfettario")} inputProps={flatInputProps} />
      <Radio
        label={t("Regime semplificato/ordinario")}
        inputProps={simplifiedInputProps}
      />

      <Button onClick={handleSubmit}>Continua</Button>
      {error}
    </section>
  );
}

export default QuestionPension;
