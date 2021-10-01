// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import {
  getDatabase,
  ref,
  get,
  child,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDTpHPEgQt04qWcekH2vpYfkdGFChCezPg",
  authDomain: "project-fr-d1263.firebaseapp.com",
  projectId: "project-fr-d1263",
  storageBucket: "project-fr-d1263.appspot.com",
  messagingSenderId: "375146527135",
  appId: "1:375146527135:web:66f6d88caf707d43b4a5aa",
};

const app =  initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

var name, email, sec, gen;

function Ready() {
  name = document.getElementById("nameBox").value;
  email = window.sessionStorage.getItem("email");
  sec = document.getElementById("section").value;
  gen = document.getElementById("gender").value;
}




document.getElementById("signOut").addEventListener("click", function () {
  signOut(auth)
  .then(() => {
    alert("Signed Out.");
    location.href="index.html";
  });
});


document.getElementById("insert").addEventListener("click", function () {
  Ready();
  
  set(ref(database, "account/" + window.sessionStorage.getItem("email").replace(".","")
  ),
  {
    AccountName: name,
    email: email,
    Section: sec,
    Gender: gen,
  }
  );

  alert("Successfully Saved.");

});

// ------------------- Selecting/Searching
// document.getElementById("select").onclick = function () {
//   Ready();
//   firebase
//     .database()
//     .ref("student/" + ID)
//     .on("value", function (snapshot) {
//       document.getElementById("nameBox").value = snapshot.val().NameOfStudent;
//       document.getElementById("section").value = snapshot.val().Section;
//       document.getElementById("gender").value = snapshot.val().Gender;
//     });
// };

// ------------Update---------
document.getElementById("update").addEventListener("click", function() {
  Ready();

  get(child(ref(database), `account/${window.sessionStorage.getItem("email").replace(".","")}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      document.getElementById("nameBox").value = snapshot.val().AccountName;
      document.getElementById("section").value = snapshot.val().Section;
      document.getElementById("gender").value = snapshot.val().Gender;
    }
  });
  // let emailTemp = email.replace(".","");
  // database(database)
  //   .ref("user/" + emailTemp)
  //   .update({
  //     AccountName: name,
  //     Section: sec,
  //     Gender: gen,
  //   });
});

//----------Delete-----------
document.getElementById("delete").addEventListener("click", function() {
 update(ref(database, "account/" + window.sessionStorage.getItem("email").replace(".", "")
  ), 
  {
    AccountName: "N/A",
    email: window.sessionStorage.getItem("email"),
    Section: "N/A",
    Gender: "N/A",
  }
 );

 alert("Successfully Deleted.")
 Ready();

  get(child(ref(database), `account/${window.sessionStorage.getItem("email").replace(".","")}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      document.getElementById("nameBox").value = snapshot.val().AccountName;
      document.getElementById("section").value = snapshot.val().Section;
      document.getElementById("gender").value = snapshot.val().Gender;
    }
  });
});

// document.getElementById("switch").addEventListener("click", function() {
//   location.href = "index.html";
// });

window.onload = function() {
  document.getElementById("email").value = window.sessionStorage.getItem("email");
  Ready();

  get(child(ref(database), `account/${window.sessionStorage.getItem("email").replace(".","")}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      document.getElementById("nameBox").value = snapshot.val().AccountName;
      document.getElementById("section").value = snapshot.val().Section;
      document.getElementById("gender").value = snapshot.val().Gender;
    }
  });
};

// function signUp(){
//       var email = document.getElementById("email");
//       var password = document.getElementById("password");
//       const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
//       promise.catch(e => alert(e.message));
//       location.href = "information.html";
//       alert("Signed Up");
      
//   } 

//   function signIn(){
//     var email = document.getElementById("email");
//     var password = document.getElementById("password");
//     const promise = signInWithEmailAndPassword(auth, email.value, password.value);
//     promise.catch(e => alert(e.message));
//     alert("Logged In : "+ email.value);
//     location.href = "information.html";    
//   }

//   function signOut(){
//       auth.signOut();
//       location.href = "index.html";
//       alert("Signed Out");
//   }

 

//   auth.onAuthStateChanged(function(user){
//       if(user){
//           var email = user.email;
//           alert("Logged in as: " + email);

//       }else{
//           alert("No active user");
//       }
//     })

// document.getElementById("signIn").addEventListener("click", signIn)
  
