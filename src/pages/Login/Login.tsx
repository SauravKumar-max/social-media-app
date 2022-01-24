import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { loginUserWithCredentials } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, useLocation } from "react-router-dom";
import { ScreenLoader } from "../../components";

export function Login(): JSX.Element {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const { status, token, errorMessage, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  function loginHandler() {
    dispatch(loginUserWithCredentials({ email, password }));
  }

  useEffect(() => {
    if (isAuthenticated && token)
      navigate(state?.from ? state?.from.pathname : "/");
  }, [isAuthenticated, navigate, token, state]);

  return (
    <div className={styles.loginContainer}>
      {status === "loading" && <ScreenLoader />}
      <div className={styles.homeLinkContainer}>
        <Link className={styles.homeLink} to="/">
          {<FaTwitter />}
        </Link>
      </div>
      <div className={styles.loginField}>
        <h2> Login </h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className={styles.errorMessage}>{errorMessage && errorMessage}</p>
        <button
          onClick={loginHandler}
          disabled={email && password ? false : true}
          className={email && password ? styles.loginBtn : styles.disableBtn}
        >
          {status === "loading" ? "Logging..." : "Login"}
        </button>
        <small>
          Don't have an account. <Link to="/signup"> Signup </Link>
        </small>
        <button
          className={styles.guestCredentials}
          onClick={() => {
            setEmail("guest123@gmail.com");
            setPassword("Guest@123");
          }}
        >
          Fill Guest Credentials
        </button>
      </div>
    </div>
  );
}
