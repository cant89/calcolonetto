import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";

import InputNumber from "../../components/form/InputNumber";
import Select from "../../components/form/Select";
import { VAT_TYPE_TYPES, PENSIONS, REGIONS } from "../../constants";

const { Option } = Select;

const ConfiguratorForm = ({ data = {}, onChange }) => {
  const handleOnChange = (key) => (value) => {
    onChange(key, value);
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
                value.length ? value.replace(/€\s?|(,*)/g, "") : 0
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

      <FormField>
        <label>Cassa pensionistica</label>
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
              {PENSIONS.map(({ name, label }) => (
                <Option value={name} key={name}>
                  ({name.toUpperCase()}) {label}
                </Option>
              ))}
            </Select>
          </Col>
          <Col>
            <Badge>
              <span className="second half">{pension?.percentage}%</span>
            </Badge>
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
