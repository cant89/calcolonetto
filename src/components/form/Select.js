import React from "react";
import { Select } from "antd";
import styled from "styled-components";

export default styled(Select)`
  font-size: 16px;
  width: ${({ width }) => (width ? width : "auto")};

  &&& {
    .ant-select-selector {
      padding: 4px 23px;
      height: 40px;
    }
  }
`;
