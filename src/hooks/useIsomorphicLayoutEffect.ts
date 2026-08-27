import { useEffect, useLayoutEffect } from "react";

/** Evita warnings de useLayoutEffect durante SSR. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
