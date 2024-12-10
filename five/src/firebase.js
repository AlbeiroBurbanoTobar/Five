
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCLLqQvkcCptT2Wlkg6xXD4691V8FcizPA",
    authDomain: "five-a06e5.firebaseapp.com",
    projectId: "five-a06e5",
    storageBucket: "five-a06e5.firebasestorage.app",
    messagingSenderId: "214464034619",
    appId: "1:214464034619:web:48e4e03170a070ea0a691e",
    measurementId: "G-L1TND8Q0DT"
};



let app;
try {
  // Inicializar Firebase
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized');
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
}

const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, signOut };