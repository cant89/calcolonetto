import React from "react";
import { Typography } from "antd";
import Select from "../../components/form/Select";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import useStepManager from "../../hooks/useStepManager";
import { REGIONS, STEPS, VAT_TYPES } from "../../constants";

const { Option } = Select;

function QuestionLocation({ t }) {
  const {
    handleChange,
    handleSubmit,
    error,
    prevStep,
    selection,
  } = useStepManager({
    stepKey: STEPS.LOCATION,
    errorMessage: t("Scegli un luogo"),
  });

  const hasVat = selection[STEPS.VAT] === VAT_TYPES.YES;

  return (
    <section>
      <Title>In quale luogo?</Title>
      <Typography.Paragraph>
        Scegli la regione presso la quale {hasVat ? "è" : "sarà"} la residenza
        fiscale della tua attività. <br />
        Ogni regione applica aliquote (tasse) leggermente differenti.
      </Typography.Paragraph>
      <Select
        onChange={handleChange}
        value={selection[STEPS.LOCATION]}
        hasError={Boolean(error)}
        autoFocus
        width="350px"
      >
        {REGIONS.map(({ name, id }) => (
          <Option value={id} key={id}>
            {name}
          </Option>
        ))}
      </Select>
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
    </section>
  );
}

export default QuestionLocation;
