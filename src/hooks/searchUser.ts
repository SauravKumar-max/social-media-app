import { useMutation } from "@apollo/client"
import { SEARCH_USER } from "../graphql";

export type Search = {
    _id: string,
    name: string,
    username: string,
    picture: {
        profile: string
    }
}

export function useSearchUser(searchInput:string){
    const [ search, { error, data, loading } ] = useMutation<{ searchUser: Search[] }> (SEARCH_USER,{
        variables: {
            searchInput
        },
        errorPolicy: "all"
    });

    const debounceSearch = () => {
        let timer:any;
        setTimeout(() => search(), 500);
        return () => clearTimeout(timer)
    }


    return { search, debounceSearch, error, data, loading };
}