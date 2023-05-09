import { Link } from "react-router-dom";
import styles from "./Post.module.scss";

const Post = () => {
  return (
    <Link to={"/"}>
      <div className={styles.post}>
        <div className={styles.postImg}>
          <img src="rene.jpg" alt="" />
        </div>

        <div className={styles.postContent}>
          <div className={styles.postInfo}>
            <span>by</span>
            <p>TOMAS LAURINAVICIUS</p>
            <span>in</span>
            <p>RESOURCE </p>
          </div>
          <h3>How to Change Your WordPress Domain (Keeping SEO Benefits)</h3>
        </div>
      </div>
    </Link>
  );
};

export default Post;
