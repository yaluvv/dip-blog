import styles from "./Post.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Post = ({ title, imageUrl, user, _id, tags, viewsCount }) => {
  const { user: userData, isAdmin } = useAuth();

  return (
    <article className={styles.post}>
      <Link to={`/post/${_id}`}>
        <div className={styles.postImg}>
          {imageUrl ? (
            <img src={`http://localhost:4444${imageUrl}`} alt="" />
          ) : (
            <div className={styles.postNotImg}></div>
          )}
        </div>
      </Link>
      {isAdmin && (
        <Link to={`/post/${_id}/edit`} className={styles.editBtn}>
          <EditIcon />
          Edit
        </Link>
      )}
      {user?._id === userData?._id && (
        <Link to={`/post/${_id}/edit`} className={styles.editBtn}>
          <EditIcon />
          Edit
        </Link>
      )}
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
    </article>
  );
};

export default Post;
