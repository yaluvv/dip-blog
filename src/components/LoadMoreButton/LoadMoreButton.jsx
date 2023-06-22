import styles from "./LoadMoreButton.module.scss";
import { forwardRef } from "react";

const LoadMoreButton = forwardRef(({ onAddPosts, className }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onAddPosts}
      type="button"
      className={`btn ${styles.moreBtn} ${className}`}
    >
      Load More
    </button>
  );
});

LoadMoreButton.displayName = "LoadMoreButton";

export default LoadMoreButton;
