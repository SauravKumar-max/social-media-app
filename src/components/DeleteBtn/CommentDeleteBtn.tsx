import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { useComments } from "../../hooks";
import { ScreenLoader } from "../Loader/ScreenLoader";
import styles from "./DeleteBtn.module.css";

export type DeleteBtnProps = {
  postUserId: string;
  postId: string;
  commentId: string;
};

export function CommentDeleteBtn({
  postUserId,
  postId,
  commentId,
}: DeleteBtnProps): JSX.Element {
  const [showRemove, setShowRemove] = useState(false);
  const { mutateDeleteComment } = useComments(postUserId, postId);
  const [loader, setLoader] = useState(false);

  function deleteComment() {
    mutateDeleteComment(postUserId, postId, commentId);
    setLoader(true);
  }

  return (
    <>
      {loader && <ScreenLoader />}
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
              onClick={() => deleteComment()}
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
