import {gql} from "@apollo/client";

export const SEARCH_USER = gql`
    mutation searchUser($searchInput: String!){
        searchUser(searchInput: $searchInput){
            _id
            name
            username
            picture{
                profile
            }
        }
    }
`;
