const CurrentUsername = () => {
  const currentUser = localStorage.getItem("auth");

  return (
    <p className="current-username">
      User: <span>{currentUser}</span>
    </p>
  );
};
export default CurrentUsername;
