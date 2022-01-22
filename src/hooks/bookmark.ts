import { useMutation } from "@apollo/client"
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from "../graphql";
import { apolloClient } from "../utils";

export function useBookmark(postUserId:string, postId:string){

    const [ mutateAddBookmark, { data, loading } ] = useMutation(ADD_BOOKMARK, {
        variables: {
            postUserId,
            postId
        },
        errorPolicy: "all"
    });


    async function mutateRemoveBookmark(bookmarkId:string){
        try {
            const response = await apolloClient.mutate({
                mutation: REMOVE_BOOKMARK,
                variables: {
                    bookmarkId
                },
                errorPolicy: "all",
            })
            return response
        } catch (error) {
            console.log({error})
        }
    }
    

    return { mutateAddBookmark, loading, data, mutateRemoveBookmark };
}