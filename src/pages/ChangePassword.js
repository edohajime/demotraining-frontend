import { useState } from "react";
import FormInput from "./components/FormInput";
import BackButton from "./components/BackButton";
import SubmitButton from "./components/SubmitButton";
import ReadOnlyFormInput from "./components/ReadOnlyFormInput";
import { replace, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const currentUser = localStorage.getItem("auth");
  const navigate = useNavigate();

  const handleChangePassword = (event) => {
    event.preventDefault();

    const url = "http://localhost:8081/change-pwd";
    const formData = new FormData(event.target);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios.post(url, formData, config).then((res) => {
      if (res.data.status !== null) {
        window.alert(res.data.message);
        if (res.data.status === true) {
          navigate("/");
        }
      }
    });
  };
  return (
    <div className="container">
      <h1 className="header-title">Change Password</h1>
      <form onSubmit={handleChangePassword} method="post">
        {/* <p className="error" th:if="${error != null}" th:text="${error}" /> */}
        <ReadOnlyFormInput value={currentUser} />
        <FormInput type="password" name="password" placeholder="New password" />
        <FormInput
          type="password"
          name="confirm_password"
          placeholder="Confirm password"
        />
        <div className="btns">
          <BackButton href="/profile" />
          <SubmitButton text="Modify" />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
