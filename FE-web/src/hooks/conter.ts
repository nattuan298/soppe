import { useEffect, useState } from "react";

export default function useCounter(value: number) {
  const [counter, setCounter] = useState<number>(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((preCounter) => {
        if (preCounter > 0) {
          return preCounter - 1;
        }
        return preCounter;
      });
    }, 1000);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return { counter, setCounter };
}
