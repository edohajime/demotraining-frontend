import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import FormInput from "./components/FormInput";
import SubmitButton from "./components/SubmitButton";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setAuth, setAuthorities } = useAuth();
  const navigate = useNavigate();

  const handleChange = (event) => {
    if (event.target.name === "username") setUsername(event.target.value);
    if (event.target.name === "password") setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const url = "http://localhost:8081/login";

    axios.post(url, { username, password }).then((res) => {
      if (res.data.status !== null) {
        window.alert(res.data.message);
        if (res.data.status === true && res.data.token !== null) {
          navigate("/", { replace: true });
          setToken(res.data.token);
          setAuth(res.data.auth);
          setAuthorities(res.data.authorities);
        }
      }
    });
  };

  // setTimeout(() => {
  //   handleLogin();
  // }, 3 * 1000);

  return (
    <div className="container">
      <h1 className="header-title">Log In</h1>
      <form onSubmit={handleLogin}>
        <FormInput
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="User name"
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
        <SubmitButton text="Login" style={{ margin: "0 auto" }} />
      </form>
    </div>
  );
};
export default LoginPage;
