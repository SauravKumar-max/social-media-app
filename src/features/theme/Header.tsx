import { useEffect, useRef } from "react";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setThemeInLocalStorage } from "../../utils";
import { darkTheme, lightTheme, selectTheme } from "./themeSlice";
import { useLocation } from "react-router-dom";
import { HiArrowNarrowLeft } from "react-icons/hi";
import styles from "./Header.module.css";

export function Header({ page }: { page: string | undefined }): JSX.Element {
  const { theme } = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();
  const scrollToTopRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setThemeInLocalStorage(theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={styles.homeHeader} ref={scrollToTopRef}>
      <div className={styles.pageName}>
        {pathname !== "/" && (
          <button onClick={() => window.history.back()}>
            {<HiArrowNarrowLeft />}
          </button>
        )}
        <p>{page}</p>
      </div>
      <button
        onClick={() =>
          theme === "light" ? dispatch(darkTheme()) : dispatch(lightTheme())
        }
      >
        {theme === "light" ? <RiMoonClearFill /> : <RiSunFill />}
      </button>
    </div>
  );
}
