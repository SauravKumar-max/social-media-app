import { useEffect } from "react";
import { BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useBookmark } from "../../../hooks";
import { addBookmark, removeBookmark } from "../profileSlice";
import styles from "./PostBookmark.module.css";

export function PostBookmarkBtn({
  currentUserId,
  postUserId,
  postId,
}: {
  currentUserId: string;
  postUserId: string;
  postId: string;
}): JSX.Element {
  const dispatch = useAppDispatch();
  const { profiles } = useAppSelector((state) => state.profiles);
  const bookmark = checkBookmark();
  const { mutateAddBookmark, mutateRemoveBookmark, loading, data } =
    useBookmark(postUserId, postId);

  function checkBookmark() {
    const postUser = profiles?.find((profile) => profile._id === currentUserId);
    const containBookmark = postUser?.bookmarks.find(
      (mark) => mark?.postId === postId
    );
    return containBookmark;
  }

  useEffect(() => {
    if (data) {
      dispatch(
        addBookmark({ userId: currentUserId, newBookmark: data.addBookmark })
      );
    }
  }, [data, currentUserId, dispatch]);

  return (
    <div className={styles.bookmark}>
      {bookmark ? (
        <button
          onClick={() => {
            mutateRemoveBookmark(bookmark._id);
            dispatch(
              removeBookmark({
                userId: currentUserId,
                bookmarkId: bookmark._id,
              })
            );
          }}
        >
          {<BsFillBookmarkFill />}
        </button>
      ) : (
        <button
          disabled={loading}
          className={loading ? styles.disableBtn : styles.bookmarBtn}
          onClick={() => mutateAddBookmark()}
        >
          {<BsBookmark />}
        </button>
      )}
    </div>
  );
}
