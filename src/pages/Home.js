import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Row, Col, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

import { ROUTES } from "../constants";
import Button from "../components/Button";

function Home() {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <section>
      <Home.Intro>
        <Col span={16}>
          <Typography.Title level={1}>
            Calcola il netto <br /> dal lordo.
          </Typography.Title>
          <Typography.Title level={3}>
            <div
              dangerouslySetInnerHTML={{
                __html: t(
                  `Stima al volo il salario netto,<br /> 
                  le tasse da pagare e la pensione da versare <br />
                  in base al tuo salario annuo lordo.`
                ),
              }}
            />
          </Typography.Title>
          <Typography.Title level={4} color="primary">
            {t("Facile. Veloce. Gratis.")}
          </Typography.Title>
          <Button
            size="large"
            type="primary"
            onClick={() => history.push(ROUTES.GUIDED_STEPS)}
          >
            {t("Calcola ora")}
            <ArrowRightOutlined />
          </Button>
        </Col>

        <Col span={8}>
          <img src="/images/intro.svg" alt="calcola salario netto da lordo" />
        </Col>
      </Home.Intro>
    </section>
  );
}

Home.Intro = styled(Row)`
  max-width: 1300px;
  margin: 0 auto;
  padding: 80px;

  h1 {
    font-size: 80px;
    width: 100%;
    margin-bottom: 16px;
  }
  h3 {
    width: 100%;
    color: rgb(134 134 134);
    margin-bottom: 16px;
  }

  h4 {
    width: 100%;
    margin-bottom: 64px;
  }

  button {
    display: block;
  }

  img {
    width: 100%;
  }
`;

export default Home;
