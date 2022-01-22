import { BsEmojiNeutralFill } from "react-icons/bs";
import styles from "./NoResultMessage.module.css";

export function NoResultMessage({ message }: { message: string }): JSX.Element {
  return (
    <div className={styles.noResult}>
      <span>
        <BsEmojiNeutralFill />
      </span>
      <p className={styles.emptyPost}>{message}</p>
    </div>
  );
}
