const ReadOnlyFormInput = ({value}) => {
  return (
    <>
      <input type="hidden" name="username" value={value} />
      <div className="input-username">{value}</div>
    </>
  );
};
export default ReadOnlyFormInput;
