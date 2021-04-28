import React from "react";
import { Alert, Modal, Typography } from "antd";
import Radio from "../../components/form/Radio";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import useStepManager from "../../hooks/useStepManager";
import { STEPS, PENSIONS } from "../../constants";
import styled from "styled-components";

function QuestionPension({ t }) {
  const {
    handleChange,
    handleSubmit,
    error,
    prevStep,
    selection,
  } = useStepManager({
    stepKey: STEPS.PENSION,
    errorMessage: t("Seleziona una opzione"),
  });

  const showInfoModal = () => {
    Modal.info({
      title: "Come funzionano gli Enti Previdenziali?",
      content: (
        <div>
          <p>
            Ad ogni mestiere viene attribuito un codice ATECO, e ad ogni codice
            ATECO corrisponde una delle circa 20 Casse (anche chiamati Enti)
            previdenziali.
          </p>
          <p>
            La Cassa Previdenziale è l'ente incaricato, per legge, a gestire i
            contributi pensionistici e di invalidità di ogni professionista.
            {<br />}
            <strong>
              Le aliquote, ovvero le tasse da pagare all'ente previdenziale,
              variano da ente a ente.
            </strong>
          </p>
          <p>
            La maggior parte delle professioni utilizza la cassa previdenziale
            pubblica: la Gestione Separata INPS.
          </p>
          <p>
            Invece i professionisti iscritti ad un albo hanno generalmente una
            cassa previdenziale privata.
          </p>
        </div>
      ),
      onOk() {},
    });
  };

  console.log(selection);

  return (
    <section>
      <Title>{t("Quale categoria più ti si addice?")}</Title>
      <StyledAlert
        message={t("Questo ci serve per capire il tuo Ente Previdenziale")}
        description={
          <div>
            {t(
              'Scegliendo "Altro" ti verrà attribuita la Gestione Separata INPS. '
            )}
            <Typography.Link type="link" onClick={showInfoModal}>
              Scopri di più
            </Typography.Link>
          </div>
        }
        type="info"
        showIcon
      />

      <Radio.Group
        onChange={({ target }) => {
          handleChange(PENSIONS.find((el) => el.name === target.value));
        }}
        value={selection[STEPS.PENSION]?.name}
      >
        {PENSIONS.map(({ name, label }) => (
          <Radio hasError={Boolean(error)} value={name} key={name}>
            {label}
          </Radio>
        ))}
      </Radio.Group>
      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
    </section>
  );
}

const StyledAlert = styled(Alert)`
  margin-bottom: 32px;
`;

export default QuestionPension;
