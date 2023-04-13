import { useMemo } from "react";

export function useIsErrorMessage(errorMessages: any) {
  const isErrorMessage = useMemo(() => {
    for (const key in errorMessages) {
      if (errorMessages[key] !== null && errorMessages[key] !== "") return true;
      return false;
    }
  }, [errorMessages]);
  return isErrorMessage;
}
