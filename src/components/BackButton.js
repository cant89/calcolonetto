import React from "react";
import { useTranslation } from "react-i18next";
import { ArrowLeftOutlined } from "@ant-design/icons";

import Button from "./Button";

export default function BackButton(props) {
  const { t } = useTranslation();
  return (
    <Button {...props}>
      <ArrowLeftOutlined />
      {t("Indietro")}
    </Button>
  );
}
