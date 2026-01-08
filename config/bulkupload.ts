import { carouselImages, } from "@/store/resturant";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// const restaurantData = restaurants;

// export const uploadData = async () => {
//   try {
//     for (let i = 0; i < restaurantData.length; i++) {
//       const restaurant = restaurantData[i];
//       const docRef = doc(collection(db, "restaurants"), `restaurant_${i + 1}`);
//       await setDoc(docRef, restaurant);
//     }
//     console.log("Data uploaded");
//   } catch (e) {
//     console.log("Error uploading data", e);
//   }
// };

const carouselImg = carouselImages;
export const uploadData = async () => {
  try {
    for (let i = 0; i < carouselImg.length; i++) {
      const carousel = carouselImg[i];
      const docRef = doc(collection(db, "carousel"), `carousel${i + 1}`);
      await setDoc(docRef, carousel);
    }
    console.log("Data uploaded of carousel");
  } catch (e) {
    console.log("Error uploading data", e);
  }
};
// const slotss = slots;
// export const uploadData = async () => {
//   try {
//     for (let i = 0; i < slotss.length; i++) {
//       const slot = slotss[i];
//       const docRef = doc(collection(db, "slot"), `slot${i + 1}`);
//       await setDoc(docRef, slot);
//     }
//     console.log("Data uploaded of slot");
//   } catch (e) {
//     console.log("Error uploading data", e);
//   }
// };
