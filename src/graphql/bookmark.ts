import {gql} from "@apollo/client";

export const ADD_BOOKMARK = gql`
    mutation addBookmark($postUserId: ID, $postId: ID){
        addBookmark(postUserId: $postUserId, postId: $postId){
            _id
            userId
            postId
        }
    }
`;

export const REMOVE_BOOKMARK = gql`
    mutation removeBookmark($bookmarkId: ID){
        removeBookmark(bookmarkId: $bookmarkId){
            _id
        }
    }
`;