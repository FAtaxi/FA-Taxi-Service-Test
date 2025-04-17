// login.js
import { auth, signInWithEmailAndPassword } from './firebase-config.js';

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      alert("Inloggen succesvol!");
      console.log(user);
      // Hier kun je de gebruiker doorsturen naar de dashboardpagina of andere pagina
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessageText = error.message;
      errorMessage.textContent = `Fout: ${errorMessageText}`;
      console.error('Inlogfout:', errorCode, errorMessageText);
    });
});
