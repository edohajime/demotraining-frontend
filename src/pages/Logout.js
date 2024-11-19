import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { useEffect } from "react";

const Logout = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setToken(null);
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]);
};
export default Logout;
