import styles from "./ActionButtons.module.scss";
import EditIcon from "@mui/icons-material/Edit";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/slices/postSlice";
import { toast } from "react-toastify";

const ActionButtons = ({ id }) => {
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    try {
      if (window.confirm("Вы точно хотите удалить данный пост?")) {
        const data = await dispatch(deletePost(id));
        toast.success("Пост был успешно удален!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.actionButtons}>
      <Link to={`/post/${id}/edit`} className={styles.editBtn}>
        <EditIcon />
        Edit
      </Link>
      <button onClick={handleDeletePost} className={styles.editBtn}>
        <HighlightOffIcon />
        Remove
      </button>
    </div>
  );
};

export default ActionButtons;
