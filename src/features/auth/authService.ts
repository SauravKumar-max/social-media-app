import { LOGIN } from "../../graphql";
import { apolloClient } from "../../utils";

export async function login(variables:{email:string, password: string}){
    const response = await apolloClient.query({
        fetchPolicy: "network-only",
        query: LOGIN,
        variables
    })
    return response;
}