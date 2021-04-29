import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Row, Col, Modal, Steps } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { PENSIONS, STEPS, VAT_TYPE_TYPES } from "../../constants";
import { getResult } from "../../helpers/calculator";
import { formatNum } from "../../helpers/common";
import useStepManager from "../../hooks/useStepManager";
import getAtecoCodes from "../../services/getAtecoCodes";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import TiledTitle from "../../components/typo/TiledTitle";
import ConfiguratorForm from "../../modules/configurator/ConfiguratorForm";

const { Step } = Steps;

const Results = () => {
  const [selectedAtecoCode, setSelectedAtecoCode] = useState();

  const { selection, prevStep, updateHistoryData } = useStepManager({
    stepKey: STEPS.RESULTS,
  });

  const { isLoading, data: allAtecoCodes = [] } = useQuery(
    "ateco",
    getAtecoCodes
  );

  useEffect(() => {
    setSelectedAtecoCode(
      allAtecoCodes.find((el) => el.atecoCode === selection[STEPS.ATECO]?.code)
    );
  }, [selection[STEPS.ATECO], allAtecoCodes]);

  const handleOnConfiguratorChange = (key, value) => {
    updateHistoryData(key, value);
  };

  const onIrpefMunicipalityInfoClick = () => {
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

  const onIrpefRegionalInfoClick = () => {
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

  const onIrpefInfoClick = () => {
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

  const onPensionInfoClick = () => {
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

  const { gross, net, vat, pension, taxes } = result;

  console.log(result, selection);

  return (
    <section>
      <Title
        style={{ textAlign: "center", fontSize: "80px", marginBottom: "60px" }}
      >
        Fatto!
      </Title>
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

            <Line>
              <div className="key">
                <span>Annuo</span>
              </div>
              <span className="value"> € {formatNum(net.yearly)}</span>
              <span className="info"></span>
            </Line>
            <Line>
              <div className="key">
                <span>Mensile (12 mensilità)</span>
              </div>
              <span className="value"> € {formatNum(net.monthly)}</span>
              <span className="info"></span>
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

            <Line>
              <div className="key">
                <span>Annuo</span>
              </div>
              <span className="value"> € {formatNum(gross)}</span>
              <span className="info"></span>
            </Line>
            <Line>
              <div className="key">
                <span>Mensile (12 mensilità)</span>
              </div>
              <span className="value"> € {formatNum(gross / 12)}</span>
              <span className="info"></span>
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

            <Line>
              <div className="key">
                <span>Totali</span>
              </div>
              <span className="value">
                € {formatNum(taxes.amount + pension.amount)}
              </span>
              <span className="info"></span>
            </Line>
            <Content>
              <Line>
                <strong>Dettagli</strong>
              </Line>
              <Line>
                <div className="key">
                  <span>
                    IRPEF{" "}
                    {vat.type !== VAT_TYPE_TYPES.SEMPLIFICATO &&
                      "(Aliquota unica)"}
                  </span>
                </div>
                <span className="value">€ {formatNum(taxes.irpef.amount)}</span>
                <span className="info">
                  <InfoCircleOutlined onClick={onIrpefInfoClick} />
                </span>
              </Line>
              {taxes.irpefRegional.percentage ? (
                <Line>
                  <div className="key">
                    <span>Addizionale regionale IRPEF</span>
                  </div>
                  <span className="value">
                    € {formatNum(taxes.irpefRegional.amount)}
                  </span>
                  <span className="info">
                    <InfoCircleOutlined onClick={onIrpefRegionalInfoClick} />
                  </span>
                </Line>
              ) : null}
              {taxes.irpefMunicipality.percentage ? (
                <Line>
                  <div className="key">
                    <span>Addizionale comunale IRPEF</span>
                  </div>
                  <span className="value">
                    € {formatNum(taxes.irpefMunicipality.amount)}
                  </span>
                  <span className="info">
                    <InfoCircleOutlined
                      onClick={onIrpefMunicipalityInfoClick}
                    />
                  </span>
                </Line>
              ) : null}
              <Line>
                <div className="key">
                  <span>Previdenza sociale (Pensione)</span>
                </div>
                <span className="value">€ {formatNum(pension.amount)}</span>
                <span className="info">
                  <InfoCircleOutlined onClick={onPensionInfoClick} />
                </span>
              </Line>
            </Content>
          </Content>
        </Col>

        <RightCol md={{ span: 10 }} xs={{ span: 24 }}>
          <Title>I tuoi dati</Title>
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

Results.Content = styled.section`
  margin: 0 0 60px 50px;

  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
`;

Results.Line = styled.div`
  display: flex;
  margin-bottom: 8px;
  margin-left: 50px;
  vertical-align: middle;

  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }

  .key {
    display: inline-block;
    position: relative;
    flex-grow: 2;

    span {
      background: white;
      padding-right: 12px;
    }

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
      background: black;
      z-index: -1;
    }
  }

  .value {
    font-size: 120%;
    padding-left: 12px;
    padding: 4px 8px;
    border: 3px solid ${(props) => props.theme.colors.primary};
    white-space: nowrap;
  }

  .info {
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    > .anticon {
      font-size: 20px;
      color: ${(props) => props.theme.colors.grey};
      cursor: pointer;
    }
  }
`;

Results.RightCol = styled(Col)`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 32px;
  min-width: 350px;
`;

const { Content, Line, RightCol } = Results;

export default Results;
