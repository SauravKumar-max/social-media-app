import { useMutation, useQuery } from "@apollo/client"
import { COMMENTS, MUTATECOMMENTS } from "../graphql";

export type CommentsData = {
    _id: string;
    text: string;
    commentUser: {
        _id: string;
        username: string;
        name: string;
        picture: {
            profile: string;
        }
    }
}

export function useComments(postUserId: string, postId:string, text:string){
    const { loading:commentsLoading, data:commentsData } = useQuery<{comments: CommentsData[]}>(COMMENTS, {
        variables: {
            postUserId,
            postId
        },
        fetchPolicy:"network-only"
    });

    const [mutateComments, { data: mutateCommentsData, loading:mutateCommentsLoading }] = useMutation(MUTATECOMMENTS, {
        variables: {
            postUserId,
            postId,
            text
        },
        refetchQueries: [
            COMMENTS,
            "comments"
        ]
    });

    return { 
        commentsLoading, 
        commentsData: commentsData?.comments, 
        mutateComments, 
        mutateCommentsLoading, 
        mutateCommentsData 
    };
}