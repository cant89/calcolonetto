import React from "react";
import styled from "styled-components";
import { PageHeader } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import QuestionVat from "./steps/Questions/Vat";
import QuestionVatYear from "./steps/Questions/VatYear";
import QuestionVatType from "./steps/Questions/VatType";
import QuestionSalary from "./steps/Questions/Salary";
import QuestionPension from "./steps/Questions/Pension";
import { useQueryParams } from "../hooks";
import { STEPS } from "../constants";

const StepsComponents = {
  [STEPS.VAT]: QuestionVat,
  [STEPS.SALARY]: QuestionSalary,
  [STEPS.VAT_YEAR]: QuestionVatYear,
  [STEPS.VAT_TYPE]: QuestionVatType,
  [STEPS.PENSION]: QuestionPension,
};

function GuidedSteps({ className }) {
  const { t } = useTranslation();
  const history = useHistory();

  let { step = STEPS.VAT } = useQueryParams();
  const Step = StepsComponents[step];

  return (
    <>
      <PageHeader onBack={() => history.push("/")} title="Esci" />
      <section className={className}>
        <Step t={t} />
      </section>
    </>
  );
}

export default styled(GuidedSteps)`
  padding: 40px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
`;
