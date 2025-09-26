import { initializeApp, getApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqmII6xw9zVXmBYK4sYQXM0d8LSC8tJ9A",
  authDomain: "ptapp-f4b4d.firebaseapp.com",
  projectId: "ptapp-f4b4d",
  storageBucket: "ptapp-f4b4d.firebasestorage.app",
  messagingSenderId: "360387400618",
  appId: "1:360387400618:web:5e23bf828abfb4d76911d3",
  measurementId: "G-6RBWTHBYX1"
};

function ensureFirebase() {
  try {
    const app = initializeApp(firebaseConfig);
    return { app, auth: getAuth(app) };
  } catch (e) {
    const app = getApp();
    return { app, auth: getAuth(app) };
  }
}

async function doGlobalLogout() {
  try {
    const { auth } = ensureFirebase();
    await signOut(auth);
  } catch (e) {
    console.error("Global logout error:", e);
  } finally {
    window.location.href = "login.html";
  }
}

// Expose globally for any page
window.globalLogout = doGlobalLogout;

// Auto-wire a button with id global-logout-btn if present
window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("global-logout-btn");
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      doGlobalLogout();
    });
  }
});
