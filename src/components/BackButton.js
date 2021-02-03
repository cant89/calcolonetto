import React from "react";
import Button from "./Button";
import { useTranslation } from "react-i18next";

export default function BackButton(props) {
  const { t } = useTranslation();
  return <Button {...props}>{t("Indietro")}</Button>;
}
