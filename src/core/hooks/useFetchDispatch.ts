import { useEffect, useRef } from "react";

interface UseFetchDispatchConditions {
  componentDidMounted?: boolean;
  componentDidUpdate?: boolean;
}

export const useFetchDispatch = (
  fn: () => void,
  deps: unknown[],
  options: UseFetchDispatchConditions
) => {
  const didMountRef = useRef<boolean>(false);
  useEffect(() => {
    if (!didMountRef.current && options.componentDidMounted) {
      fn();
      didMountRef.current = true;
      return;
    }
    if (options.componentDidUpdate) fn();
  }, deps);
};
