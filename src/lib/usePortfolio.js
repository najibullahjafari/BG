import { useContext } from "react";
import { PortfolioContext } from "./portfolioContext";

export function usePortfolio() {
  return useContext(PortfolioContext);
}
