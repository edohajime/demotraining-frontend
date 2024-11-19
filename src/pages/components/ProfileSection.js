import BackMediumButton from "./BackMediumButton";
import UpdateProfileButton from "./UpdateProfileButton";

const ProfileSection = ({ user, updateProfile }) => {
  return (
    <div className="section">
      {updateProfile && <UpdateProfileButton href="/update-profile" />}
      <BackMediumButton href="/" />
      <div className="user-avatar" />
      <h1 className="header-title">{user.fullname ? user.fullname : ""}</h1>
      <p className="bio">{user.bio ? user.bio : ""}</p>
      <div className="user-info">
        <p>
          Born: <span>{user.birthyear ? user.birthyear : ""}</span>
        </p>
        <p>
          Email: <span>{user.email ? user.email : ""}</span>
        </p>
        <p>
          Phone: <span>{user.phone ? user.phone : ""}</span>
        </p>
      </div>
    </div>
  );
};
export default ProfileSection;
