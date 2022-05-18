import { FaRegComment, FaShareAlt } from "react-icons/fa";
import { PostType } from "../../pages/pages.types";
import { useNavigate } from "react-router-dom";
import { PostLikeButton, PostBookmarkBtn } from "../../features/index";
import { PostDeleteBtn } from "..";
import { useAppSelector } from "../../app/hooks";
import { useEffect, useRef, useState } from "react";
import styles from "./PostBox.module.css";

export type Post = {
  post: PostType;
  postUserId: string;
  name: string;
  username: string;
  profilePicture: string;
};

export function PostBox({
  post,
  name,
  username,
  postUserId,
  profilePicture,
}: Post): JSX.Element {
  const [copy, setCopy] = useState(false);
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const { _id: postId, image, text, likes } = post || {};
  const navigate = useNavigate();
  const copyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let timer: any;
    if (copy) {
      timer = setTimeout(() => setCopy(false), 1100);
    }
    return () => clearTimeout(timer);
  }, [copy]);

  function copyToClipboard() {
    navigator.clipboard.writeText(`${window.location.hostname}/post/${postId}`);
    setCopy(true);
  }

  return (
    <div className={styles.postContainer}>
      <div className={styles.userImage}>
        <img src={profilePicture} alt="profile" />
      </div>
      <div className={styles.postInfo}>
        <div className={styles.postUser}>
          <div>
            <p
              className={styles.name}
              onClick={() => navigate(`/profile/${postUserId}`)}
            >
              {name}
            </p>
            <p className={styles.username}>@{username}</p>
          </div>
          {postUserId === currentUserId && (
            <span>
              <PostDeleteBtn currentUserId={currentUserId} postId={postId} />
            </span>
          )}
        </div>
        <div
          className={styles.userPost}
          onClick={() => navigate(`/post/${postId}`)}
        >
          <p className={styles.postText}>{text}</p>
          {image && (
            <div className={styles.postImage}>
              <img src={image} alt="" />
            </div>
          )}
        </div>
        <div className={styles.postActions}>
          <PostLikeButton
            currentUserId={currentUserId}
            postUserId={postUserId}
            postId={postId}
            likes={likes}
          />
          <button onClick={() => navigate(`/post/${postId}`)}>
            {<FaRegComment />}
          </button>
          <PostBookmarkBtn
            currentUserId={currentUserId}
            postUserId={postUserId}
            postId={postId}
          />
          <button
            ref={copyRef}
            className={copy ? styles.copied : styles.shareBtn}
            onClick={copyToClipboard}
          >
            {<FaShareAlt />}
          </button>
        </div>
      </div>
    </div>
  );
}
