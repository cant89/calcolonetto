import React from "react";
import { Button as AntButton } from "antd";
import styled from "styled-components";

function Button({ children, size = "large", ...rest }) {
  return (
    <AntButton shape="round" size={size} {...rest}>
      {children}
    </AntButton>
  );
}

export default styled(Button)`
  &&& {
    padding: 8px 32px;
    height: 43px;
    font-weight: 700;
  }
`;
