import React from "react";
import { Card } from "antd";
import styled from "styled-components";

export default styled(Card)`
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;

  .ant-card-head {
    background: ${(props) => props.theme.colors.primary};
  }

  .ant-card-head-title {
    font-size: 24px;
  }
`;
