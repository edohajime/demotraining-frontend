const PageNumber = ({onClick, page, active}) => {
  return (
    <div
      className={`page-number${active ? " active" : ""}`}
      onClick={onClick}
    >
      {page}
    </div>
  );
};
export default PageNumber;
