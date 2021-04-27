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
    background: ${(props) =>
      props.type === "primary" ? props.theme.colors.primary : "white"};
    color: ${(props) => props.theme.colors.primaryText};
    border-color: ${(props) =>
      props.type === "primary" ? props.theme.colors.primary : "black"};
  }
`;
