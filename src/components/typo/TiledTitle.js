import React from "react";
import { Typography } from "antd";
import styled from "styled-components";

const TiledTitle = ({ children, subtitle, className, type }) => {
  return (
    <Typography.Title className={`${className} ${type}`}>
      {children}
      <span className="subtitle">{subtitle}</span>
    </Typography.Title>
  );
};

export default styled(TiledTitle)`
  &&& {
    margin-bottom: 40px;
    position: relative;

    &:before {
      content: "";
      position: absolute;
      left: -50px;
      top: -20px;
      z-index: -1;
      transform: rotate(${({ tileRotation }) => tileRotation}deg);
    }

    &.square {
      &:before {
        width: 100px;
        height: 100px;
        background: ${(props) => props.theme.colors.primary};
      }
    }
    &.circle {
      &:before {
        border-radius: 100%;
        width: 120px;
        height: 120px;
        background: ${(props) => props.theme.colors.primary};
      }
    }
    &.triangle {
      &:before {
        width: 0;
        height: 0;
        border-left: 65px solid transparent;
        border-right: 70px solid transparent;
        border-bottom: 110px solid ${(props) => props.theme.colors.primary};
      }
    }

    .subtitle {
      display: block;
      font-size: 18px;
      color: ${({ theme }) => theme.colors.primaryTextLight};
    }
  }
`;
