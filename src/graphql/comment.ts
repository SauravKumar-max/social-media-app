import {gql} from "@apollo/client";

export const COMMENTS = gql`
    query comments($postUserId: ID, $postId: ID){
        comments(postUserId: $postUserId, postId: $postId){
            _id
    	    text
    	    commentUser{
		_id		
                name
                username
                picture{
                    profile
                }
            }
        }
    }
`;


export const MUTATECOMMENTS = gql`
    mutation addComment($postUserId: ID, $postId: ID, $text: String){
        addComment(postUserId: $postUserId, postId: $postId, text: $text){
            _id
    	    text
        }
    }

`;

export const DELETECOMMENT = gql`
    mutation deleteComment($postUserId: ID, $postId: ID, $commentId: ID){
        deleteComment(postUserId: $postUserId, postId: $postId, commentId: $commentId){
    	    _id
        }
    }
`

