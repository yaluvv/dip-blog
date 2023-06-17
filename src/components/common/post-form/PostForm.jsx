import styles from "./PostForm.module.scss";
import TextField from "../TextField/TextField";
import { useMemo, useRef } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button } from "@mui/material";
import InputField from "../auth-form/InputField";
import { httpService } from "../../../services/http.service";
import { useNavigate } from "react-router-dom";
const PostForm = ({
  value,
  onSubmit,
  onChangeText,
  img,
  setImg,
  onChangeFields,
}) => {
  const imgRef = useRef();
  const navigate = useNavigate();

  const handleUploadImage = async (event) => {
    try {
      const formData = new FormData();
      formData.append("image", event.target.files[0]);
      const { data } = await httpService.post("/upload", formData);
      setImg(data.url);
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

  return (
    <div className={styles.postForm}>
      <div className={styles.postFormInner}>
        {img && (
          <img
            className={styles.postFormUploadImg}
            src={`http://localhost:4444${img}`}
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
          onChange={onChangeFields}
          value={value.title}
          name="title"
          placeholder="Enter your title"
        />
        <TextField
          value={value.tags}
          onChange={onChangeFields}
          name="tags"
          placeholder="Enter your tags: React, js, redux"
        />
        <SimpleMDE
          name="text"
          value={value.text}
          onChange={onChangeText}
          options={autofocusNoSpellcheckerOptions}
        />
        <div className={styles.buttons}>
          <Button
            onClick={onSubmit}
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
  );
};

export default PostForm;
