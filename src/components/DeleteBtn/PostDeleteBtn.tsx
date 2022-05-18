import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useRemovePost } from "../../hooks";
import { ScreenLoader } from "../Loader/ScreenLoader";
import styles from "./DeleteBtn.module.css";

export type PostDeleteBtnProps = {
  currentUserId: string;
  postId: string;
};
export function PostDeleteBtn({
  currentUserId,
  postId,
}: PostDeleteBtnProps): JSX.Element {
  const [showRemove, setShowRemove] = useState(false);
  const { mutateRemovePost, loading } = useRemovePost(postId, currentUserId);
  return (
    <>
      {loading && <ScreenLoader />}
      <div className={styles.deleteBtnContainer}>
        <button
          className={styles.threeDota}
          onClick={() => setShowRemove(true)}
        >
          <BsThreeDots />
        </button>
        {showRemove && (
          <div className={styles.deleteModal}>
            <div
              className={styles.backdrop}
              onClick={() => setShowRemove(false)}
            ></div>
            <button
              className={styles.deleteBtn}
              onClick={() => mutateRemovePost()}
            >
              <span>
                <MdDelete />
              </span>
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
}
