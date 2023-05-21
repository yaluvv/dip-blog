import { useState } from "react";
import styles from "./Profile.module.scss";
import ProfileEditForm from "./ProfileEditForm";

const userInfo = { email: "test@mail.ru", createdAt: "21.05.23", posts: 10 };

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <section className={styles.profile}>
      <div className="container">
        <div className={styles.profileHeader}></div>
        <div className={styles.profileInfo}>
          <h2 className={`heading ${styles.title}`}>Your profile info</h2>
          <div className={styles.profileData}>
            <span>{userInfo.email}</span>
            <span>Created at: {userInfo.createdAt}</span>
            <span>Count posts: {userInfo.posts}</span>
          </div>

          {!isEdit ? (
            <button
              onClick={() => setIsEdit((prev) => !prev)}
              className={`btn ${styles.btnChange}`}
            >
              Change profile data
            </button>
          ) : (
            <button
              onClick={() => setIsEdit((prev) => !prev)}
              className={`btn ${styles.btnChange}`}
            >
              Cancel edit form
            </button>
          )}

          {isEdit && <ProfileEditForm />}
        </div>
      </div>
    </section>
  );
};

export default Profile;
