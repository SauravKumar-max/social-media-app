import {gql} from "@apollo/client";

export const PROFILE = gql`
    query {
        profiles{
            _id
            name
            username
            picture{
                profile
                header
            }
            bio
            following
            followers
            bookmarks{
                _id
                userId
                postId
            }
            posts{
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
    }
`;


export const EDIT_PROFILE = gql`
    mutation updateProfile($name: String!, $profile: String!, $header: String!, $bio: String!){
        updateProfile(name: $name, profile: $profile, header: $header, bio: $bio){
            name
            bio
            picture{
                profile
                header
            }
        }
    }
`;