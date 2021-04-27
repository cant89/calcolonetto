import React, { useState } from "react";
import { useQuery } from "react-query";
import { Row, Col, Collapse } from "antd";
import styled from "styled-components";
import { CashOutline } from "react-ionicons";

import { STEPS } from "../../constants";
import { getResult } from "../../helpers/calculator";
import { formatNum } from "../../helpers/common";
import useStepManager from "../../hooks/useStepManager";
import getAtecoCodes from "../../services/getAtecoCodes";
import Title from "../../components/typo/Title";
import ActionsBar from "../../components/ActionsBar";
import TiledTitle from "../../components/typo/TiledTitle";
import ConfiguratorForm from "../../modules/configurator/ConfiguratorForm";

const Results = () => {
  const [selectedAtecoCode, setSelectedAtecoCode] = useState();

  const { selection, prevStep, updateHistoryData } = useStepManager({
    stepKey: STEPS.RESULTS,
  });

  const { isLoading } = useQuery("ateco", getAtecoCodes, {
    onSuccess: (data) => {
      if (selection[STEPS.ATECO]) {
        setSelectedAtecoCode(
          data.find((el) => el.atecoCode === selection[STEPS.ATECO])
        );
      }
    },
  });

  const handleOnConfiguratorChange = (key, value) => {
    updateHistoryData(key, value);
  };

  if (isLoading) {
    return "Loading...";
  }

  const result = getResult(selection, { atecoData: selectedAtecoCode });
  const { gross, net, vat, pension, taxes } = result;

  console.log(selection, result);

  return (
    <section>
      <Title
        style={{ textAlign: "center", fontSize: "80px", marginBottom: "60px" }}
      >
        Fatto!
      </Title>
      <Row gutter={{ md: 64, xs: 0 }}>
        <Col md={{ span: 14 }} xs={{ span: 24 }}>
          <Content>
            <TiledTitle
              subtitle="Ciò che fatturi"
              tileRotation={10}
              type="square"
            >
              Salario lordo
            </TiledTitle>

            <Line>
              <div className="key">
                <span>Annuo</span>
              </div>
              <span className="value"> € {formatNum(gross)}</span>
            </Line>
            <Line>
              <div className="key">
                <span>Mensile (12 mensilità)</span>
              </div>
              <span className="value"> € {formatNum(gross / 12)}</span>
            </Line>
          </Content>

          <Content>
            <TiledTitle
              subtitle="Ciò che ti rimane in tasca"
              tileRotation={-5}
              type="circle"
            >
              Salario netto
            </TiledTitle>

            <Line>
              <div className="key">
                <span>Annuo</span>
              </div>
              <span className="value"> € {formatNum(net.yearly)}</span>
            </Line>
            <Line>
              <div className="key">
                <span>Mensile (12 mensilità)</span>
              </div>
              <span className="value"> € {formatNum(net.monthly)}</span>
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
            </Line>
            <Content>
              <Line>
                <strong>Dettagli</strong>
              </Line>
              <Line>
                <div className="key">
                  <span>IRPEF</span>
                </div>
                <span className="value">€ {formatNum(taxes.irpef.amount)}</span>
              </Line>
              {taxes.irpefRegional.percentage ? (
                <Line>
                  <div className="key">
                    <span>Addizionale regionale IRPEF</span>
                  </div>
                  <span className="value">
                    € {formatNum(taxes.irpefRegional.amount)}
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
                </Line>
              ) : null}
              <Line>
                <div className="key">
                  <span>Previdenza sociale (Pensione)</span>
                </div>
                <span className="value">€ {formatNum(pension.amount)}</span>
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
  max-width: 400px;

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
`;

Results.RightCol = styled(Col)`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  padding: 32px;
`;

const { Content, Line, RightCol } = Results;

export default Results;
