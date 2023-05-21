import { Link } from "react-router-dom";
import Post from "../../components/Post/Post";
import styles from "./Manage.module.scss";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";
import PostList from "../../components/PostList/PostList";

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

const Manage = () => {
  const userIsAdmin = true;
  return (
    <section className={styles.manage}>
      <div className="container">
        <button className={`btn btn--gray ${styles.btnPost}`}>
          Написать статью
        </button>
        {userIsAdmin && (
          <h2 className={`heading ${styles.title}`}>Все посты в блоге</h2>
        )}

        {!userIsAdmin && (
          <h2 className={`heading ${styles.title}`}>Мои посты</h2>
        )}
        <div className={styles.postList}>
          {arrPosts.map((post) => (
            <Link key={post.id} to={`/post/${post.id}`}>
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
