import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [auth, setAuth_] = useState(localStorage.getItem("auth"));
  const [authorities, setAuthorities_] = useState(localStorage.getItem("authorities"));

  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setAuth = (newAuth) => {
    setAuth_(newAuth);
  };

  const setAuthorities = (newAuthorities) => {
    setAuthorities_(newAuthorities);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (auth) {
      localStorage.setItem("auth", auth);
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  useEffect(() => {
    if (authorities) {
      console.log("authProvider: ", authorities);
      let strAuthorities = "";
      if ((typeof authorities) !== "string") {
        strAuthorities = JSON.stringify(authorities);
      } else {
        strAuthorities = authorities;
      }
      localStorage.setItem("authorities", strAuthorities);
    } else {
      localStorage.removeItem("authorities");
    }
  }, [authorities]);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      auth,
      setAuth,
      authorities,
      setAuthorities,
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
