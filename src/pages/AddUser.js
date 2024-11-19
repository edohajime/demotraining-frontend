import { useEffect } from "react";
import BackButton from "./components/BackButton";
import FormInput from "./components/FormInput";
import SubmitButton from "./components/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const handleRegister = (event) => {
    event.preventDefault();

    const url = "http://localhost:8081/register";
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

  return (
    <div className="container">
      <h1 className="header-title">User Infomation</h1>
      <form onSubmit={handleRegister} method="post">
        {/* <p className="error" th:if="${error != null}" th:text="${error}" /> */}
        <FormInput type="text" name="username" placeholder="User name" />
        <FormInput type="password" name="password" placeholder="Password" />
        <FormInput
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
        />
        <div className="btns">
          <BackButton href="/" />
          <SubmitButton text="Register" />
        </div>
      </form>
    </div>
  );
};
export default AddUser;
