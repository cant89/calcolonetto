import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png";

const Header = (props) => {
  return (
    <header {...props}>
      <img src={logo} alt="calcolonetto.io logo" width="30" />
      <h1>calcolonetto.io</h1>
    </header>
  );
};

export default styled(Header)`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 8px;
  }

  h1 {
    margin: 0;
  }
`;
