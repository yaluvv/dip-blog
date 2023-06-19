import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import styles from "./Manage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchAllPosts, fetchUserPosts } from "../../redux/slices/postSlice";
import { Navigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const Manage = () => {
  const [isRowPosts, setIsRowPosts] = useState(true);
  const dispatch = useDispatch();
  const { items, loading, userPosts, countPosts } = useSelector(
    (state) => state.posts.posts
  );
  const { isAuth, isAdmin, user, loading: userLoading } = useAuth();

  const handleChangeRow = () => {
    setIsRowPosts((prev) => !prev);
  };

  useEffect(() => {
    if (userLoading === "loaded") {
      if (isAdmin) {
        dispatch(fetchAllPosts({ limit: countPosts }));
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

        {(loading === "loading" || userLoading === "loading") && (
          <div
            className={
              isRowPosts
                ? `${styles.postList} ${styles.postListColumn}`
                : styles.postList
            }
          >
            {[...Array(5)].map((_, index) => {
              return (
                <div className={styles.skeletonItem} key={index}>
                  <Skeleton
                    variant="rectangular"
                    width={"100%"}
                    height={300}
                    sx={{ marginBottom: 1, borderRadius: "10px" }}
                  />
                  <Skeleton
                    width={200}
                    height={42}
                    sx={{ marginBottom: "4px" }}
                  />
                  <Skeleton width={200} height={60} />
                </div>
              );
            })}
          </div>
        )}

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
          {isAdmin && !items?.length && <h1>No posts yet</h1>}
          {!isAdmin && !userPosts?.length && <h1>No posts yet</h1>}
          {userPosts &&
            userPosts.map((post) => <Post key={post._id} {...post} />)}
        </div>
      </div>
    </section>
  );
};

export default Manage;
