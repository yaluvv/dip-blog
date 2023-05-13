import { useParams } from "react-router-dom";
import styles from "./FullPost.module.scss";

const FullPost = ({ image, title, description, category, author }) => {
  const { id } = useParams();

  return (
    <section className={styles.fullPost}>
      <div className="container">
        <div className={styles.fullPostItem}>
          <img src={image} alt="image blog" />
          <h2>
            {title} {id}
          </h2>
          <p>{description}</p>
          <div className={styles.fullPostItemAuthor}>
            <span>by</span>
            <p>{author}</p>
            <span>in</span>
            <p>{category}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullPost;
