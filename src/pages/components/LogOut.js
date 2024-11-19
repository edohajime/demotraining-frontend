import { Link } from "react-router-dom";

const LogOut = () => {
  return (
    <Link to="/logout" className="action action-logout">
      Log Out
    </Link>
  );
};
export default LogOut;
