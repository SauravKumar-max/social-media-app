import { USER } from "../../graphql"
import { apolloClient } from "../../utils"

export async function getUser(){
    try {
        const response = await apolloClient.query({
            errorPolicy: "all",
            fetchPolicy: "network-only",
            query: USER
        })
        return response;
        
    } catch (error) {
        console.log({error})
    }
}