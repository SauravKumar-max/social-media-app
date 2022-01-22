import {gql} from "@apollo/client";

export const ADDPOST = gql`
    mutation addPost($text: String!, $image: String!){
        addPost(text: $text, image: $image){
            _id
            text
            image
            likes{
                count
                likedUserId
            }
            createdAt
        }
    }
`;

export const REMOVEPOST = gql`
    mutation removePost($postId: ID){
        removePost(postId: $postId){
            _id
            text
        }
    }
`;

