import styles from "./Profile.module.scss";
import { useAuth } from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserPosts } from "../../../redux/slices/postSlice";

const Profile = () => {
  const { user, isAuth } = useAuth();
  const { userPosts } = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const date = user ? new Date(user.createdAt) : "00.00.00";

  useEffect(() => {
    if (user) {
      dispatch(fetchUserPosts(user._id));
    }
  }, [user]);

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <section className={styles.profile}>
      <div className="container">
        <div className={styles.profileHeader}></div>
        <div className={styles.profileInfo}>
          <h2 className={`heading ${styles.title}`}>Your profile info</h2>

          {user && userPosts && (
            <>
              <div className={styles.profileImg}>
                <img
                  src={`http://localhost:4444${user.avatarUrl}`}
                  alt="avatar image"
                />
              </div>
              <div className={styles.profileData}>
                <span>{user.email}</span>
                <span>{user.fullName}</span>
                <span>
                  Created at:{" "}
                  {date.toLocaleDateString("ru-RU", { timeZone: "UTC" })}
                </span>
                <span>Count posts: {userPosts.length}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Profile;
