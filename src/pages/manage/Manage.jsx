import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import styles from "./Manage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchAllPosts, fetchUserPosts } from "../../redux/slices/postSlice";
import { Navigate } from "react-router-dom";

const Manage = () => {
  const [isRowPosts, setIsRowPosts] = useState(false);
  const dispatch = useDispatch();
  const { items, loading, userPosts } = useSelector(
    (state) => state.posts.posts
  );
  const { isAuth, isAdmin, user, loading: userLoading } = useAuth();

  const handleChangeRow = () => {
    setIsRowPosts((prev) => !prev);
  };

  console.log(userPosts);

  useEffect(() => {
    if (userLoading === "loaded") {
      if (isAdmin) {
        dispatch(fetchAllPosts());
      } else {
        dispatch(fetchUserPosts(user._id));
      }
    }
  }, [userLoading]);

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className={styles.manage}>
      <div className="container">
        <Link to={"/create-post"} className={`btn btn--gray ${styles.btnPost}`}>
          Написать статью
        </Link>
        <button
          onClick={handleChangeRow}
          className={"btn" + " " + styles.changePosBtn}
        >
          {!isRowPosts
            ? "Отобразить в одну колонку"
            : "Отобразить в две колонки"}
        </button>
        {isAdmin && (
          <>
            <h2 className={`heading ${styles.title}`}>Все посты в блоге</h2>
            <div
              className={
                isRowPosts
                  ? `${styles.postList} ${styles.postListColumn}`
                  : styles.postList
              }
            >
              {items.map((post) => (
                <Post key={post._id} {...post} />
              ))}
            </div>
          </>
        )}

        {!isAdmin && <h2 className={`heading ${styles.title}`}>Мои посты</h2>}
        <div
          className={
            isRowPosts
              ? `${styles.postList} ${styles.postListColumn}`
              : styles.postList
          }
        >
          {userPosts &&
            userPosts.map((post) => <Post key={post._id} {...post} />)}
        </div>
      </div>
    </section>
  );
};

export default Manage;
