import { useMutation, useQuery } from "@apollo/client"
import { COMMENTS, MUTATECOMMENTS, DELETECOMMENT } from "../graphql";
import { apolloClient } from "../utils";


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

export function useComments(postUserId: string, postId: string, text?: string){
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

    async function mutateDeleteComment(postUserId: string, postId: string, commentId: string){
        try {
            const response = await apolloClient.mutate({
                mutation: DELETECOMMENT,
                variables: {
                    postUserId,
                    postId,
                    commentId
                },
                refetchQueries: [
                    COMMENTS,
                    "comments"
                ],
                errorPolicy: "all",
            })
            return response.data
        } catch (error) {
            console.log({error})
        }
    }

    return { 
        commentsLoading, 
        commentsData: commentsData?.comments, 
        mutateComments, 
        mutateCommentsLoading, 
        mutateCommentsData,
        mutateDeleteComment
    };
}