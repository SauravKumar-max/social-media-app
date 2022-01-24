import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Header } from "../../features/theme/Header";
import { Link } from "react-router-dom";
import styles from "./Followers.module.css";
import { ProfileCard } from "../../components";

export function Followers(): JSX.Element {
  const { currentUserId } = useAppSelector((state) => state.currentUser);
  const { profiles } = useAppSelector((state) => state.profiles);
  const { id: profileId } = useParams();
  const currentprofile = profiles?.find((profile) => profile._id === profileId);
  const followersProfile = profiles?.filter((user) =>
    currentprofile?.followers.includes(user._id)
  );
  return (
    <div className={styles.followerPage}>
      <Header page={currentprofile?.name} />
      <div className={styles.links}>
        <Link
          to={`/profile/following/${profileId}`}
          className={styles.inActiveLink}
        >
          Following
        </Link>
        <Link
          to={`/profile/followers/${profileId}`}
          className={styles.activeLink}
        >
          Followers
        </Link>
      </div>
      <div>
        {currentprofile?.followers.length === 0 ? (
          <p className={styles.emptyList}>List is Empty</p>
        ) : (
          followersProfile?.map(
            ({ _id, picture, name, username, followers }) => {
              return (
                <div key={_id} className={styles.profileItem}>
                  <ProfileCard
                    currentUserId={currentUserId}
                    profileId={_id}
                    profilePicture={picture.profile}
                    name={name}
                    username={username}
                    followers={followers}
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
