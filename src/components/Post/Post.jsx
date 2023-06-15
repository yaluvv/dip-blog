import styles from "./Post.module.scss";

const Post = ({ title, imageUrl, user, tags, viewsCount }) => {
  return (
    <div className={styles.post}>
      <div className={styles.postImg}>
        <img src={imageUrl} alt="" />
      </div>

      <div className={styles.postContent}>
        <div className={styles.postInfo}>
          <span>by</span>
          <p>{user.fullName}</p>
          <span>in</span>
          <p>{tags.join("")}</p>
          <span>{viewsCount}</span>
        </div>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default Post;
