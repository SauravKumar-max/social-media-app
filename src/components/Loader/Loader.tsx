import { RiLoader4Line } from "react-icons/ri";
import styles from "./Loader.module.css";

export function Loader(): JSX.Element {
  return (
    <div className={styles.loader}>
      <RiLoader4Line />
    </div>
  );
}
