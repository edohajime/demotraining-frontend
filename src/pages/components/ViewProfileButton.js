const ViewProfileButton = ({username}) => {
  return (
    <a href={`/view-profile?username=${username}`} className="action action-view">
      View
    </a>
  );
};
export default ViewProfileButton;
