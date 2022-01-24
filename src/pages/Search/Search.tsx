import { Header } from "../../features/theme/Header";
import styles from "./Search.module.css";
import { BsSearch, BsEmojiNeutralFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { useSearchUser } from "../../hooks";
import { Loader } from "../../components";
import { useNavigate } from "react-router-dom";

export function Search() {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchInput, setSearchInput] = useState("");
  const { debounceSearch, data, loading } = useSearchUser(searchInput);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.search}>
      <Header page="Search" />
      <div className={styles.searchContainer}>
        <div className={styles.searchField}>
          <span>{<BsSearch />}</span>
          <input
            value={searchInput}
            ref={inputRef}
            type="text"
            placeholder="Search"
            onKeyUp={() => debounceSearch()}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className={styles.searchResult}>
            {data?.searchUser.length === 0 || data === undefined ? (
              <div className={styles.noResult}>
                <span>
                  <BsEmojiNeutralFill />
                </span>
                <p>No User Found</p>
              </div>
            ) : (
              <>
                {data?.searchUser.map((user) => {
                  return (
                    <div
                      key={user._id}
                      className={styles.searchProfile}
                      onClick={() => navigate(`/profile/${user._id}`)}
                    >
                      <img src={user.picture.profile} alt="" />
                      <div className={styles.searchDetail}>
                        <p>{user.name}</p>
                        <p>{user.username}</p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
