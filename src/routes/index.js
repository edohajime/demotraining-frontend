import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddUser from "../pages/AddUser";
import ChangePassword from "../pages/ChangePassword";
import ChangeUsername from "../pages/ChangeUsername";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import Profile from "../pages/Profile";
import UpdateProfile from "../pages/UpdateProfile";
import ViewProfile from "../pages/ViewProfile";
import { useAuth } from "../provider/authProvider";
import ProtectedRoute from "./ProtectedRoute";
import Logout from "../pages/Logout";
import { hasRole } from "../utilities/Utilities";

const Routes = () => {
  const { token, authorities } = useAuth();

  const parseIfAuthoritiesIsString = (typeof authorities) === "string" ? JSON.parse(authorities) : authorities;
  // const routesForPublic = [
  //   {
  //     path: "/login",
  //     element: <LoginPage />,
  //   },
  // ];
  const routesForAuthenticatedAdminOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/add-user",
          element: <AddUser />,
        },
        {
          path: "/change-username",
          element: <ChangeUsername />,
        },
      ],
    },
  ];
  const routesForAuthenticatedUserOnly = [
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/update-profile",
          element: <UpdateProfile />,
        },
        {
          path: "/change-password",
          element: <ChangePassword />,
        },
        {
          path: "/view-profile",
          element: <ViewProfile />,
        },
        {
          path: "/logout",
          element: <Logout />,
        },
      ],
    },
  ];
  const routesForNotAuthenticatedOnly = [
    {
      path: "/login",
      element: <LoginPage />,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedUserOnly,
    ...(hasRole(parseIfAuthoritiesIsString, "ROLE_ADMIN") ? routesForAuthenticatedAdminOnly : []),
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
