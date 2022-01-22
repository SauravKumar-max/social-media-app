import { Loader } from "./Loader";
import styles from "./Loader.module.css";

export function ScreenLoader(): JSX.Element {
  return (
    <div className={styles.screenLoader}>
      <Loader />
    </div>
  );
}
