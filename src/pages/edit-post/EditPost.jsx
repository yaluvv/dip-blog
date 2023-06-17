import PostForm from "../../components/common/post-form/PostForm";
import styles from "./EditPost.module.scss";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { postService } from "../../services/post.service";

const EditPost = () => {
  const [img, setImg] = useState(null);
  const [errors, setErrors] = useState([]);
  const { isAuth } = useAuth();
  const [value, setValue] = useState({
    title: "",
    tags: "",
    text: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const handleChangeFields = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeText = useCallback((value) => {
    setValue((prev) => ({ ...prev, ["text"]: value }));
  }, []);

  const handleCreatePost = async () => {
    try {
      const postData = { ...value, imageUrl: img ? img : "" };
      console.log(postData);
      const data = await postService.updatePostId(id, postData);

      navigate(`/post/${id}`);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
      err.response.data.map((item) => toast.warn(item.msg));
    }
  };

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }
  console.log("edit from ing", img);
  useEffect(() => {
    const getDataPost = async () => {
      const data = await postService.getPostId(id);
      console.log(data);
      const { title, tags, text, imageUrl } = data;
      console.log(imageUrl);
      setValue({ title, tags, text });
      setImg(imageUrl);
    };
    getDataPost();
  }, []);
  return (
    <section className={styles.editPost}>
      <PostForm
        onSubmit={handleCreatePost}
        onChangeFields={handleChangeFields}
        onChangeText={handleChangeText}
        value={value}
        img={img ? img : ""}
        setImg={setImg}
      />
    </section>
  );
};

export default EditPost;
