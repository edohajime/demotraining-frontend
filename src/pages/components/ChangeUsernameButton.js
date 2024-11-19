const ChangeUsernameButton = ({username}) => {
  return (
    <a href={`/change-username?username=${username}`} className="action action-mod">
      Change
    </a>
  );
};
export default ChangeUsernameButton;
