import { Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main";
import FullPost from "../pages/full-post/FullPost";
import Layout from "./Layout/Layout";
import Auth from "../pages/auth/Auth";
import Manage from "../pages/manage/Manage";
import Profile from "../pages/manage/profile/Profile";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/post/:id"
          element={
            <FullPost
              title={"Lorem ipsum dolor sit amet consectetur"}
              description={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis enim vel qui voluptatibus placeat architecto commodi aliquam pariatur quos porro."
              }
              image={"../../rene.jpg"}
              author={"Alexander Puzikov"}
              category={"Travel"}
            />
          }
        />
        <Route path="/auth" element={<Auth />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/profile" element={<Profile />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Layout>
  );
};

export default App;
