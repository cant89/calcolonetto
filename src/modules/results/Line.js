import React from "react";
import styled, { css } from "styled-components";

const Line = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

Line.Key = ({ children }) => (
  <div className="key">
    <span>{children}</span>
  </div>
);
Line.Value = ({ children }) => <div className="value">{children}</div>;
Line.Info = ({ children }) => <div className="info">{children}</div>;

const StyledLine = styled(Line)`
  display: flex;
  margin-bottom: 8px;
  margin-left: 50px;
  vertical-align: middle;

  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }

  .key {
    display: inline-block;
    position: relative;
    flex-grow: 2;

    span {
      background: white;
      padding-right: 12px;
    }

    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      width: 100%;
      height: 1px;
      background: black;
      z-index: -1;
    }
  }

  .value {
    position: relative;
    font-size: 120%;
    padding-left: 12px;
    padding: 4px 8px;
    border: 3px solid ${(props) => props.theme.colors.primary};
    white-space: nowrap;

    ${({ isNotValid }) =>
      isNotValid &&
      css`
        text-indent: -9999px;
        color: transparent;
        width: 60px;
        &:after {
          content: "...";
          color: black;
          position: absolute;
          display: block;
          text-indent: 0;
          top: 0;
        }
      `}
  }

  .isNotValid .value {
  }

  .info {
    width: 32px;
    display: flex;
    justify-content: center;
    align-items: center;

    > .anticon {
      font-size: 20px;
      color: ${(props) => props.theme.colors.grey};
      cursor: pointer;
    }
  }
`;

export default StyledLine;
