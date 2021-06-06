import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = props => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const iniateUser = currentUser ? currentUser : null;
  const [user, setUser] = useState(iniateUser);
  const [locationMenu, setLocationMenu] = useState("");

  return (
    <UserContext.Provider value={{user, setUser,locationMenu, setLocationMenu}}>
      {props.children}
    </UserContext.Provider>
  );
};