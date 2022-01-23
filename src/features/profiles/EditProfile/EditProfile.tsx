import { useEffect, useState } from "react";
import { FaTimes, FaImage } from "react-icons/fa";
import { uploadImage } from "../../../utils/firebaseImages";
import { useEditProfile } from "../../../hooks";
import styles from "./EditProfile.module.css";
import { useAppDispatch } from "../../../app/hooks";
import { updateProfile } from "../profileSlice";
import { toggleEditModal, changeUserImage } from "../../currentUser/userSlice";
import { ScreenLoader } from "../../../components";

export type EditProfileProps = {
  profileId: string;
  name: string;
  bio: string;
  picture: {
    profile: string;
    header: string;
  };
};

export function EditProfile({
  profileId,
  name,
  bio,
  picture,
}: EditProfileProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [profileName, setProfileName] = useState(name);
  const [porfileBio, setProfileBio] = useState(bio);
  const [headerImage, setHeaderImage] = useState<string | File>(picture.header);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | File>(
    picture.profile
  );
  const [downloadedHeaderURL, setDownloadHeaderURL] = useState<string | null>(
    null
  );
  const [downloadedProfileURL, setDownloadProfileURL] = useState<string | null>(
    null
  );

  const { mutateEditProfile } = useEditProfile({
    name: profileName,
    bio: porfileBio,
    header: downloadedHeaderURL,
    profile: downloadedProfileURL,
  });

  useEffect(() => {
    if (downloadedHeaderURL !== null && downloadedProfileURL !== null) {
      dispatch(
        updateProfile({
          userId: profileId,
          name: profileName,
          bio: porfileBio,
          headerImage: downloadedHeaderURL,
          profileImage: downloadedProfileURL,
        })
      );
      mutateEditProfile();
      dispatch(changeUserImage(downloadedProfileURL));
      setLoading(false);
      dispatch(toggleEditModal(false));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [downloadedHeaderURL, downloadedProfileURL, mutateEditProfile, dispatch]);

  function saveProfile() {
    if (typeof headerImage === "object") {
      uploadImage(headerImage).then((imageURL) => {
        console.log(imageURL);
        setDownloadHeaderURL(imageURL);
      });
    } else {
      setDownloadHeaderURL(headerImage);
    }
    if (typeof profileImage === "object") {
      uploadImage(profileImage).then((imageUrl) => {
        console.log(imageUrl);
        setDownloadProfileURL(imageUrl);
      });
    } else {
      setDownloadProfileURL(profileImage);
    }
    setLoading(true);
  }

  return (
    <>
      {loading && <ScreenLoader />}
      <div className={styles.editProfile}>
        <div
          className={styles.backdrop}
          onClick={() => dispatch(toggleEditModal(false))}
        ></div>
        <div className={styles.editProfileContainer}>
          <div className={styles.modalHeader}>
            <div className={styles.removeModal}>
              <button onClick={() => dispatch(toggleEditModal(false))}>
                {<FaTimes />}
              </button>
              <p>Edit Profile</p>
            </div>
          </div>
          <div className={styles.editActions}>
            <div className={styles.headerImage}>
              {headerImage && (
                <img
                  src={
                    typeof headerImage === "object"
                      ? URL.createObjectURL(headerImage)
                      : headerImage
                  }
                  alt=""
                />
              )}
              <div className={styles.headerOverlay}>
                <div className={styles.headerInput}>
                  <button className={styles.addImageBtn}>{<FaImage />}</button>
                  <input
                    type="file"
                    id="header"
                    name="header"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => {
                      setHeaderImage(e.target.files![0]);
                      e.currentTarget.value = "";
                    }}
                  />
                </div>
                <button
                  className={styles.headerRemove}
                  onClick={() => setHeaderImage("")}
                >
                  X
                </button>
              </div>
            </div>
            <div className={styles.profileImage}>
              <img
                src={
                  typeof profileImage === "object"
                    ? URL.createObjectURL(profileImage)
                    : profileImage
                }
                alt=""
              />
              <div className={styles.profileOverlay}>
                <button className={styles.addImageBtn}>{<FaImage />}</button>
                <input
                  type="file"
                  id="profile"
                  name="profile"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={(e) => {
                    setProfileImage(e.target.files![0]);
                  }}
                />
              </div>
            </div>
            <div className={styles.editInputs}>
              <input
                style={{ borderColor: profileName === "" ? "red" : "#fff" }}
                type="text"
                placeholder="Name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Bio"
                value={porfileBio}
                onChange={(e) => setProfileBio(e.target.value)}
              />
              <button
                disabled={profileName === ""}
                className={
                  profileName === "" ? styles.disabledSaveBtn : styles.saveBtn
                }
                onClick={saveProfile}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
