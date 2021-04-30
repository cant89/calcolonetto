import React from "react";
import { Select } from "antd";
import styled from "styled-components";

const StyledSelect = styled(({ hasError, ...rest }) => <Select {...rest} />)`
  font-size: 16px;
  width: ${({ width }) => (width ? width : "auto")};

  &&& {
    .ant-select-selector {
      padding: 4px 23px;
      height: 40px;
      border-color: ${({ hasError, theme }) =>
        hasError ? theme.colors.error : ""};
    }
  }
`;

StyledSelect.Option = Select.Option;

export default StyledSelect;
