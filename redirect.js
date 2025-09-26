import { firebaseConfig } from "./config.js";

const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

// Check authentication and redirect based on user type
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, check their userType
    firestore.collection('users').doc(user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const userType = userData.userType;
          let formComplete = userData.formComplete;
          
          // If formComplete field doesn't exist, create it and set to 'no'
          if (formComplete === undefined) {
            firestore.collection('users').doc(user.uid).update({
              formComplete: 'no'
            }).then(() => {
              formComplete = 'no';
            }).catch((error) => {
              console.error('Error updating formComplete field:', error);
            });
          }
          
          if (userType === 'pt') {
            // Redirect to PT dashboard
            window.location.href = 'pt.html';
          } else if (userType === 'client') {
            // Check if health form is completed
            if (formComplete === 'no' || formComplete === undefined) {
              // Redirect to health questionnaire
              window.location.href = 'health-form.html';
            } else {
              // Redirect to Client dashboard
              window.location.href = 'client.html';
            }
          } else {
            // Unknown user type, redirect to login
            alert('User type not found. Please contact support.');
            window.location.href = 'login.html';
          }
        } else {
          // User document doesn't exist, redirect to login
          alert('User data not found. Please sign up again.');
          window.location.href = 'login.html';
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
        alert('Error loading user data. Please try again.');
        window.location.href = 'login.html';
      });
  } else {
    // User is not signed in, redirect to login
    window.location.href = 'login.html';
  }
});
