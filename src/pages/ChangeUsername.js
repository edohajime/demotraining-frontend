import { useEffect, useState } from "react";
import FormInput from "./components/FormInput";
import BackButton from "./components/BackButton";
import SubmitButton from "./components/SubmitButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { isUnauthorized } from "../utilities/Utilities";

const ChangeUsername = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const loadUserByUsername = (username) => {
    if (isUnauthorized()) {
      axios
        .get(`http://localhost:8081/user?username=${username}`)
        .then((res) => {
          if (res.data) setUser(res.data);
        });
    }
  };

  const handleChange = (event) => {
    if (event.target.name === "username") setUsername(event.target.value);
  };

  const handleChangeUsername = (event) => {
    event.preventDefault();

    const url = `http://localhost:8081/modify-user`;
    const formData = new FormData(event.target);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios.post(url, formData, config).then((res) => {
      if (res.data.status != null) {
        window.alert(res.data.message);
        if (res.data.status === true) {
          navigate("/");
        }
      }
    });
  };

  useEffect(() => {
    let searchUsername = searchParams.get("username");
    if (searchUsername) {
      loadUserByUsername(searchUsername);
    }
  }, []);

  useEffect(() => {
    setUsername(user.username);
  }, [user]);

  return (
    <div className="container">
      <h1 className="header-title">Change Username</h1>
      <form onSubmit={handleChangeUsername} method="post">
        {/* <p className="error" th:if="${error != null}" th:text="${error}" /> */}
        <input type="hidden" name="id" value={user.id} />
        <FormInput
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          placeholder="User name"
        />
        <div className="btns">
          <BackButton href="/" />
          <SubmitButton text="Change" />
        </div>
      </form>
    </div>
  );
};
export default ChangeUsername;
