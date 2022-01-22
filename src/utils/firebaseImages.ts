import firebase from "firebase";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAJ11BoP3Tp_LsDFBizU90hOgwkt3lAMgw",
    authDomain: "socialmediaimages.firebaseapp.com",
    projectId: "socialmediaimages",
    storageBucket: "socialmediaimages.appspot.com",
    messagingSenderId: "210991461119",
    appId: "1:210991461119:web:18d6ab6b540325ae7712ca",
    measurementId: "G-WFC18N96GS"
};

firebase.initializeApp(firebaseConfig)

export async function uploadImage(image:File) {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(image.name)
    await fileRef.put(image)
    const downloadURL = await fileRef.getDownloadURL()
    return downloadURL;
}