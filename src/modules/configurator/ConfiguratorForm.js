import React from "react";
import { Row, Col, Modal, Collapse, Alert } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import styled from "styled-components";

import InputNumber from "../../components/form/InputNumber";
import Select from "../../components/form/Select";
import { VAT_TYPE_TYPES, PENSIONS, REGIONS } from "../../constants";

const { Option } = Select;

const ConfiguratorForm = ({ data = {}, onChange }) => {
  const handleOnChange = (key) => (value) => {
    onChange(key, value);
  };

  const onIsFivePercentHelpClick = () => {
    Modal.info({
      title: "Agevolazione IRPEF al 5%",
      width: 600,
      content: (
        <>
          <p>A chi spetta?</p>
          <p>
            <strong>
              A chi deve aprire una nuova P.IVA con regime forfettario, o a chi
              ne ha aperta una non oltre 5 anni fa.
            </strong>
          </p>
          <p>
            Trascorsi i primi 5 anni di attvità l'imposta (la tassa) IRPEF sul
            reddito imponibile, per il regime forfettario, passa al 15%.
          </p>
          <div style={{ marginTop: "24px" }}>
            <Alert
              message="Casi particolari"
              type="warning"
              description={
                <div>
                  E' da tenere presente che anche le seguenti tre condizoni
                  devono essere rispettate per potere usufruire di tale
                  agevolazione:
                  <Collapse ghost>
                    <Collapse.Panel header="Espandi le condizioni" key="1">
                      <ol>
                        <li>
                          Che non sia stata esercitata, nei tre anni precedenti
                          l'inizio dell’attività, attività artistica,
                          professionale ovvero d'impresa, anche in forma
                          associata o familiare
                        </li>
                        <li>
                          Che l’attività da esercitare non costituisca, in
                          nessun modo, mera prosecuzione di altra attività
                          precedentemente svolta sotto forma di lavoro
                          dipendente o autonomo, escluso il caso in cui
                          l’attività precedentemente svolta consista nel periodo
                          di pratica obbligatoria ai fini dell'esercizio di arti
                          o professioni
                        </li>
                        <li>
                          Qualora venga proseguita un'attività svolta in
                          precedenza da altro soggetto, l'ammontare dei relativi
                          ricavi e compensi, realizzati nel periodo d'imposta
                          precedente quello di riconoscimento del beneficio, non
                          sia superiore ai limiti che, a seconda dell’attività,
                          consentono l’accesso al regime.
                        </li>
                      </ol>
                    </Collapse.Panel>
                  </Collapse>
                </div>
              }
            />
          </div>
        </>
      ),
    });
  };

  const { gross, vat, pension, location, monthsNum } = data;

  return (
    <section>
      <Row gutter="8" align="middle" wrap={false}>
        <Col flex="auto">
          <FormField>
            <label>Salario lordo annuo</label>
            <InputNumber
              value={gross?.yearly}
              onChange={handleOnChange("SALARY")}
              step={1000}
              width="100%"
              parser={(value) =>
                value?.length ? value.replace(/€\s?|(,*)/g, "") : 0
              }
              formatter={(value) =>
                `€ ${String(value)
                  .replace(/\D*/g, "")
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
              }
            />
          </FormField>
        </Col>
        <Col>
          <FormField>
            <label>Mensilità</label>
            <InputNumber
              value={monthsNum}
              width={100}
              onChange={handleOnChange("monthsNum")}
            />
          </FormField>
        </Col>
      </Row>

      <FormField>
        <label>Tipo P.IVA</label>
        <Select
          value={vat?.type}
          onChange={handleOnChange("VAT_TYPE")}
          maxLength={4}
          width="100%"
        >
          <Option value={VAT_TYPE_TYPES.MINIMI}>Regime dei minimi</Option>
          <Option value={VAT_TYPE_TYPES.FORFETTARIO}>Regime forfettario</Option>
          <Option value={VAT_TYPE_TYPES.SEMPLIFICATO}>
            Regime semplificato/ordinario
          </Option>
        </Select>
      </FormField>

      <FormField visible={vat?.type === VAT_TYPE_TYPES.FORFETTARIO}>
        <label>Coefficiente di redditività</label>
        <Row gutter="8" align="middle" wrap={false}>
          <Col flex="auto">
            <InputNumber
              value={vat?.ateco?.coeff}
              onChange={(coeff) => handleOnChange("ATECO")({ coeff })}
              width="100%"
              parser={(value) =>
                value.length ? value.replace(/%\s?|(,*)/g, "") : 0
              }
              formatter={(value) => `% ${String(value).replace(/\D*/g, "")}`}
            />
          </Col>
          <Col>
            {vat?.ateco?.atecoCode ? (
              <Badge>
                <span className="first half">Cod. ATECO</span>
                <span className="second half">{vat?.ateco?.atecoCode}</span>
              </Badge>
            ) : null}
          </Col>
        </Row>
      </FormField>

      <FormField visible={vat?.type === VAT_TYPE_TYPES.FORFETTARIO}>
        <label>
          Agevolazione al 5%{" "}
          <InfoCircleOutlined onClick={onIsFivePercentHelpClick} />
        </label>

        <Select
          value={vat?.hasFivePercent ? "yes" : "no"}
          onChange={(value) => {
            handleOnChange("isFivePercent")(value);
          }}
          width="100%"
        >
          <Option value="yes" key="yes">
            Si
          </Option>
          <Option value="no" key="no">
            No
          </Option>
        </Select>
      </FormField>

      <FormField>
        <label>Cassa previdenziale</label>
        <Row gutter="8" align="middle" wrap={false}>
          <Col flex="auto">
            <Select
              value={pension?.type}
              onChange={(value) => {
                handleOnChange("PENSION")(
                  PENSIONS.find((el) => el.name === value)
                );
              }}
              width="100%"
            >
              {PENSIONS.map(({ name, label, disabled }) => (
                <Option value={name} key={name} disabled={disabled}>
                  ({name.toUpperCase()}) {label}{" "}
                  {disabled ? "(non ancora supportato)" : ""}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
      </FormField>

      <FormField>
        <label>Luogo</label>
        <Select
          value={location}
          onChange={handleOnChange("LOCATION")}
          width="100%"
        >
          {REGIONS.map(({ name, id }) => (
            <Option value={id} key={id}>
              {name}
            </Option>
          ))}
        </Select>
      </FormField>
    </section>
  );
};

ConfiguratorForm.FormField = styled.div`
  margin-bottom: 16px;
  display: ${({ visible = true }) => (visible ? "block" : "none")};

  > label {
    display: block;
    padding-bottom: 4px;
    color: ${({ theme }) => theme.colors.primaryTextLight};
  }
`;

ConfiguratorForm.Badge = styled.div`
  display: flex;
  flex-wrap: nowrap;

  .half {
    padding: 8px;
    height: 40px;
    font-weight: 700;
    border: 1px solid #d9d9d9;
  }

  .first {
    border-right: none;
    color: ${({ theme }) => theme.colors.primaryTextLight};
    border-radius: 5px 0 0 5px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .second {
    border-left: 1px solid #d9d9d9;
    border-radius: 0 5px 5px 0;
  }
`;

const { FormField, Badge } = ConfiguratorForm;

export default ConfiguratorForm;
