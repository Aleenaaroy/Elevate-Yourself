import { useRoutes } from "react-router-dom";
import Home from "./Pages/intro/Home";
//import Register from "./Pages/user/Register";
//import Login from "./Pages/user/Login";
import Profile from "./Pages/user/Profile";
import UserFeed from "./Pages/user/UserFeed";

import Adminlogin from "./Pages/admin/Adminlogin";
import UsersList from "./Pages/admin/UsersList";
import CompanyList from "./Pages/admin/CompanyList";

import AddInfoPage from "./Pages/user/AddInfoPage";
import SavedPosts from "./Pages/user/SavedPosts";
import Auth from './Pages/auth-pages/Auth';

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/register", element: <Auth isLogin={false}/>},
    { path: "/login", element: <Auth isLogin={true}/>},
    { path: "/account", element: <Profile /> },
    { path: "/feed", element: <UserFeed /> },
    { path: "/details", element: <AddInfoPage /> },
    { path: "/details/:id", element: <AddInfoPage /> },
    { path: "/saved", element: <SavedPosts /> },
    { path: "/admin", element: <Adminlogin /> },
    { path: "/admin/users", element: <UsersList /> },
    { path: "/admin/companies", element: <CompanyList /> },
  ]);

  return routes;
};
const App = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
