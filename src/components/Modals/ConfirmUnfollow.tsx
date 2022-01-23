import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleUnfollwModal } from "../../features/currentUser/userSlice";
import { unFollow } from "../../features/profiles/profileSlice";

import { useFollowing } from "../../hooks";
import styles from "./Modal.module.css";

export function ConfirmUnfollow(): JSX.Element {
  const { currentUserId, unfollowModal } = useAppSelector(
    (state) => state.currentUser
  );
  const { profileId } = unfollowModal;
  const dispatch = useAppDispatch();
  const { mutateUnFollow } = useFollowing(profileId);

  function unFollowClickHandler() {
    mutateUnFollow();
    dispatch(unFollow({ currentUserId, followingId: profileId }));
    dispatch(toggleUnfollwModal({ show: false, profileId: null }));
  }

  return (
    <div className={styles.modalContainer}>
      <div
        className={styles.backdrop}
        onClick={() =>
          dispatch(toggleUnfollwModal({ show: false, profileId: null }))
        }
      ></div>
      <div className={styles.confirmBox}>
        <p>Are You Sure You Want To Unfollow</p>
        <div className={styles.confirmButtons}>
          <button
            className={styles.cancelBtn}
            onClick={() =>
              dispatch(toggleUnfollwModal({ show: false, profileId: null }))
            }
          >
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={() => unFollowClickHandler()}
          >
            Unfollow
          </button>
        </div>
      </div>
    </div>
  );
}
