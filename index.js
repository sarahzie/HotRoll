const firebaseConfig = {
    apiKey: "AIzaSyAqGDm4BApwNxuwAYRJlrzlXhx1LqHroZ8",
    authDomain: "hotroll-90290.firebaseapp.com",
    databaseURL: "https://hotroll-90290-default-rtdb.firebaseio.com",
    projectId: "hotroll-90290",
    storageBucket: "hotroll-90290.appspot.com",
    messagingSenderId: "820474583676",
    appId: "1:820474583676:web:3f44f7f0554cd4c29287f9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();
const user = firebase.auth().currentUser;
const adminUIDList = [];

window.onload = check();

function check(){
    firebase.database().ref('staff').once('value',
      function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
              var uid = CurrentRecord.val().uid;
              console.log(uid);
              adminUIDList.push(uid);
              confirm(uid);
            }
        );
    });
}

function confirm(uid){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(firebase.auth().currentUser.uid);
          if (adminUIDList.includes(uid)==true){
            alert("Admin logged in");
            window.location = "Admin/Homepage/homepage.html";
          }
          else{
            alert('error')
          }
          // User is signed in.
        } else {
          // No user is signed in.
        }
    });
}