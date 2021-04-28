import React, { useState } from "react";
import { Typography, AutoComplete, Input } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import styled from "styled-components";

import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import useStepManager from "../../hooks/useStepManager";
import { STEPS } from "../../constants";
import getAtecoCodes from "../../services/getAtecoCodes";

const { Paragraph, Text } = Typography;

function QuestionAteco({ t, className }) {
  const { handleChange, handleSubmit, prevStep, selection } = useStepManager({
    stepKey: STEPS.ATECO,
    errorMessage: t("Seleziona una opzione"),
  });

  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedCode, setSelectedCode] = useState();

  const { data } = useQuery("ateco", getAtecoCodes, {
    onSuccess: (data) => {
      if (selection[STEPS.ATECO]) {
        setSelectedCode(
          data.find((el) => el.atecoCode === selection[STEPS.ATECO]?.code)
        );
      }
    },
  });

  const onSearch = (searchText = "") => {
    const res = data
      .filter(
        (el) =>
          el.sottocategoria.titolo
            ?.toLowerCase()
            .includes(searchText.toLowerCase()) ||
          el.atecoCode.includes(searchText.toLowerCase())
      )
      .map((el) => {
        return {
          label: el.sottocategoria?.titolo,
          value: el.sottocategoria?.titolo,
          item: el,
        };
      });

    console.log(res);

    setOptions(res);
  };

  const onSelect = (data, { item }) => {
    setSelectedCode(item);
    handleChange({ code: item.atecoCode, coeff: item.coeff });
  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <section className={className}>
      <Title>{t("Che mestiere fai?")}</Title>
      <Paragraph>
        Cerca il tuo mestiere per parola chiave in modo da ottenere il codice
        ATECO che più rispecchia il tipo di attività che svolgi. Per una analisi
        più approfondita visita{" "}
        <a href="https://www.codiceateco.it/" target="_blank">
          il sito ufficiale
        </a>{" "}
        o contatta un commercialista.
      </Paragraph>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 500,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
      >
        <Input.Search
          size="large"
          placeholder='Cerca per parola chiave (Es. "studi legali")'
        />
      </AutoComplete>
      {selectedCode && (
        <div style={{ display: "flex", margin: "32px 16px" }}>
          <SelectedCodeIcon />
          <div>
            <Text> Codice ATECO selezionato: </Text>
            <Text strong>{selectedCode.atecoCode}</Text>
            <br />
            <Text> Coefficiente di redditività: </Text>
            <Text strong>{selectedCode.coeff}%</Text>
          </div>
        </div>
      )}

      <ActionsBar onPrevClick={prevStep} onNextClick={handleSubmit} />
    </section>
  );
}

QuestionAteco.SelectedCodeIcon = styled(CheckCircleOutlined)`
  color: ${(props) => props.theme.colors.primaryText};
  font-size: 30px;
  margin-right: 16px;
  margin-top: 4px;
`;

const { SelectedCodeIcon } = QuestionAteco;

export default QuestionAteco;
