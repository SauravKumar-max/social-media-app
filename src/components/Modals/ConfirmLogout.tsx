import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { toggleLogoutModal } from "../../features/currentUser/userSlice";
import styles from "./Modal.module.css";

export function ConfirmLogout(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.modalContainer}>
      <div
        className={styles.backdrop}
        onClick={() => dispatch(toggleLogoutModal(false))}
      ></div>
      <div className={styles.confirmBox}>
        <p>Are You Sure You Want To Logout</p>
        <div className={styles.confirmButtons}>
          <button
            className={styles.cancelBtn}
            onClick={() => dispatch(toggleLogoutModal(false))}
          >
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={() => {
              dispatch(logout());
              dispatch(toggleLogoutModal(false));
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
