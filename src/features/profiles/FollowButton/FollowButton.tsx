import { useAppDispatch } from "../../../app/hooks";
import { useFollowing } from "../../../hooks";
import { toggleUnfollwModal } from "../../currentUser/userSlice";
import { FollowProp } from "../../features.types";
import { follow } from "../profileSlice";
import styles from "./FollowButton.module.css";

export function FollowButton({
  currentUserId,
  profileId,
  followers,
}: FollowProp): JSX.Element {
  const dispatch = useAppDispatch();
  const { mutateFollow } = useFollowing(profileId);

  function followClickHandler() {
    mutateFollow();
    dispatch(follow({ currentUserId, followingId: profileId }));
  }

  return (
    <div className={styles.followBtn}>
      {followers?.includes(currentUserId) ? (
        <button
          className={styles.following}
          onClick={() =>
            dispatch(toggleUnfollwModal({ show: true, profileId }))
          }
        >
          <span className={styles.unfollowText}>Unfollow</span>
          <span className={styles.followingText}>Following</span>
        </button>
      ) : (
        <button className={styles.follow} onClick={followClickHandler}>
          Follow
        </button>
      )}
    </div>
  );
}
