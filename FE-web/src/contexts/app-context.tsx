import { ReactNode, createContext } from "react";
import { useNotification } from "./notification/notification";

/**
 * Contains states that need to be shared between all pages.
 *
 * E.g. notification, cart, inventory...
 */
export const AppContext = createContext<{
  notification: ReturnType<typeof useNotification>["notification"];
  setNotification: ReturnType<typeof useNotification>["setNotification"];
}>({
  notification: {},
  setNotification: () => {},
});

type AppContextProviderProps = {
  children: ReactNode;
  initNotification?: ReturnType<typeof useNotification>["notification"];
};

export function AppContextProvider({ children, initNotification }: AppContextProviderProps) {
  const { notification, setNotification } = useNotification(initNotification);

  return (
    <AppContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
