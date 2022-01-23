export type PostType = {
    _id: string;
    text: string;
    image: string;
    likes: {
      count: number;
      likedUserId: string[];
    }
}

export type Picture = {
    profile: string;
    header: string;
}

export type Bookmarks = {
    _id: string | undefined;
    userId: string | undefined;
    postId: string | undefined;
}

export type ProfileData = {
    _id: string;
    name: string;
    username: string;
    bio: string;
    picture: Picture;
    following: string[] | undefined;
    followers: string[] | undefined;
    bookmarks: Bookmarks[] | undefined;
    posts: PostType[] | undefined;
}

export type SignupError = {
    duplicateEmail: string | null, 
    duplicateUsername: string | null, 
    inputError: string | null
}

export type BookmarkData = {
    _id: string | undefined;
    userId: string;
    name: string;
    username: string;
    profilePicture: string;
    post: PostType;
}

export type ProfileCardProps = {
    currentUserId: string;
    profileId: string;
    profilePicture: string;
    name: string;
    username: string;
    followers: string[];
}

export type NewsType = {
    title: string;
    urlToImage: string;
    url: string;
    source: {
        id: string
    }

}