import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { Loader, PostBox, Comments, NoResultMessage } from "../../components";
import { PostType } from "../../features/features.types";
import { Header } from "../../features/theme/Header";
import styles from "./Post.module.css";

export function Post(): JSX.Element {
  const { id: postId } = useParams();
  const { profiles } = useAppSelector((state) => state.profiles);
  const { status } = useAppSelector((state) => state.profiles);
  const { post, name, username, postUserId, profilePicture } = getPost();

  function getPost() {
    const user = profiles?.find((user) =>
      user?.posts?.find((post) => post?._id === postId)
    );
    const findPost = user?.posts.find((post) => post?._id === postId);
    return {
      post: findPost as PostType,
      name: user?.name || "",
      username: user?.username || "",
      postUserId: user?._id || "",
      profilePicture: user?.picture.profile || "",
    };
  }
  return (
    <div className={styles.postPage}>
      {status === "loading" && <Loader />}
      {status === "succeeded" && (
        <div>
          <Header page={"Post"} />
          {post ? (
            <>
              <PostBox
                key={post?._id}
                name={name}
                username={username}
                postUserId={postUserId}
                profilePicture={profilePicture}
                post={post}
              />
              <Comments
                postUserId={postUserId}
                postId={post?._id}
                postUsername={username}
              />
            </>
          ) : (
            <NoResultMessage message="Post Not Available" />
          )}
        </div>
      )}
    </div>
  );
}
