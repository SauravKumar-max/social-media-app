import { PROFILE } from "../../graphql";
import { apolloClient } from "../../utils"

export async function getProfiles(){
    try {
        const response = await apolloClient.query({
            errorPolicy: "all",
            fetchPolicy: "network-only",
            query: PROFILE,
        })
        return response
    } catch (error) {
        console.log({error})
    }
}