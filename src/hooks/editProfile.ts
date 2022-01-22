import { useMutation } from "@apollo/client"
import { EDIT_PROFILE } from "../graphql/index";

export type EditProfileProps = {
    name: string, 
    bio: string, 
    header: string | null, 
    profile: string | null
}

export function useEditProfile({name, bio, header, profile}:EditProfileProps){
    const [mutateEditProfile, { data, loading, error }] = useMutation(EDIT_PROFILE, {
        variables: {
            name,
            header,
            profile,
            bio
        }
    });

    return { mutateEditProfile, data, loading, error };
}