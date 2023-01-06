// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIRKqSWPw5u5jtonk_OdMZ6PO_E0Ln9bQ",
  authDomain: "fileupload-59339.firebaseapp.com",
  projectId: "fileupload-59339",
  storageBucket: "fileupload-59339.appspot.com",
  messagingSenderId: "760911639165",
  appId: "1:760911639165:web:59565d7f9adab80b6e3714",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// export const BACKEND_URL = "http://127.0.0.1:5000";
export const BACKEND_URL = "https://mernauthentication.vercel.app";
