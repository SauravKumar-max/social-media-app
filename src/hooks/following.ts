import { useMutation } from "@apollo/client"
import { UNFOLLOW, FOLLOW } from "../graphql";

export function useFollowing(followingId: string|undefined|null){

    const [ mutateFollow, { loading:followLoading } ] = useMutation(FOLLOW,{
        variables: {
            followingId
        },      
        errorPolicy: "all"
    });

    const [ mutateUnFollow, { loading: unfollowLoading} ] = useMutation(UNFOLLOW, {
        variables: {
            followingId
        },
        errorPolicy: "all"
    });

    return { mutateFollow, mutateUnFollow, followLoading, unfollowLoading };
}