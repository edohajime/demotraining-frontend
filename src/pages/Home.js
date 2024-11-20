import { useEffect, useState } from "react";
import CurrentUsername from "./components/CurrentUsername";
import AccountInfoButton from "./components/AccountInfoButton";
import LogOut from "./components/LogOut";
import AddUserButton from "./components/AddUserButton";
import SearchBar from "./components/SearchBar";
import ViewProfileButton from "./components/ViewProfileButton";
import ChangeUsernameButton from "./components/ChangeUsernameButton";
import DeleteUserButton from "./components/DeleteUserButton";
import axios from "axios";
import { hasRole, isUnauthorized } from "../utilities/Utilities";
import PageNumberOptions from "./components/PageNumberOptions";

const Home = () => {
  const [data, setData] = useState([]);
  const [authorities, setAuthorities] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const loadUsers = (page) => {
    if (isUnauthorized()) {
      let searchName = document.getElementById("searchName").value;
      searchName = searchName.replaceAll("\\", "");

      axios
        .get(
          `http://localhost:8081/all-users?page=${page}&searchName=${searchName}`
        )
        .then((res) => {
          if (res.data.content) {
            console.log(res.data);
            setData(res.data.content);
            setCurrentPage(page);
            if (totalPages !== res.data.totalPages) {
              setTotalPages(res.data.totalPages);
            }
          }
        });
    }
  };

  const handleDel = (username) => {
    if (window.confirm(`Are you sure to remove user ${username}?`)) {
      while (!isUnauthorized()) {
        console.log("authorizing...")
      }
      axios
        .get(`http://localhost:8081/del-user?username=${username}`)
        .then((res) => {
          if (res.data.status) {
            loadUsers(0);
            console.log(res.data.message);
            window.alert(res.data.message);
          }
        });
    }
  };

  const handlePage = (event, page) => {
    const pageNumberElements =
      event.target.parentElement.querySelectorAll(".page-number");
    pageNumberElements.forEach((pageNumberElement) => {
      if (pageNumberElement.classList.contains("active")) {
        pageNumberElement.classList.remove("active");
      }
    });
    event.target.classList.add("active");

    loadUsers(page);
  };

  useEffect(() => {
    let strAuthorities = localStorage.getItem("authorities");
    if (strAuthorities) {
      setAuthorities(JSON.parse(strAuthorities));
    }
  }, []);

  useEffect(() => {
    loadUsers(0);
  }, []);

  useEffect(() => {
    setPageNumbers(Array.from({ length: totalPages }));
  }, [totalPages]);
  return (
    <div className="container">
      <div className="header">
        <CurrentUsername />
        <div className="top-right-btns">
          <AccountInfoButton />
          <LogOut />
        </div>
      </div>
      <div className="header">
        <h1 className="header-title">User List</h1>
        {hasRole(authorities, "ROLE_ADMIN") && (
          <div className="top-right-btns">
            <AddUserButton />
          </div>
        )}
      </div>
      <SearchBar onKeyUp={(e) => loadUsers(0)} />
      {data.map((user, index) => (
        <div className="users" key={index}>
          <p className="username">{user.username}</p>
          {user.username !== localStorage.getItem("auth") && (
            <>
              <ViewProfileButton username={user.username} />
              {hasRole(authorities, "ROLE_ADMIN") && (
                <>
                  <ChangeUsernameButton username={user.username} />
                  <DeleteUserButton onClick={(e) => handleDel(user.username)} />
                </>
              )}
            </>
          )}
        </div>
      ))}
      <div className="page-number-list">
        {pageNumbers.map((page, index) => (
          <PageNumberOptions
            key={index}
            index={index}
            totalPages={totalPages}
            currentPage={currentPage}
            handlePage={(e) => handlePage(e, index)}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
