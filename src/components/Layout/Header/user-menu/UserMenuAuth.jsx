import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const userLinks = [
  { title: "My posts", link: "/manage" },
  { title: "My profile", link: "/manage/profile" },
];

const UserMenuAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Вы действительно хотите выйти из аккаунта?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      navigate("/");
    }
  };
  return (
    <>
      {userLinks.map((item) => (
        <Link key={item.link} to={item.link}>
          {item.title}
        </Link>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default UserMenuAuth;
