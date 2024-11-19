import { useEffect, useState } from "react";
import ReadOnlyFormInput from "./components/ReadOnlyFormInput";
import FormInput from "./components/FormInput";
import BackButton from "./components/BackButton";
import SubmitButton from "./components/SubmitButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isUnauthorized } from "../utilities/Utilities";

const UpdateProfile = () => {
  const [user, setUser] = useState({});
  const [fullname, setFullname] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const loadUser = () => {
    if (isUnauthorized()) {
      axios
        .get(
          `http://localhost:8081/user?username=${localStorage.getItem("auth")}`
        )
        .then((res) => {
          if (res.data) setUser(res.data);
        });
    }
  };

  const handleUpdateProfile = (event) => {
    event.preventDefault();

    const url = "http://localhost:8081/update-profile";
    const formData = new FormData(event.target);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    axios.post(url, formData, config).then((res) => {
      if (res.data.status !== null) {
        window.alert(res.data.message);
        if (res.data.status === true) {
          navigate("/profile");
        }
      }
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    setFullname(user.fullname);
    setBio(user.bio);
    setBirthyear(user.birthyear);
    setEmail(user.email);
    setPhone(user.phone);
  }, [user]);

  const handleChange = (event) => {
    if (event.target.name === "fullname") setFullname(event.target.value);
    if (event.target.name === "bio") setBio(event.target.value);
    if (event.target.name === "birthyear") setBirthyear(event.target.value);
    if (event.target.name === "email") setEmail(event.target.value);
    if (event.target.name === "phone") setPhone(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="header-title">User Infomation</h1>
      <form onSubmit={handleUpdateProfile}>
        {/* <p className="error" th:if="${error != null}" th:text="${error}" /> */}
        <ReadOnlyFormInput value={user.username} />
        <FormInput
          type="text"
          name="fullname"
          value={fullname}
          onChange={handleChange}
          placeholder="Full name"
        />
        <FormInput
          type="number"
          name="birthyear"
          value={birthyear}
          onChange={handleChange}
          placeholder="Birth year"
        />
        <FormInput
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
        <FormInput
          type="tel"
          name="phone"
          value={phone}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <FormInput
          type="textarea"
          name="bio"
          value={bio}
          onChange={handleChange}
          placeholder="Biography"
        />
        <div className="btns">
          <BackButton href="/profile" />
          <SubmitButton text="Update" />
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
