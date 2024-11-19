const SubmitButton = ({text, style, onClick}) => {
  return (
    <button type="submit" className="btn" style={style}>
      {text}
    </button>
  );
};
export default SubmitButton;
