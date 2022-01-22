import React, { useEffect, useRef, useState } from "react";
import { FaImage, FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { togglePostModal } from "../../currentUser/userSlice";
import { addPost } from "../profileSlice";
import { useAddPost } from "../../../hooks/addPost";
import { uploadImage } from "../../../utils/firebaseImages";
import { ScreenLoader } from "../../../components/Loader/ScreenLoader";
import styles from "./AddPostModal.module.css";

export function AddPostModal(): JSX.Element {
  const { currentUserId, currentUserImage } = useAppSelector(
    (state) => state.currentUser
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [postText, setPostText] = useState("");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const { mutateAddPost, data } = useAddPost(postText, imageURL);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (imageURL !== null) {
      mutateAddPost();
    }
  }, [imageURL, mutateAddPost]);

  useEffect(() => {
    if (data) {
      dispatch(addPost({ userId: currentUserId, newPost: data.addPost }));
      dispatch(togglePostModal(false));
      setLoading(false);
    }
  }, [data, dispatch, currentUserId]);

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    setImageFile(file);
    e.currentTarget.value = "";
  }

  function postHandler() {
    setLoading(true);
    if (imageFile) {
      uploadImage(imageFile).then((url) => setImageURL(url));
    } else {
      setImageURL("");
    }
  }

  return (
    <>
      {loading && <ScreenLoader />}
      <div className={styles.addPostModal}>
        <div
          className={styles.backdrop}
          onClick={() => dispatch(togglePostModal(false))}
        ></div>
        <div className={styles.addPostContainer}>
          <div className={styles.removeModal}>
            <button onClick={() => dispatch(togglePostModal(false))}>
              {<FaTimes />}
            </button>
          </div>
          <div className={styles.postField}>
            <img
              className={styles.userImage}
              src={currentUserImage}
              alt="user"
            />
            <div className={styles.addPostActions}>
              <div
                onInput={() => setPostText(inputRef.current?.innerText || "")}
                className={styles.addPostInput}
                contentEditable={true}
                suppressContentEditableWarning={true}
                tabIndex={0}
                spellCheck={false}
                ref={inputRef}
                placeholder="What's happening?"
              ></div>

              {imageFile && (
                <div className={styles.selectedImage}>
                  <button onClick={() => setImageFile(null)}>
                    {<FaTimes />}
                  </button>
                  <img src={URL.createObjectURL(imageFile) || ""} alt="" />
                </div>
              )}

              <div className={styles.addPostBtns}>
                <div className={styles.addImage}>
                  <button className={styles.addImageBtn}>{<FaImage />}</button>
                  <input
                    type="file"
                    className={styles.addImageInput}
                    name="post"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={(e) => imageHandler(e)}
                  />
                </div>

                <button className={styles.postBtn} onClick={postHandler}>
                  {loading ? "posting..." : "Post"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
