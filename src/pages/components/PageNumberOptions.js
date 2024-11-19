import PageNumber from "./PageNumber";

const PageNumberOptions = ({ index, handlePage, totalPages, currentPage }) => {
  if (index === 0 && currentPage !== 0) {
    return <PageNumber page={index + 1} onClick={handlePage} />;
  }
  if (index < currentPage - 2) {
    return "";
  }
  if (index < currentPage - 1) {
    return <PageNumber page={"..."} />;
  }
  if (index === currentPage) {
    return <PageNumber page={index + 1} onClick={handlePage} active />;
  }
  if (index < currentPage + 2) {
    return <PageNumber page={index + 1} onClick={handlePage} />;
  }
  if (index < currentPage + 3 && currentPage + 3 < totalPages) {
    return <PageNumber page={"..."} />;
  }
  if (index !== totalPages - 1) {
    return "";
  }
  return <PageNumber page={index + 1} onClick={handlePage} />;
};

export default PageNumberOptions;
