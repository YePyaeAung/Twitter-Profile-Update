import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false);
    const [authUser, setAuthUser] = useState({});
  return (
    <AuthContext.Provider value={{auth, setAuth, authUser, setAuthUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider