import { useLocation } from "react-router-dom";

export function useQuery() {
  const res = {};
  const params = new URLSearchParams(useLocation().search);
  for (const [key, value] of params.entries()) {
    try {
      res[key] = JSON.parse(value);
    } catch {
      res[key] = value;
    }
  }
  return res;
}

export const getNextStepUrl = (step, data) =>
  `/?step=${step}&data=${JSON.stringify(data)}`;
