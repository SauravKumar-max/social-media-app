import {gql} from "@apollo/client";

export const ADDLIKE = gql`
    mutation addLike($postUserId: ID!, $postId: ID!){
        addLike(postUserId: $postUserId, postId: $postId){
            _id
            likes{
                count
                likedUserId
            }
        }
    }
`;


export const REMOVELIKE = gql`
    mutation removeLike($postUserId: ID!, $postId: ID!){
        removeLike(postUserId: $postUserId, postId: $postId){
            _id
            likes{
                count
                likedUserId
            }
        }
    }
`;

