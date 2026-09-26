import { createContext } from "react";
import { resume } from "../data/resume";

export const PortfolioContext = createContext({
  portfolio: resume,
  loading: true,
  error: null,
});
