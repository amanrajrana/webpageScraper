import styles from "./styles.module.css";

function LoadingSpinner() {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className={styles.loader}></div>
      <p>Loading...</p>
    </div>
  );
}

export default LoadingSpinner;
