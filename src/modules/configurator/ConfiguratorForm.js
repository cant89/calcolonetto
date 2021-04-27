import React, { useState } from "react";
import styled from "styled-components";

import InputNumber from "../../components/form/InputNumber";
import InputText from "../../components/form/InputText";
import Select from "../../components/form/Select";
import { VAT_TYPE_TYPES } from "../../constants";

const { Option } = Select;

const ConfiguratorForm = ({ data = {}, onChange }) => {
  const handleOnChange = (key) => (value) => {
    onChange(key, value);
  };

  const { gross, vat } = data;

  return (
    <section>
      <FormField>
        <label>Salario lordo annuo</label>
        <InputNumber
          value={gross}
          onChange={handleOnChange("SALARY")}
          step={1000}
          width="100%"
          parser={(value) => value.replace(/€\s?|(,*)/g, "")}
          formatter={(value) =>
            `€ ${String(value)
              .replace(/\D*/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
          }
        />
      </FormField>
      <FormField>
        <label>Anno apertura P.IVA</label>
        <InputText
          value={vat?.year}
          onChange={({ target }) => handleOnChange("VAT_YEAR")(target.value)}
          maxLength={4}
          width="100%"
        />
      </FormField>
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
    </section>
  );
};

ConfiguratorForm.FormField = styled.div`
  margin-bottom: 16px;

  > label {
    display: block;
    padding-bottom: 4px;
    color: ${({ theme }) => theme.colors.primaryTextLight};
  }
`;

const { FormField } = ConfiguratorForm;

export default ConfiguratorForm;
