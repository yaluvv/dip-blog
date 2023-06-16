import { useParams } from "react-router-dom";
import styles from "./FullPost.module.scss";
import { useEffect, useState } from "react";
import { postService } from "../../services/post.service";
import ReactMarkdown from "react-markdown";

const FullPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});
  console.log(postData);
  const isImg = Object.values(postData).length
    ? postData.imageUrl.length
    : null;

  useEffect(() => {
    const getPostById = async () => {
      const data = await postService.getPostId(id);
      setPostData(data);
      console.log(data);
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
              src={`http://localhost:4444${postData.imageUrl}`}
              alt="image blog"
            />
          ) : (
            <div className={styles.fullPostItemNotImg}></div>
          )}

          <span className={styles.fullPostItemTitle}>{postData.title}</span>
          <ReactMarkdown children={postData.text} />
          <div className={styles.fullPostItemAuthor}>
            <span>by</span>
            <p>{postData.user.fullName}</p>
            <span>in</span>
            <p>{postData.tags.join("")}</p>
            <span>{postData.viewsCount}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullPost;
