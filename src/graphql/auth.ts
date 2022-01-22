import {gql} from "@apollo/client";

export const LOGIN = gql`
    query login($email: String, $password: String){
        login(email: $email, password: $password){
            _id
            name
            token
        }
    }
`;


export const SIGNUP = gql`
    mutation singup($email: String!, $password: String!, $name: String!, $username: String!){
        singup(email: $email, password: $password, name: $name, username: $username){
            _id
            username
        }
    }
`;

