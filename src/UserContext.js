import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(null);

  return (
    <UserContext.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
