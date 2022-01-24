import { useParams } from "react-router-dom";
import {
  PostBox,
  Loader,
  ProfileHeader,
  NoResultMessage,
} from "../../components";
import { Header } from "../../features/theme/Header";
import styles from "./Profile.module.css";
import { ProfileData } from "../pages.types";
import { useAppSelector } from "../../app/hooks";

export function Profile() {
  const { id: profileId } = useParams();
  const { status, profiles } = useAppSelector((state) => state.profiles);
  const profile = profiles?.find((profile) => profile._id === profileId);
  const { _id, bio, followers, following, name, picture, username, posts } =
    (profile as ProfileData) || {};

  return (
    <div className={styles.profile}>
      {status === "loading" && <Loader />}
      {status === "succeeded" && (
        <>
          <Header page={name} />
          <ProfileHeader
            _id={_id}
            bio={bio}
            followers={followers}
            following={following}
            name={name}
            picture={picture}
            username={username}
          />
          {posts?.length === 0 ? (
            <NoResultMessage message="No Post to Show" />
          ) : (
            posts?.map((post) => (
              <PostBox
                key={post._id}
                postUserId={_id}
                name={name}
                post={post}
                username={username}
                profilePicture={picture?.profile}
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
