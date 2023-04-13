import { useEffect, useState } from "react";

export function useDelayState<T>(currentState: T, delay: number): T {
  const [delayedState, setState] = useState(currentState);

  useEffect(() => {
    setTimeout(() => {
      setState(currentState);
    }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState]);

  return delayedState;
}
