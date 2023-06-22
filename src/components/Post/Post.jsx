import styles from "./Post.module.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ActionButtons from "./ActionButtons";

const Post = ({ title, imageUrl, user, _id, tags, viewsCount }) => {
  const { user: userData, isAdmin } = useAuth();

  return (
    <article className={styles.post}>
      <Link to={`/post/${_id}`}>
        <div className={styles.postImg}>
          {imageUrl ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
              alt="post image"
            />
          ) : (
            <div className={styles.postNotImg}></div>
          )}
        </div>
      </Link>
      {isAdmin && <ActionButtons id={_id} />}
      {user?._id === userData?._id && <ActionButtons id={_id} />}
      <div className={styles.postContent}>
        <div className={styles.postInfo}>
          <span>by</span>
          <p>{user.fullName}</p>
          <span>in</span>
          <p>{tags.join(", ")}</p>
          <div className={styles.postViews}>
            <VisibilityIcon />
            <span>{viewsCount}</span>
          </div>
        </div>
        <h3>{title}</h3>
      </div>
    </article>
  );
};

export default Post;
