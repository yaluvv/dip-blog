import styles from "./Post.module.scss";

const Post = ({ title, description, author, category, id }) => {
  return (
    <div className={styles.post}>
      <div className={styles.postImg}>
        <img src="./rene.jpg" alt="" />
      </div>

      <div className={styles.postContent}>
        <div className={styles.postInfo}>
          <span>by</span>
          <p>{author}</p>
          <span>in</span>
          <p>{category}</p>
        </div>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Post;
