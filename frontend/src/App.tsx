//frontend\src\App.tsx
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/intro/Home";
import Profile from "./Pages/user/Profile";
import UserFeed from "./Pages/user/UserFeed";
import NotFound from "./Pages/intro/NotFound";
import { Toaster } from "react-hot-toast";
import Auth from "./Pages/auth-pages/Auth";
import Adminlogin from "./Pages/admin/Adminlogin";
import UsersList from "./Pages/admin/UsersList";
import CompanyList from "./Pages/admin/CompanyList";
import PrivatePages from "./Components/PrivatePages";
import CategoryAdd from "./Pages/admin/CategoryAdd";
import Dashboard from "./Pages/admin/Dashboard";
import PostTable from "./Pages/admin/PostTable";

function App() {
  return (
    <>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Auth isLogin={true} />} />
        <Route path="/register" element={<Auth isLogin={false} />} />

        <Route element={<PrivatePages isUser={true} />}>
          <Route path="/feed" element={<UserFeed />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/account/:id" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<Adminlogin />} />
        <Route element={<PrivatePages isUser={false} />}>
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/companies" element={<CompanyList />} />
          <Route path="/admin/categories" element={<CategoryAdd />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/posts" element={<PostTable />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
