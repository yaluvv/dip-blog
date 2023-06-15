import { useParams } from "react-router-dom";
import styles from "./FullPost.module.scss";
import { useEffect, useState } from "react";
import { postService } from "../../services/post.service";

const FullPost = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({});

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
          <img src={postData.imageUrl} alt="image blog" />
          <h2>{postData.title}</h2>
          <p>{postData.text}</p>
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
