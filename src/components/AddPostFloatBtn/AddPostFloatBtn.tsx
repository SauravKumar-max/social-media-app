import { BsPlusLg } from "react-icons/bs";
import { useAppDispatch } from "../../app/hooks";
import { togglePostModal } from "../../features/currentUser/userSlice";

import styles from "./AddPostFloatBtn.module.css";

export function AddPostFloatBtn(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.floatBtn}>
      <button onClick={() => dispatch(togglePostModal(true))}>
        <BsPlusLg />
      </button>
    </div>
  );
}
