import { useEffect, useState } from "react";

export function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth >= breakpoint;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(`(min-width: ${breakpoint}px)`);
    const listener = (event: MediaQueryListEvent) => setIsDesktop(event.matches);
    setIsDesktop(mql.matches);
    mql.addEventListener("change", listener);
    return () => mql.removeEventListener("change", listener);
  }, [breakpoint]);

  return isDesktop;
}
