import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Row, Col, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { PENSIONS, STEPS, VAT_TYPE_TYPES } from "../../constants";
import { getResult } from "../../helpers/calculator";
import { formatNum } from "../../helpers/common";
import useStepManager from "../../hooks/useStepManager";
import useQueryParams from "../../hooks/useQueryParams";

import getAtecoCodes from "../../services/getAtecoCodes";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import TiledTitle from "../../components/typo/TiledTitle";
import ConfiguratorForm from "../../modules/configurator/ConfiguratorForm";
import Line from "../../modules/results/Line";

const Results = () => {
  const [selectedAtecoCode, setSelectedAtecoCode] = useState();

  const { selection, prevStep, updateHistoryData } = useStepManager({
    stepKey: STEPS.RESULTS,
  });
  const { stepsHistory } = useQueryParams();

  const { isLoading, data: allAtecoCodes = [] } = useQuery(
    "ateco",
    getAtecoCodes
  );

  useEffect(() => {
    setSelectedAtecoCode(
      allAtecoCodes.find((el) => el.atecoCode === selection[STEPS.ATECO]?.code)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection[STEPS.ATECO], allAtecoCodes]);

  const handleOnConfiguratorChange = (key, value) => {
    updateHistoryData(key, value);
  };

  const onIrpefMunicipalityHelpClick = () => {
    Modal.info({
      title: "Addizionale comunale IRPEF",
      content: (
        <>
          <p>
            Considerato l'impatto ridotto di questa imposta e la difficoltà nel
            reperire i valori per tutti i comuni di Italia,{" "}
            <strong>
              approssimiamo questa imposta a un valore che varia tra lo 0.55% e
              lo 0.8% in base al reddito.
            </strong>
          </p>
          <p>
            Il valore reale varia leggermente in base al comune presso il quale
            ha sede fiscale la tua P.IVA. ma non supera mai lo 0.8% (0.9% per
            Roma capitale).
          </p>
        </>
      ),
    });
  };

  const onIrpefRegionalHelpClick = () => {
    Modal.info({
      title: "Addizionale regionale IRPEF",
      content: (
        <>
          <p>
            L'addizionale regionale IRPEF è una imposta regionale, da pagare
            alla regione presso la quale ha sede la tua attività. L'ammontare di
            questa imposta varia da regione a regione.
          </p>
        </>
      ),
    });
  };

  const onIrpefHelpClick = () => {
    Modal.info({
      title: "Cos'è l'IRPEF?",
      content: (
        <>
          <p>
            L'IRPEF è l'imposta che, ogni anno, ogni possesore di Partita IVA
            deve pagare allo stato Italiano.
          </p>
          <p>
            L'ammontare di questa imposta può essere molto differente a seconda
            del tipo P.IVA che utilizzi.
          </p>
        </>
      ),
    });
  };

  const onPensionHelpClick = () => {
    Modal.info({
      title: "La pensione",
      content: (
        <>
          <p>
            In Italia è obbligatorio versare una quota da destinare alla propria
            pensione futura.
          </p>
          <p>
            L'ammontare di questa quota è determinato dal tipo di Cassa
            previdenziale che utilizzerai, la quale non è una libera scelta ma è
            determinata dal tipo di attività che svolgi.
          </p>
          <p>
            Di solito le attività professionali per le quali esiste un albo
            (geometri, avvocati, ecc) devono iscriversi alla Cassa previdenziale
            dedicata, la quale applicherà una sua aliquota percentuale fissa.
          </p>
          <p>
            Tutte le altre attività si appoggiano alla Gestione Separata INPS,
            la quale applica una aliquota fissa del{" "}
            {PENSIONS.find(({ name }) => name === "inps")?.percentage} %
          </p>
        </>
      ),
    });
  };

  if (isLoading) {
    return "Loading...";
  }

  const result = getResult(selection, {
    atecoData: selectedAtecoCode || selection[STEPS.ATECO],
  });

  const { gross, net, vat, pension, taxes, monthsNum } = result;

  const isDataNotComplete = !vat?.type || !gross?.yearly || !pension?.type;

  return (
    <section>
      {stepsHistory?.length ? <MainTitle>Fatto!</MainTitle> : null}
      <Row gutter={{ md: 64, xs: 0 }} align="top">
        <Col flex="auto" md="" xs={{ span: 24 }}>
          <Content>
            <TiledTitle
              subtitle="Ciò che ti rimane in tasca"
              tileRotation={10}
              type="square"
            >
              Salario netto
            </TiledTitle>

            <Line isNotValid={isDataNotComplete}>
              <Line.Key>Annuo</Line.Key>
              <Line.Value>€ {formatNum(net.yearly)}</Line.Value>
              <Line.Info></Line.Info>
            </Line>

            <Line isNotValid={isDataNotComplete}>
              <Line.Key>Mensile - {monthsNum} mensilità</Line.Key>
              <Line.Value> € {formatNum(net.monthly)}</Line.Value>
              <Line.Info></Line.Info>
            </Line>
          </Content>

          <Content>
            <TiledTitle
              subtitle="Ciò che fatturi"
              tileRotation={-5}
              type="circle"
            >
              Salario lordo
            </TiledTitle>

            <Line isNotValid={isDataNotComplete}>
              <Line.Key>Annuo</Line.Key>
              <Line.Value> € {formatNum(gross.yearly)}</Line.Value>
              <Line.Info></Line.Info>
            </Line>

            <Line isNotValid={isDataNotComplete}>
              <Line.Key>Mensile ({monthsNum} mensilità)</Line.Key>
              <Line.Value> € {formatNum(gross?.monthly)}</Line.Value>
              <Line.Info></Line.Info>
            </Line>
          </Content>

          <Content>
            <TiledTitle
              subtitle="Ciò che devi versare ad enti vari"
              tileRotation={-7}
              type="triangle"
            >
              Tasse
            </TiledTitle>

            <Line isNotValid={isDataNotComplete}>
              <Line.Key>Totali</Line.Key>
              <Line.Value>
                {" "}
                € {formatNum(taxes.amount + pension.amount)}
              </Line.Value>
              <Line.Info></Line.Info>
            </Line>
            <Content>
              <Line>
                <strong>Dettagli</strong>
              </Line>

              <Line isNotValid={isDataNotComplete}>
                <Line.Key>
                  IRPEF{" "}
                  {vat.type !== VAT_TYPE_TYPES.SEMPLIFICATO &&
                    "(Aliquota unica)"}
                </Line.Key>
                <Line.Value> € {formatNum(taxes.irpef.amount)}</Line.Value>
                <Line.Info>
                  <InfoCircleOutlined onClick={onIrpefHelpClick} />
                </Line.Info>
              </Line>

              {taxes.irpefRegional.percentage ? (
                <Line isNotValid={isDataNotComplete}>
                  <Line.Key>Addizionale regionale IRPEF</Line.Key>
                  <Line.Value>
                    {" "}
                    € {formatNum(taxes.irpefRegional.amount)}
                  </Line.Value>
                  <Line.Info>
                    <InfoCircleOutlined onClick={onIrpefRegionalHelpClick} />
                  </Line.Info>
                </Line>
              ) : null}
              {taxes.irpefMunicipality.percentage ? (
                <Line isNotValid={isDataNotComplete}>
                  <Line.Key>Addizionale comunale IRPEF</Line.Key>
                  <Line.Value>
                    {" "}
                    € {formatNum(taxes.irpefMunicipality.amount)}
                  </Line.Value>
                  <Line.Info>
                    <InfoCircleOutlined
                      onClick={onIrpefMunicipalityHelpClick}
                    />
                  </Line.Info>
                </Line>
              ) : null}

              <Line isNotValid={isDataNotComplete}>
                <Line.Key>Previdenza sociale (Pensione)</Line.Key>
                <Line.Value>€ {formatNum(pension.amount)}</Line.Value>
                <Line.Info>
                  <InfoCircleOutlined onClick={onPensionHelpClick} />
                </Line.Info>
              </Line>
            </Content>
          </Content>
        </Col>

        <RightCol md={{ span: 10 }} xs={{ span: 24 }}>
          <Title>Configura</Title>
          <ConfiguratorForm
            data={result}
            onChange={handleOnConfiguratorChange}
          />
        </RightCol>
      </Row>

      <ActionsBar onPrevClick={prevStep} />
    </section>
  );
};

Results.MainTitle = styled(Title)`
  &&& {
    position: relative;
    text-align: center;
    font-size: 80px;
    margin-bottom: 60px;

    &:before {
      content: "";
      position: absolute;
      top: 60%;
      left: 50%;
      width: 320px;
      height: 30px;
      background: ${(props) => props.theme.colors.primary};
      transform: translateX(-50%);
      z-index: -1;
      max-width: 100%;
    }

    @media screen and (max-width: 575px) {
      font-size: 60px;
    }
  }
`;

Results.Content = styled.section`
  margin: 0 0 60px 50px;

  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
`;

Results.RightCol = styled(Col)`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 32px;
  min-width: 350px;
`;

const { Content, RightCol, MainTitle } = Results;

export default Results;
