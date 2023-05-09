import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Post from "../Post/Post";
import styles from "./PostList.module.scss";
import React from "react";

const PostList = () => {
  const [isRowPosts, setIsRowPosts] = React.useState(false);

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
            {Array(5)
              .fill({})
              .map((item) => (
                <Post />
              ))}
          </div>
          <LoadMoreButton />
        </div>
      </div>
    </section>
  );
};

export default PostList;
