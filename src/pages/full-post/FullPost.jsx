import { useParams } from "react-router-dom";
import styles from "./FullPost.module.scss";
import { useEffect, useState } from "react";
import { postService } from "../../services/post.service";
import ReactMarkdown from "react-markdown";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useAuth } from "../../hooks/useAuth";
import ActionButtons from "../../components/Post/ActionButtons";

const FullPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});

  const { user, isAdmin } = useAuth();

  const isImg = postData.imageUrl;

  useEffect(() => {
    const getPostById = async () => {
      const data = await postService.getPostId(id);
      setPostData(data);
    };
    getPostById();
  }, []);

  if (!postData.title) {
    return <h1>Loading</h1>;
  }

  return (
    <section className={styles.fullPost}>
      <div className="container">
        <div className={styles.fullPostItem}>
          {isImg ? (
            <img
              src={`${import.meta.env.VITE_API_URL}${postData.imageUrl}`}
              alt="image blog"
            />
          ) : (
            <div className={styles.fullPostItemNotImg}></div>
          )}
          {isAdmin && <ActionButtons id={id} />}

          {postData.user._id === user?._id && <ActionButtons id={id} />}

          <span className={styles.fullPostItemTitle}>{postData.title}</span>
          <ReactMarkdown children={postData.text} />
          <div className={styles.fullPostItemAuthor}>
            <span>by</span>
            <p>{postData.user.fullName}</p>
            <span>in</span>
            <p>{postData.tags.join(", ")}</p>
            <div className={styles.fullPostViews}>
              <VisibilityIcon />
              <span>{postData.viewsCount}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullPost;
