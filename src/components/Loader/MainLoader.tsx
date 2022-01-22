import { FaTwitter } from "react-icons/fa";
import styles from "./Loader.module.css";

export function MainLoader(): JSX.Element {
  return (
    <div className={styles.mainLoader}>
      <div className={styles.loaderIcon}>
        <FaTwitter />
      </div>
    </div>
  );
}
