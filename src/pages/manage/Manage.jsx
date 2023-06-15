import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import styles from "./Manage.module.scss";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { fetchAllPosts, fetchUserPosts } from "../../redux/slices/postSlice";
import { Navigate } from "react-router-dom";

const Manage = () => {
  const dispatch = useDispatch();
  const { items, loading, userPosts } = useSelector(
    (state) => state.posts.posts
  );
  const { isAuth, user, loading: userLoading } = useAuth();
  const isAdmin = user?.role === "Admin";

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
        <button className={`btn btn--gray ${styles.btnPost}`}>
          Написать статью
        </button>
        {isAdmin && (
          <>
            <h2 className={`heading ${styles.title}`}>Все посты в блоге</h2>
            {items.map((post) => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <Post {...post} />
              </Link>
            ))}
          </>
        )}

        {!isAdmin && <h2 className={`heading ${styles.title}`}>Мои посты</h2>}
        <div className={styles.postList}>
          {loading === "loaded" &&
            userPosts.map((post) => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <Post {...post} />
              </Link>
            ))}
        </div>
        <LoadMoreButton className={styles.moreBtn} />
      </div>
    </section>
  );
};

export default Manage;
