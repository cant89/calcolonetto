import { Typography } from "antd";
import React from "react";
import styled from "styled-components";

const Link = ({ children, ...rest }) => {
  return <Typography.Link {...rest}>{children}</Typography.Link>;
};

export default styled(Link)`
  &&& {
    color: ${(props) => props.theme.colors.primary};
  }
`;
