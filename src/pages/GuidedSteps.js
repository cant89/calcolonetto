import React from "react";
import styled from "styled-components";
import { PageHeader } from "antd";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import QuestionVat from "./steps/Vat";
import QuestionVatYear from "./steps/VatYear";
import QuestionVatType from "./steps/VatType";
import QuestionSalary from "./steps/Salary";
import QuestionAteco from "./steps/Ateco";
import QuestionPension from "./steps/Pension";
import Results from "./steps/Results";
import useQueryParams from "../hooks/useQueryParams";
import { STEPS } from "../constants";

const StepsComponents = {
  [STEPS.VAT]: QuestionVat,
  [STEPS.SALARY]: QuestionSalary,
  [STEPS.VAT_YEAR]: QuestionVatYear,
  [STEPS.VAT_TYPE]: QuestionVatType,
  [STEPS.ATECO]: QuestionAteco,
  [STEPS.PENSION]: QuestionPension,
  [STEPS.RESULTS]: Results,
};

function GuidedSteps() {
  const { t } = useTranslation();
  const history = useHistory();

  let { step = STEPS.VAT } = useQueryParams();
  const Step = StepsComponents[step];
  const Wrapper = step === STEPS.RESULTS ? ResultsWrapper : StepsWrapper;

  return (
    <>
      <PageHeader onBack={() => history.push("/")} title="Esci" />
      <Wrapper>
        <Step t={t} />
      </Wrapper>
    </>
  );
}

GuidedSteps.StepsWrapper = styled.section`
  padding: 40px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
`;

GuidedSteps.ResultsWrapper = styled.section`
  padding: 40px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const { StepsWrapper, ResultsWrapper } = GuidedSteps;

export default GuidedSteps;
