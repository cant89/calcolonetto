export const formatNum = (num = 0) =>
  num ? num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
