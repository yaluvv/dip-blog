import styles from "./CreatePost.module.scss";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useCallback, useState, useMemo, useRef } from "react";
import { httpService } from "../../services/http.service";
import TextField from "../../components/common/TextField/TextField";
import { Button } from "@mui/material";
import InputField from "../../components/common/auth-form/InputField";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";

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

  const imgRef = useRef();

  const handleUploadImage = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const { data } = await httpService.post("/upload", formData);
      setImg(data);
    } catch (err) {
      console.error(err);
    }
  };
  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: false,
    };
  }, []);

  const handleCreatePost = async () => {
    try {
      const postData = { ...value, imageUrl: img ? img.url : "" };
      const { data } = await httpService.post("/posts", postData);
      navigate(`/post/${data._id}`);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data);
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
          {img && (
            <img
              className={styles.createPostUploadImg}
              src={`http://localhost:4444${img.url}`}
            />
          )}
          <div className={styles.upButtons}>
            <Button
              onClick={() => imgRef.current.click()}
              className={styles.btnSend}
              variant="contained"
            >
              {img ? "Change image" : "Upload image"}
            </Button>
            {img && (
              <Button
                onClick={() => setImg(null)}
                className={styles.btnSend}
                variant="contained"
                color="error"
              >
                Remove image
              </Button>
            )}
          </div>

          <InputField
            onChange={handleUploadImage}
            ref={imgRef}
            type="file"
            hidden
          />
          <TextField
            onChange={handleChangeFields}
            value={value.title}
            name="title"
            placeholder="Enter your title"
          />
          <TextField
            value={value.tags}
            onChange={handleChangeFields}
            name="tags"
            placeholder="Enter your tags: React, js, redux"
          />
          <SimpleMDE
            name="text"
            value={value.text}
            onChange={handleChangeText}
            options={autofocusNoSpellcheckerOptions}
          />
          <div className={styles.buttons}>
            <Button
              onClick={handleCreatePost}
              className={styles.btnSend}
              variant="contained"
            >
              Send post
            </Button>
            <Button
              className={styles.btnCancel}
              variant="outlined"
              color="error"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatePost;
