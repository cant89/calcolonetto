import { useLocation } from "react-router-dom";

const parse = (data) => {
  if (typeof data !== "object" || Array.isArray(data)) {
    return data;
  }

  return Object.entries(data).reduce((acc, [key, value]) => {
    let parsedValue;

    try {
      parsedValue = JSON.parse(value);
    } catch {
      parsedValue = value;
    }

    return {
      ...acc,
      [key]: parsedValue,
    };
  }, {});
};

function useQueryParams() {
  const res = {};
  const params = new URLSearchParams(useLocation().search);

  for (const [key, value] of params.entries()) {
    try {
      res[key] = parse(JSON.parse(value));
    } catch {
      res[key] = value;
    }
  }

  return res;
}

export default useQueryParams;
