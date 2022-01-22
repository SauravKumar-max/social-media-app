import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaUser } from "react-icons/fa";
import { BsBookmarkFill, BsSearch } from "react-icons/bs";
import { MdLogout, MdLogin } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import styles from "./BottomNavigation.module.css";
import { toggleLogoutModal } from "../../features/currentUser/userSlice";

export function BottomNavigation(): JSX.Element {
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.bottomNavigationBar}>
      <ul>
        <li>
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
        <li>
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

        <li>
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

        <li>
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

        {isAuthenticated ? (
          <li className={styles.logoutItem}>
            <button onClick={() => dispatch(toggleLogoutModal(true))}>
              <span className={styles.linkIcon}>
                <MdLogout />
              </span>
            </button>
            <span className={styles.linkName}>Logout</span>
          </li>
        ) : (
          <li>
            <NavLink
              to="/login"
              style={({ isActive }) => ({ color: isActive ? "#1d9bf0" : "" })}
            >
              <span className={styles.linkIcon}>
                <MdLogin />
              </span>
              <span className={styles.linkName}>Login</span>
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
