import styles from "./LoadMoreButton.module.scss";

const LoadMoreButton = () => {
  return (
    <button type="button" className={`btn ${styles.moreBtn}`}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
