import { useEffect, useState } from "react";
import CurrentUsername from "./components/CurrentUsername";
import LogOut from "./components/LogOut";
import ChangePasswordButton from "./components/ChangePasswordButton";
import ProfileSection from "./components/ProfileSection";
import axios from "axios";
import { isUnauthorized } from "../utilities/Utilities";

const Profile = () => {
  const [user, setUser] = useState({});

  const currentUser = localStorage.getItem("auth");

  const getUser = (name) => {
    if (isUnauthorized()) {
      axios
        .get(`http://localhost:8081/user?username=${currentUser}`)
        .then((res) => {
          setUser(res.data);
        });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <CurrentUsername />
        <div className="top-right-btns">
          <ChangePasswordButton href="/change-password" />
          <LogOut />
        </div>
      </div>
      <ProfileSection user={user} updateProfile={true} />
    </div>
  );
};

export default Profile;
