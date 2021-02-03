import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import BackButton from "./BackButton";
import styled from "styled-components";

const ActionsBar = ({ className, onNextClick, onPrevClick }) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <BackButton onClick={onPrevClick} />
      <Button type="primary" onClick={onNextClick}>
        {t("Continua")}
      </Button>
    </div>
  );
};

export default styled(ActionsBar)`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;

  button {
    margin: 8px 8px 8px 0;
  }
`;
