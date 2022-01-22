import { useMutation } from "@apollo/client"
import { ADDLIKE, REMOVELIKE } from "../graphql";

export function usePostLike(postUserId:string|undefined, postId:string|undefined){

    const [ mutateAddLike, {error:addLikeError, data:addLikeData} ] = useMutation(ADDLIKE, {
        variables: {
            postUserId,
            postId
        },
        errorPolicy: "all"
    });


    const [ mutateRemoveLike, { error:removeLikeError, data: removeLikeData } ] = useMutation(REMOVELIKE, {
        variables: {
            postUserId,
            postId
        },
        errorPolicy: "all"
    });

    return { mutateAddLike, addLikeError, addLikeData, mutateRemoveLike, removeLikeError, removeLikeData };
}