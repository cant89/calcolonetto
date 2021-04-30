import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Row, Col, Typography, Divider } from "antd";
import { ArrowRightOutlined, ControlOutlined } from "@ant-design/icons";

import { ROUTES } from "../constants";
import Button from "../components/Button";

function Home() {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <section>
      <Home.Intro>
        <Col span={24} order={2} sm={{ order: 1, span: 16 }}>
          <Typography.Title level={1}>
            La Partita IVA,
            <br /> resa semplice.
          </Typography.Title>
          <Typography.Title level={3}>
            Stima al volo il tuo effettivo guadagno,
            <br />
            le tasse da pagare e la pensione da versare <br />
            in pochi semplici passi.
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
          <Divider
            style={{
              width: "200px",
              minWidth: "auto",
              maxWidth: "auto",
              fontSize: "14px",
            }}
          >
            oppure
          </Divider>
          <Button
            size="normal"
            onClick={() => history.push(`${ROUTES.GUIDED_STEPS}?step=RESULTS`)}
          >
            {t("Inserisci dati manualmente")}
            <ControlOutlined />
          </Button>
        </Col>

        <Col span={24} order={1} sm={{ order: 2, span: 8 }}>
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

  @media screen and (max-width: 575px) {
    padding: 32px;
  }

  h1 {
    font-size: 80px;
    width: 100%;
    margin-bottom: 16px;

    @media screen and (max-width: 900px) {
      font-size: 50px;
    }
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
