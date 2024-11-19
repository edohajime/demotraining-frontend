import { useEffect, useState } from "react";
import CurrentUsername from "./components/CurrentUsername";
import LogOut from "./components/LogOut";
import ProfileSection from "./components/ProfileSection";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { isUnauthorized } from "../utilities/Utilities";

const ViewProfile = () => {
  const [user, setUser] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const loadUserByUsername = (username) => {
    if (isUnauthorized()) {
      axios
        .get(`http://localhost:8081/user?username=${username}`)
        .then((res) => {
          if (res.data) setUser(res.data);
        });
    }
  };

  useEffect(() => {
    let username = searchParams.get("username");
    if (username) {
      loadUserByUsername(username);
    }
  }, []);

  return (
    <div className="container">
      <div className="header">
        <CurrentUsername />
        <div className="top-right-btns">
          <LogOut />
        </div>
      </div>
      <ProfileSection user={user} />
    </div>
  );
};
export default ViewProfile;
