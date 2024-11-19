import axios from "axios";

export const isUnauthorized = () => {
  const unauthorized = axios.defaults.headers.common["Authorization"];
  return unauthorized ? unauthorized.startsWith("Bearer ") : false;
};

export const hasRole = (lstAuthorities, role) => {
  return lstAuthorities && lstAuthorities.find((obj) => obj.authority === role);
};

