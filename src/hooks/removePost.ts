import { useMutation } from "@apollo/client"
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { removePost } from "../features/profiles/profileSlice";
import { REMOVEPOST } from "../graphql";

export function useRemovePost(postId: string, currentUserId: string){
    const dispatch = useAppDispatch();

    const [ mutateRemovePost, { data, loading } ] = useMutation(REMOVEPOST, {
        variables: {
            postId
        },
        errorPolicy: "all"
    });


    useEffect(() => {
        if(data){
            dispatch(removePost({ postId, userId: currentUserId }))
        }
    }, [data, currentUserId, postId, dispatch])

    console.log(data)

    return { mutateRemovePost, loading };
}