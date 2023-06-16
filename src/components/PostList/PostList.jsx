import { Link } from "react-router-dom";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Post from "../Post/Post";
import styles from "./PostList.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, fetchAllTags } from "../../redux/slices/postSlice";

const PostList = () => {
  const [isRowPosts, setIsRowPosts] = useState(false);
  const dispatch = useDispatch();
  const { items, loading, errors } = useSelector((state) => state.posts.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(fetchAllTags());
  }, []);

  const handleChange = () => {
    setIsRowPosts((prev) => !prev);
  };

  return (
    <section className={styles.postList}>
      <div className="container">
        <div className={styles.postsInner}>
          <button onClick={handleChange} className={"btn" + " " + styles.btn}>
            {isRowPosts
              ? "Отобразить в одну колонку"
              : "Отобразить в две колонки"}
          </button>
          <div
            className={
              isRowPosts ? `${styles.posts} ${styles.postsRow}` : styles.posts
            }
          >
            {loading === "rejected" && <h1>{errors.message}</h1>}
            {loading === "loading" ? (
              <h1>LOADING!!!</h1>
            ) : (
              items.map((item) => (
                <Link key={item._id} to={`post/${item._id}`}>
                  <Post {...item} />
                </Link>
              ))
            )}
          </div>
          <LoadMoreButton className={styles.moreBtn} />
        </div>
      </div>
    </section>
  );
};

export default PostList;
