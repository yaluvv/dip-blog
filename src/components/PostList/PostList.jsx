import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Post from "../Post/Post";
import styles from "./PostList.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts, fetchAllTags } from "../../redux/slices/postSlice";

const PostList = () => {
  const [isRowPosts, setIsRowPosts] = useState(false);
  const dispatch = useDispatch();
  const { items, loading, errors, countPosts } = useSelector(
    (state) => state.posts.posts
  );
  const { value: sortValue } = useSelector((state) => state.sort);
  let limitPostsRef = useRef(4);
  const loadMoreBtnRef = useRef();

  useEffect(() => {
    dispatch(fetchAllPosts({ sort: sortValue }));
  }, [sortValue]);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, []);

  const handleChange = () => {
    setIsRowPosts((prev) => !prev);
  };

  const handleChangeLimit = () => {
    limitPostsRef.current += 2;
    dispatch(fetchAllPosts({ sort: sortValue, limit: limitPostsRef.current }));
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
            {loading === "loaded" &&
              items.map((item) => <Post key={item._id} {...item} />)}
          </div>

          {items.length !== countPosts && (
            <LoadMoreButton
              ref={loadMoreBtnRef}
              onAddPosts={handleChangeLimit}
              className={styles.moreBtn}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default PostList;
