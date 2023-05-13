import { Link } from "react-router-dom";
import styles from "./Post.module.scss";

const Post = ({ title, description, author, category, id }) => {
  return (
    <Link to={`post/${id}`}>
      <div className={styles.post}>
        <div className={styles.postImg}>
          <img src="rene.jpg" alt="" />
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
    </Link>
  );
};

export default Post;
