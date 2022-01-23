import { ProfileCard } from "../ProfileCard/ProfileCard";
import { useAppSelector } from "../../app/hooks";
import styles from "./Suggestion.module.css";

export function Suggestion() {
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const { profiles } = useAppSelector((state) => state.profiles);
  const suggestions = getSuggestions();

  function getSuggestions() {
    const user = profiles?.find((profile) => profile._id === currentUserId);
    const userFollowing = user?.following && [
      ...user?.following,
      currentUserId,
    ];
    const nonFollowingProfiles = profiles?.filter(
      (profile) => !userFollowing?.includes(profile._id)
    );
    const limitSuggestion = nonFollowingProfiles?.slice(0, 5);
    return limitSuggestion;
  }

  return (
    <>
      {suggestions?.length! > 0 && (
        <div className={styles.suggestionContainer}>
          <h3>Who to follow</h3>
          <div className={styles.suggestionProfiles}>
            {suggestions?.map(({ _id, name, picture, username, followers }) => {
              return (
                <ProfileCard
                  key={_id}
                  name={name}
                  username={username}
                  profileId={_id}
                  profilePicture={picture.profile}
                  followers={followers}
                  currentUserId={currentUserId}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
