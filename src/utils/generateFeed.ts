import { FeedType, ProfileData } from "../features/features.types";

export function generateFeed(profiles:ProfileData[] | null, currentUserId:string):FeedType[] {
    let feed: FeedType[] = [];
    const profile = profiles?.find((profile) => profile._id === currentUserId);
    const following = profile?.following;
    const feedUserId = following && [...following, currentUserId];
    const feedProfiles = profiles?.filter((user) =>
      feedUserId?.includes(user._id)
    );
    feedProfiles?.forEach((user) => {
      const profileInfo = {
        postUserId: user._id,
        name: user.name,
        username: user.username,
        profilePicture: user.picture.profile,
      };
      const feedPost = user.posts.map((post) => ({ ...profileInfo, post }));
      feed = [...feed, ...feedPost];
      feed = feed.sort(
        (a, b) => parseInt(b.post.createdAt) - parseInt(a.post.createdAt)
      );
    });
    return feed;
  }