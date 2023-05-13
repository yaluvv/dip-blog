import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Post from "../Post/Post";
import styles from "./PostList.module.scss";
import React from "react";

const arrPosts = [
  {
    id: 1,
    title: "Test1",
    description: "Test1 desc",
    author: "Alex Puzikov",
    category: "Test",
  },
  {
    id: 2,
    title: "Test2",
    description: "Test2 desc",
    author: "Alex Puzikov",
    category: "Test",
  },
  {
    id: 3,
    title: "Test3",
    description: "Test3 desc",
    author: "Alex Puzikov",
    category: "Test",
  },
  {
    id: 4,
    title: "Test4",
    description: "Test4 desc",
    author: "Alex Puzikov",
    category: "Test",
  },
  {
    id: 5,
    title: "Test5",
    description: "Test5 desc",
    author: "Alex Puzikov",
    category: "Test",
  },
];

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
            {arrPosts.map((post) => (
              <Post {...post} />
            ))}
          </div>
          <LoadMoreButton />
        </div>
      </div>
    </section>
  );
};

export default PostList;
