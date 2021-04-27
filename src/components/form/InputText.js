import React from "react";
import { Input } from "antd";
import styled from "styled-components";

export default styled(({ hasError, ...rest }) => <Input {...rest} />)`
  font-size: 16px;
  padding: 6.5px 23px;
  width: ${({ width }) => (width ? width : "auto")};
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.error : ""};
`;
