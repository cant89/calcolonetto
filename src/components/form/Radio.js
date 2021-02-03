import { Radio } from "antd";
import styled from "styled-components";

export default styled(Radio)`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;

  .ant-radio-inner {
    width: 20px;
    height: 20px;

    &:after {
      width: 12px;
      height: 12px;
    }
  }
`;
