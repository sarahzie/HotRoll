

  // TODO: Add SDKs for Firebase products that you want to use

  // https://firebase.google.com/docs/web/setup#available-libraries


  // Your web app's Firebase configuration

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
const auth = firebase.auth()
const database = firebase.database()

// register function
function register(){
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    first_name = document.getElementById('first_name').value;
    last_name = document.getElementById('last_name').value;

    if (validate_email(email) == false || validate_password(password) == false){
        alert('Entered email or password is invalid~!');
        return;
    }

    auth.createUserWithEmailAndPassword (email, password)
     .then(function(){

        var user = auth.currentUser;
        alert('User Created');

        //Create user data
        var user_data = {
        email : email,
        first_name : first_name,
        last_name : last_name,
        last_login : Date.now()
        }
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)
     })
     .catch(function(error){
        var error_code = error.code;
        var error_message = error.message;
     })
}

// Set up our login function
function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password entered is invalid')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  

function validate_email(email){
    expression = /^[^@]+@\w+(\.\w+)+\w$/;

    if(expression.test(email) == true){
        // Email is valid
        return true;
    } else {
        return false;
    }
}

function validate_password(password){
    // Firebase only accepts passwords longer than 6 characters
    if (password < 6){
        return false;
    }else {
        return true;
    }
}

function validate_field(field){
    if (field == null){
        return false;
    }

    if (field <= 0){
        return false;
    }else{
        return true;
    }
}