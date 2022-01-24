import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Header } from "../../features/theme/Header";
import { Link } from "react-router-dom";
import styles from "./Following.module.css";
import { ProfileCard } from "../../components";

export function Following(): JSX.Element {
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const { profiles } = useAppSelector((state) => state.profiles);
  const { id: profileId } = useParams();
  const currentprofile = profiles?.find((profile) => profile._id === profileId);
  const followingsProfile = profiles?.filter((user) =>
    currentprofile?.following.includes(user._id)
  );
  return (
    <div className={styles.followingPage}>
      <Header page={currentprofile?.name} />
      <div className={styles.links}>
        <Link
          to={`/profile/following/${profileId}`}
          className={styles.activeLink}
        >
          Following
        </Link>
        <Link
          to={`/profile/followers/${profileId}`}
          className={styles.inActiveLink}
        >
          Followers
        </Link>
      </div>
      <div>
        {currentprofile?.following.length === 0 ? (
          <p className={styles.emptyList}>List is Empty</p>
        ) : (
          followingsProfile?.map(
            ({ _id, picture, name, username, followers }) => {
              return (
                <div key={_id} className={styles.profileItem}>
                  <ProfileCard
                    currentUserId={currentUserId}
                    profileId={_id}
                    followers={followers}
                    profilePicture={picture.profile}
                    name={name}
                    username={username}
                  />
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
}
