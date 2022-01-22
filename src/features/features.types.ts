
export type UserState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    errorMessage: string | null;
    currentUserId: string;
    currentUserImage: string;
    addPostModal: boolean;
    editProfileModal: boolean;
    logoutModal: boolean;
    unfollowModal: {
        show: boolean;
        profileId: string | null
    }
}

export type AuthState = {
    token: string | null,
    isAuthenticated: boolean,
    status: 'idle' | 'loading' | 'failed',
    errorMessage: string | null
}

export type ProfileState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    errorMessage: string | null;
    profiles: ProfileData[] | null;
}

export type PostType = {
    _id: string;
    text: string;
    image: string;
    likes: {
      count: number;
      likedUserId: string[];
    };
    createdAt: string;
}

export type Picture = {
    profile: string;
    header: string;
}

export type Bookmarks = {
    _id: string;
    userId: string;
    postId: string;
}

export type ProfileData = {
    _id: string;
    name: string;
    username: string;
    bio: string;
    picture: Picture;
    following: string[];
    followers: string[];
    bookmarks: Bookmarks[];
    posts: PostType[]
}

export type AllPostData = {
    _id: string;
    posts: PostType[];
    profile: {
        _id: string;
        name: string;
        username: string;
        picture: {
            profile: string;
        }
    }
}

export type PostLikeBtnProps = {
    currentUserId: string;
    postUserId: string;
    postId: string;
    likes: {
      count: number;
      likedUserId: string[];
    };
};

export type FollowProp = {
    currentUserId: string;
    profileId: string;
    followers: string[] | undefined;
}

export type FeedType = {
    post: PostType;
    name: string;
    username: string;
    postUserId: string;
    profilePicture: string
}