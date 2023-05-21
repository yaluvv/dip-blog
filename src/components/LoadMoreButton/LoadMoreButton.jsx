import styles from "./LoadMoreButton.module.scss";

const LoadMoreButton = ({ className }) => {
  return (
    <button type="button" className={`btn ${styles.moreBtn} ${className}`}>
      Load More
    </button>
  );
};

export default LoadMoreButton;
