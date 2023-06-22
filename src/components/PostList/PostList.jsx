import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Post from "../Post/Post";
import styles from "./PostList.module.scss";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPosts,
  fetchAllTags,
  loadMorePosts,
} from "../../redux/slices/postSlice";
import { Skeleton } from "@mui/material";

const PostList = () => {
  const [isRowPosts, setIsRowPosts] = useState(false);
  const dispatch = useDispatch();
  const { items, loading, errors, countPosts, moreLoading } = useSelector(
    (state) => state.posts.posts
  );
  const { value: sortValue } = useSelector((state) => state.sort);
  let limitPostsRef = useRef(4);
  let skipPostsRef = useRef(4);
  const loadMoreBtnRef = useRef();
  let isFirst = useRef(true);

  useEffect(() => {
    dispatch(fetchAllPosts({ sort: sortValue, limit: 4 }));
  }, [sortValue]);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, []);
  useEffect(() => {
    if (items.length === countPosts) {
      limitPostsRef.current = 4;
      skipPostsRef.current = 4;
      isFirst.current = true;
    }
  }, [items]);

  const handleChange = () => {
    setIsRowPosts((prev) => !prev);
  };

  const handleChangeLimit = () => {
    if ((countPosts % items.length) + skipPostsRef.current === 0) {
      return;
    } else {
      if (!isFirst.current) {
        skipPostsRef.current += 4;
      }
      isFirst.current = false;
      dispatch(
        loadMorePosts({
          sort: sortValue,
          skip: skipPostsRef.current,
          limit: limitPostsRef.current,
        })
      );
    }
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
            {loading === "loading" &&
              [...Array(5)].map((_, index) => {
                return (
                  <div key={index}>
                    <Skeleton
                      variant="rectangular"
                      width={500}
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
            {!items.length && loading === "loaded" && <h1>No posts yet :(</h1>}
            {loading === "rejected" && <h1>{errors.message}</h1>}
            {loading === "loaded" &&
              items.map((item) => <Post key={item._id} {...item} />)}
          </div>
          {moreLoading === "loading" && <h1>loading more posts</h1>}
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
