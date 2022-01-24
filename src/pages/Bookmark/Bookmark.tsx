import { useAppSelector } from "../../app/hooks";
import { PostBox } from "../../components";
import { Header } from "../../features/theme/Header";
import { BookmarkData } from "../pages.types";
import { NoResultMessage } from "../../components";
import styles from "./Bookmark.module.css";

export function Bookmark(): JSX.Element {
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const { profiles } = useAppSelector((state) => state.profiles);
  const bookmarks = getBookmarksData();

  function getBookmarksData() {
    let result: BookmarkData[] = [];
    const userBookmark = profiles?.find(
      (profile) => profile._id === currentUserId
    )?.bookmarks;

    const bookmarkProfiles = profiles?.filter((profile) =>
      userBookmark?.some((mark) => mark.userId === profile._id)
    );

    bookmarkProfiles?.forEach((profile) => {
      const profileInfo = {
        userId: profile._id,
        name: profile.name,
        username: profile.username,
        profilePicture: profile.picture.profile,
      };
      const bookmarkPosts = profile.posts.filter((post) =>
        userBookmark?.some((mark) => mark.postId === post._id)
      );

      bookmarkPosts.forEach((post) => {
        const bookmark = userBookmark?.find((mark) => mark.postId === post._id);
        const bookmarkData = { ...profileInfo, _id: bookmark?._id, post };
        result.push(bookmarkData);
      });
    });
    return result;
  }

  return (
    <div className={styles.bookmarks}>
      <Header page="Bookmark" />
      {bookmarks.length === 0 && (
        <NoResultMessage message="Bookmark List is Empty!" />
      )}
      {bookmarks?.map(
        ({ _id, name, userId, username, profilePicture, post }) => {
          return (
            <PostBox
              key={_id}
              postUserId={userId}
              name={name}
              username={username}
              profilePicture={profilePicture}
              post={post}
            />
          );
        }
      )}
    </div>
  );
}
