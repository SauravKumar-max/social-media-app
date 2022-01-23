import { useAppSelector } from "../../../app/hooks";
import { Loader, NoResultMessage, PostBox } from "../../../components";
import { generateFeed } from "../../../utils";
import { FeedType } from "../../features.types";
import styles from "./Feed.module.css";

export function Feed(): JSX.Element {
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const { profiles, status } = useAppSelector((state) => state.profiles);
  const feed: FeedType[] = generateFeed(profiles, currentUserId);

  return (
    <div className={styles.feed}>
      {status === "loading" && <Loader />}
      {feed.length === 0 && status === "succeeded" && (
        <NoResultMessage message="Feed is Empty!" />
      )}
      {feed.map(({ name, post, postUserId, profilePicture, username }) => {
        return (
          <PostBox
            key={post._id}
            name={name}
            post={post}
            postUserId={postUserId}
            profilePicture={profilePicture}
            username={username}
          />
        );
      })}
    </div>
  );
}
