import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./../../config/FirebaseConfig";

// Function to generate a random string of specified length
const generateRandomString = (length) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const uploadImage = async (image) => {
  if (image) {
    const randomString = generateRandomString(6);
    const newFileName = `${image.name.split(".")[0]}_${randomString}.${image.name.split(".").pop()}`;
    const storageRef = ref(storage, `images/${newFileName}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    console.log("File available at", url);
    return url;
  }
  return null;
};
