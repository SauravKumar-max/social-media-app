import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import {
  Layout,
  BottomNavigation,
  MainLoader,
  AddPostFloatBtn,
  ConfirmLogout,
  ConfirmUnfollow,
} from "./components";
import {
  Login,
  Home,
  Profile,
  Search,
  Post,
  Signup,
  Bookmark,
  Following,
  Followers,
} from "./pages";
import { useAppDispatch } from "./app/hooks";
import { useEffect, useRef } from "react";
import { PrivateRoute } from "./utils";
import { getCurrentUser, getAllProfiles, AddPostModal } from "./features";
import "./App.css";

function App() {
  const appRef = useRef<HTMLDivElement>(null);
  const { theme } = useAppSelector((state) => state.theme);
  const { isAuthenticated, token } = useAppSelector((state) => state.auth);
  const { addPostModal, logoutModal, unfollowModal } = useAppSelector(
    (state) => state.currentUser
  );
  const { status } = useAppSelector((state) => state.profiles);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(getAllProfiles());
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated, token]);

  useEffect(() => {
    const bodyElement = appRef?.current?.parentElement?.parentElement;
    if (theme === "dark") {
      bodyElement!.style.backgroundColor = "#192734";
    } else {
      bodyElement!.style.backgroundColor = "#fff";
    }
  }, [theme]);

  return (
    <div className={`App ${theme}`} ref={appRef}>
      {addPostModal && <AddPostModal />}
      {status === "loading" && <MainLoader />}
      {logoutModal && <ConfirmLogout />}
      {unfollowModal.show && <ConfirmUnfollow />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout children={<Home />} />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <Layout children={<Search />} />
            </PrivateRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <Layout children={<Post />} />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookmark"
          element={
            <PrivateRoute>
              <Layout children={<Bookmark />} />
            </PrivateRoute>
          }
        />
        <Route path="/profile">
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Layout children={<Profile />} />
              </PrivateRoute>
            }
          />
          <Route
            path=":id"
            element={
              <PrivateRoute>
                <Layout children={<Profile />} />
              </PrivateRoute>
            }
          />
          <Route
            path="following/:id"
            element={
              <PrivateRoute>
                <Layout children={<Following />} />
              </PrivateRoute>
            }
          />
          <Route
            path="followers/:id"
            element={
              <PrivateRoute>
                <Layout children={<Followers />} />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      <AddPostFloatBtn />
      <BottomNavigation />
    </div>
  );
}

export default App;
