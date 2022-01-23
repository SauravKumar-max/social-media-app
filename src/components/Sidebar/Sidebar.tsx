import { Link, NavLink } from "react-router-dom";
import { FaTwitter, FaHome, FaUser } from "react-icons/fa";
import { BsBookmarkFill, BsSearch, BsPlusLg } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  togglePostModal,
  toggleLogoutModal,
} from "../../features/currentUser/userSlice";
import styles from "./Sidebar.module.css";

export function Sidebar(): JSX.Element {
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.sidebar}>
      <div>
        <Link to="/">
          <div className={styles.logo}>
            <FaTwitter />
          </div>
        </Link>

        <nav
          className={styles.navigation}
          aria-label="Main Navigation"
          role="navigation"
        >
          <ul className={styles.navLists}>
            <li className={styles.linkItem}>
              <NavLink
                to="/"
                style={({ isActive }) => ({ color: isActive ? "#1d9bf0" : "" })}
              >
                <span className={styles.linkIcon}>
                  <FaHome />
                </span>
                <span className={styles.linkName}>Home</span>
              </NavLink>
            </li>
            <li className={styles.linkItem}>
              <NavLink
                to="/search"
                style={({ isActive }) => ({ color: isActive ? "#1d9bf0" : "" })}
              >
                <span className={styles.linkIcon}>
                  <BsSearch />
                </span>
                <span className={styles.linkName}>Search</span>
              </NavLink>
            </li>
            <li className={styles.linkItem}>
              <NavLink
                to="/bookmark"
                style={({ isActive }) => ({ color: isActive ? "#1d9bf0" : "" })}
              >
                <span className={styles.linkIcon}>
                  <BsBookmarkFill />
                </span>
                <span className={styles.linkName}>Bookmarks</span>
              </NavLink>
            </li>
            <li className={styles.linkItem}>
              <NavLink
                to={`/profile/${currentUserId}`}
                style={({ isActive }) => ({ color: isActive ? "#1d9bf0" : "" })}
              >
                <span className={styles.linkIcon}>
                  <FaUser />
                </span>
                <span className={styles.linkName}>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.tweetBtn}>
          <button onClick={() => dispatch(togglePostModal(true))}>
            {" "}
            Add Post
          </button>
        </div>
        <div className={styles.tweetBtnMobile}>
          <button onClick={() => dispatch(togglePostModal(true))}>
            <BsPlusLg />
          </button>
        </div>
      </div>

      <div className={styles.logoutBtn}>
        <button onClick={() => dispatch(toggleLogoutModal(true))}>
          Logout
        </button>
      </div>
      <div className={styles.logoutBtnMobile}>
        <button onClick={() => dispatch(toggleLogoutModal(true))}>
          <MdLogout />
        </button>
      </div>
    </div>
  );
}
