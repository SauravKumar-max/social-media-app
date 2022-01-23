import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useAppDispatch } from "../../../app/hooks";
import { usePostLike } from "../../../hooks";
import { PostLikeBtnProps } from "../../features.types";
import { addPostLike, removePostLike } from "../profileSlice";
import styles from "./PostLikeButton.module.css";

export function PostLikeButton({
  currentUserId,
  postUserId,
  postId,
  likes,
}: PostLikeBtnProps): JSX.Element {
  const dispatch = useAppDispatch();
  const { mutateAddLike, mutateRemoveLike } = usePostLike(postUserId, postId);

  function addLikeHandler() {
    mutateAddLike();
    dispatch(
      addPostLike({
        postUserId: postUserId,
        postId: postId,
        userId: currentUserId,
      })
    );
  }

  function removeLikeHandler() {
    mutateRemoveLike();
    dispatch(
      removePostLike({
        postUserId: postUserId,
        postId: postId,
        userId: currentUserId,
      })
    );
  }

  return (
    <div className={styles.likeBtn}>
      {likes?.likedUserId.includes(currentUserId) ? (
        <button className={styles.liked} onClick={removeLikeHandler}>
          {<FaHeart />} <span> {likes?.count}</span>
        </button>
      ) : (
        <button onClick={addLikeHandler}>
          {<FaRegHeart />} <span> {likes?.count}</span>
        </button>
      )}
    </div>
  );
}
