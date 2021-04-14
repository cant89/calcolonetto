import React from "react";
import styled from "styled-components";

const Header = (props) => {
  return (
    <header {...props}>
      <h1>calcolonetto.io</h1>
    </header>
  );
};

export default styled(Header)`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: center;

  h1 {
    margin: 0;
  }
`;
