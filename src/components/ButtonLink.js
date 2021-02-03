import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "./Button";

const ButtonLink = ({ children, to, ...rest }) => {
  return (
    <Link to={to}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
};

export default styled(ButtonLink)``;
