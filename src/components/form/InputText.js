import { Input } from "antd";
import styled from "styled-components";

export default styled(Input)`
  font-size: 16px;
  padding: 6.5px 12px;
  width: ${({ width }) => (width ? width : "auto")};
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.error : ""};
`;
