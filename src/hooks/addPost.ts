import { useMutation } from "@apollo/client"
import { ADDPOST } from "../graphql";

export function useAddPost(text:string | null, image:string | null){

    const [ mutateAddPost, { data, loading } ] = useMutation(ADDPOST, {
        variables: {
            text,
            image
        },
        errorPolicy: "all"
    });

    return { mutateAddPost, loading, data };
}