import styles from "./CreatePost.module.scss";
import { useCallback, useState } from "react";
import { httpService } from "../../services/http.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import PostForm from "../../components/common/post-form/PostForm";

const CreatePost = () => {
  const [img, setImg] = useState(null);
  const { isAuth } = useAuth();
  const [value, setValue] = useState({
    title: "",
    tags: "",
    text: "",
  });

  const navigate = useNavigate();
  const handleChangeFields = (e) => {
    setValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeText = useCallback((value) => {
    setValue((prev) => ({ ...prev, ["text"]: value }));
  }, []);

  const handleCreatePost = async () => {
    try {
      const regExp = /^([0-9a-zа-я][^\s]+)([,][^\s][0-9a-zа-я]+)*$/i;

      if (value.tags.search(regExp) === -1) {
        toast.warn("Укажите список тегов через запятую без пробелов");
      } else {
        const tags = value.tags.split(",");
        const postData = img
          ? { ...value, imageUrl: img, tags }
          : { ...value, tags };
        const { data } = await httpService.post("/posts", postData);
        navigate(`/post/${data._id}`);
      }
    } catch (err) {
      console.error(err);
      err.response.data.map((item) => toast.warn(item.msg));
    }
  };

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className={styles.createPost}>
      <div className="container">
        <div className={styles.createPostInner}>
          <PostForm
            onSubmit={handleCreatePost}
            onChangeFields={handleChangeFields}
            onChangeText={handleChangeText}
            value={value}
            img={img ? img : ""}
            setImg={setImg}
          />
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
