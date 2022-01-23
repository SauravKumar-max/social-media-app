import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ProfileData } from "../../pages/pages.types";
import { EditProfile, FollowButton } from "../../features";
import { Link } from "react-router-dom";
import styles from "./ProfileHeader.module.css";
import { toggleEditModal } from "../../features/currentUser/userSlice";

export function ProfileHeader({
  _id: profileId,
  bio,
  followers,
  following,
  name,
  picture,
  username,
}: Omit<ProfileData, "posts" | "bookmarks">): JSX.Element {
  const dispatch = useAppDispatch();
  const { currentUserId, editProfileModal } = useAppSelector(
    (state) => state.currentUser
  );
  return (
    <>
      <div className={styles.profileImages}>
        <div className={styles.headerImage}>
          {picture?.header && <img src={picture?.header} alt="header" />}
        </div>
        <div className={styles.user}>
          <div className={styles.userImage}>
            <img src={picture?.profile} alt="user" />
          </div>
          <div className={styles.userAction}>
            {currentUserId === profileId ? (
              <button
                className={styles.editProfile}
                onClick={() => dispatch(toggleEditModal(true))}
              >
                Edit Profile
              </button>
            ) : (
              <FollowButton
                currentUserId={currentUserId}
                profileId={profileId}
                followers={followers}
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.profileInfo}>
        <p className={styles.profileName}>{name}</p>
        <p className={styles.profileUsername}>@{username}</p>
        <p className={styles.userBio}>{bio}</p>
        <div className={styles.connections}>
          <Link
            to={`/profile/following/${profileId}`}
            className={styles.followingLink}
          >
            <span>{following?.length} </span> Following
          </Link>
          <Link
            to={`/profile/followers/${profileId}`}
            className={styles.followersLink}
          >
            <span>{followers?.length} </span> Followers
          </Link>
        </div>
      </div>
      {editProfileModal && (
        <EditProfile
          profileId={profileId}
          name={name}
          picture={picture}
          bio={bio}
        />
      )}
    </>
  );
}
