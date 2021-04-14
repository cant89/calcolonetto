import { InputNumber } from "antd";
import styled from "styled-components";

export default styled(InputNumber)`
  font-size: 16px;
  padding: 4px 8px;
  width: ${({ width }) => (width ? width : "auto")};
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.error : ""};
`;
