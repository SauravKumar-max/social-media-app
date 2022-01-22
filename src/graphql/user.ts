import {gql} from "@apollo/client";

export const USER = gql`
    query currentUser{
        currentUser{
            _id
            name
            username
            picture{
                profile
            }
        }
    }
`;


export const FOLLOW = gql`
    mutation follow($followingId: ID!){
        follow(followingId: $followingId)
    }
`;


export const UNFOLLOW = gql`
    mutation unfollow($followingId: ID!){
        unfollow(followingId: $followingId)
    }
`;

