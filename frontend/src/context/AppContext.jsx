import React, { createContext, useState } from "react";
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const value = {
        user,
        setUser,
    };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppContextProvider };

export default AppContextProvider;