import { Header } from "../../features/theme/Header";
import { FaImage } from "react-icons/fa";
import styles from "./Home.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { togglePostModal } from "../../features/currentUser/userSlice";
import { Feed } from "../../features";

export function Home(): JSX.Element {
  const { currentUserImage } = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.home}>
      <Header page="Home" />
      <div className={styles.tweetField}>
        <div className={styles.userAvatar}>
          <img src={currentUserImage} alt="" />
        </div>
        <div className={styles.tweetActions}>
          <span onClick={() => dispatch(togglePostModal(true))}>
            What's happening?
          </span>
          <div>
            <button
              onClick={() => dispatch(togglePostModal(true))}
              className={styles.image}
            >
              {<FaImage />}
            </button>
            <button>Post</button>
          </div>
        </div>
      </div>
      <Feed />
    </div>
  );
}
