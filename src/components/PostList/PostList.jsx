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
  const { value: sortValue } = useSelector((state) => state.sort);

  useEffect(() => {
    dispatch(fetchAllPosts({ sort: sortValue }));
  }, [sortValue]);

  useEffect(() => {
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
              items.map((item) => <Post key={item._id} {...item} />)
            )}
          </div>
          <LoadMoreButton className={styles.moreBtn} />
        </div>
      </div>
    </section>
  );
};

export default PostList;
