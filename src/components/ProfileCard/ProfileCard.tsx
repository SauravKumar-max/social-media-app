import { Link } from "react-router-dom";
import { FollowButton } from "../../features";
import { ProfileCardProps } from "../../pages/pages.types";
import styles from "./ProfileCard.module.css";

export function ProfileCard({
  currentUserId,
  profileId,
  profilePicture,
  name,
  username,
  followers,
}: ProfileCardProps): JSX.Element {
  return (
    <div className={styles.miniCard}>
      <div className={styles.profile}>
        <img src={profilePicture} alt="" />
        <Link className={styles.profileInfo} to={`/profile/${profileId}`}>
          <p>{name}</p>
          <p>@{username}</p>
        </Link>
      </div>
      {profileId !== currentUserId && (
        <FollowButton
          currentUserId={currentUserId}
          profileId={profileId}
          followers={followers}
        />
      )}
    </div>
  );
}
