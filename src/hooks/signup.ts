import { useMutation } from "@apollo/client"
import { SIGNUP } from "../graphql";

export function useSignup(email:string, password:string, name:string, username:string){
    const [ mutateSignup, { data, loading, error } ] = useMutation(SIGNUP, {
        variables: {
            email, 
            password,  
            name,  
            username
        },
        errorPolicy: "all",
        fetchPolicy: "network-only"
    });

    return { mutateSignup, loading, data, error };
}