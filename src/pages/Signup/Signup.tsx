import { useEffect, useState } from "react";
import { FaTwitter } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUserWithCredentials } from "../../features/auth/authSlice";
import { useSignup } from "../../hooks";
import { SignupError } from "../pages.types";
import { ScreenLoader } from "../../components";
import styles from "./Signup.module.css";

export function Signup(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { status, token, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );
  const [errorMessage, setErrorMessage] = useState<SignupError>({
    duplicateEmail: null,
    duplicateUsername: null,
    inputError: null,
  });
  const { mutateSignup, data, loading, error } = useSignup(
    email,
    password,
    name,
    username
  );

  useEffect(() => {
    if (isAuthenticated && token) navigate("/");
  }, [isAuthenticated, token, navigate]);

  useEffect(() => {
    if (data) {
      dispatch(loginUserWithCredentials({ email, password }));
    }
  }, [data, dispatch, email, password]);

  useEffect(() => {
    if (password !== confirmPassword) {
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        inputError: "Password not matched!",
        duplicateEmail: null,
        duplicateUsername: null,
      }));
    } else {
      setErrorMessage((errorMessage) => ({
        ...errorMessage,
        inputError: null,
        duplicateEmail: null,
        duplicateUsername: null,
      }));
    }

    if (error) {
      const errorKind = error.message;

      if (errorKind.includes("email")) {
        setErrorMessage((errorMessage) => ({
          ...errorMessage,
          duplicateEmail: "Email already exists!",
          duplicateUsername: null,
          inputError: null,
        }));
      }

      if (errorKind.includes("username")) {
        setErrorMessage((errorMessage) => ({
          ...errorMessage,
          duplicateUsername: "Username already exists!",
          duplicateEmail: null,
          inputError: null,
        }));
      }
    }
  }, [error, password, confirmPassword]);

  return (
    <div className={styles.signupContainer}>
      {(loading || status === "loading") && <ScreenLoader />}
      <div className={styles.homeLinkContainer}>
        <Link to="/" className={styles.homeLink}>
          <FaTwitter />
        </Link>
      </div>
      <div className={styles.signupField}>
        <h2>SignUp</h2>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {errorMessage.duplicateEmail && (
          <p className={styles.errorMessage}>{errorMessage.duplicateEmail}</p>
        )}
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        {errorMessage.duplicateUsername && (
          <p className={styles.errorMessage}>
            {errorMessage.duplicateUsername}
          </p>
        )}
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          value={confirmPassword}
          placeholder="ReEnter Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errorMessage.inputError && (
          <p className={styles.errorMessage}>{errorMessage.inputError}</p>
        )}
        {email &&
        name &&
        username &&
        password &&
        confirmPassword &&
        password === confirmPassword ? (
          <button onClick={() => mutateSignup()}>
            {loading || status === "loading" ? "Signing..." : "SignUp"}
          </button>
        ) : (
          <button style={{ opacity: "0.6" }}>SignUp</button>
        )}
        <small>
          Already have an account <Link to="/login"> login </Link>
        </small>
      </div>
    </div>
  );
}
