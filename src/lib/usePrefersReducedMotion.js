import { useEffect, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const getPreference = () => typeof window !== "undefined" && window.matchMedia(reducedMotionQuery).matches;

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(getPreference);
  useEffect(() => {
    const mediaQuery = window.matchMedia(reducedMotionQuery);
    const updatePreference = (event) => setReducedMotion(event.matches);
    setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);
  return reducedMotion;
}
