import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import FullPost from "../pages/full-post/FullPost";
import Layout from "./Layout/Layout";
import Auth from "../pages/auth/Auth";
import Manage from "../pages/manage/Manage";
import Profile from "../pages/manage/profile/Profile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authMe } from "../redux/slices/authSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authMe());
  }, []);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<FullPost />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/profile" element={<Profile />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
