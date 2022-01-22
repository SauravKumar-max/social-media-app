import { Sidebar } from "../Sidebar/Sidebar";
import { Suggestion } from "../Suggestion/Suggestion";
import { News } from "../News/News";
import styles from "./Layout.module.css";

export function Layout({ children }: { children: JSX.Element }) {
  return (
    <div className={styles.gridContainer}>
      <Sidebar />
      {children}
      <div className={styles.thirdPanel}>
        <News />
        <Suggestion />
      </div>
    </div>
  );
}
