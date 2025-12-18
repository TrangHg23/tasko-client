import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyCc91HVd0odTUexuik6u11SuGrSwxqODto",
  projectId: "tasko-f1748",
  messagingSenderId: "394433719296",
  appId: "1:394433719296:web:2a9660e1b8172a33cc3ce5",
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);