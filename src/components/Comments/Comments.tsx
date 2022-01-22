import { useEffect, useRef, useState } from "react";
import { Loader, NoResultMessage } from "../index";
import { useComments } from "../../hooks";
import styles from "./Comments.module.css";
import { useAppSelector } from "../../app/hooks";

export function Comments({
  postUserId,
  postId,
  postUsername,
}: {
  postUserId: string;
  postId: string;
  postUsername: string;
}) {
  const [commentText, setComment] = useState("");
  const [dataChanged, setChange] = useState(false);
  const commentRef = useRef<HTMLInputElement>(null);
  const { currentUserImage } = useAppSelector((state) => state.currentUser);
  const { commentsLoading, commentsData, mutateComments } = useComments(
    postUserId,
    postId,
    commentText
  );

  useEffect(() => {
    commentRef?.current?.focus();
    setComment("");
    if (dataChanged) {
      setChange(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentRef, commentsData]);

  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentInput}>
        <img src={currentUserImage} alt="" />
        <input
          ref={commentRef}
          type="text"
          placeholder="Add a Comment"
          value={commentText}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          disabled={commentText ? false : true}
          className={
            commentText ? styles.commentBtn : styles.disabledCommentBtn
          }
          onClick={() => {
            setChange(true);
            mutateComments();
          }}
        >
          {dataChanged ? "Commenting..." : "Comment"}
        </button>
      </div>
      <div className={styles.commentList}>
        {commentsLoading && <Loader />}
        {commentsData?.length === 0 && (
          <NoResultMessage message="Comments is Empty!" />
        )}
        {commentsData?.map(({ _id, commentUser, text }) => {
          return (
            <div className={styles.commentBox} key={_id}>
              <img src={commentUser.picture.profile} alt="" />
              <div className={styles.comment}>
                <div className={styles.commentUser}>
                  <p className={styles.name}>{commentUser.name}</p>
                  <p className={styles.username}>@{commentUser.username}</p>
                </div>
                <p className={styles.reply}>
                  Replying to <span>@{postUsername}</span>
                </p>
                <p className={styles.commentText}>{text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
