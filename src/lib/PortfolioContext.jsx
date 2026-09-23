import { useEffect, useState } from "react";
import { loadPortfolio } from "./appwrite";
import { resume } from "../data/resume";
import { PortfolioContext } from "./portfolioContext";

export function PortfolioProvider({ children }) {
  const [portfolio, setPortfolio] = useState(resume);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    loadPortfolio()
      .then((next) => {
        if (active) setPortfolio({ ...next });
      })
      .catch((reason) => {
        if (active) setError(reason);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ portfolio, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}
