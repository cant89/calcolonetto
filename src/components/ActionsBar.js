import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowRightOutlined } from "@ant-design/icons";

import Button from "./Button";
import BackButton from "./BackButton";
import styled from "styled-components";

const ActionsBar = ({ className, onNextClick, onPrevClick }) => {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {onPrevClick ? <BackButton onClick={onPrevClick} /> : <div />}
      {onNextClick && (
        <Button type="primary" onClick={onNextClick}>
          {t("Continua")}

          <ArrowRightOutlined />
        </Button>
      )}
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
