const SearchBar = ({onKeyUp}) => {
  return (
    <div className="header">
      <input
        className="form-input search"
        type="text"
        name="searchName"
        id="searchName"
        onKeyUp={onKeyUp}
        placeholder="Search... "
      />
    </div>
  );
};
export default SearchBar;
