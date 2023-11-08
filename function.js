

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
const adminUIDList = [];
const staffUIDList = [];
var orderList = [];

function SelectAllData(){
  document.getElementById("tbody1").innerHTML = "";
  no = 0;
  count = 0;
  firebase.database().ref('order').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
              if (auth.currentUser.uid==CurrentRecord.val().uid){
                var order_id = CurrentRecord.val().id;
                var item = CurrentRecord.val().item;
                var price = CurrentRecord.val().price;
                var date = CurrentRecord.val().date;
                var status = CurrentRecord.val().status;
                AddItemsToTable(order_id,item,price,date,status);
                count++; 
              }
            }
        );
    });
}

firebase.database().ref('staff').once('value',
      function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
              var uid = CurrentRecord.val().uid;
              console.log(uid);
              staffUIDList.push(uid);
            }
        );
});

firebase.database().ref('admin').once('value',
      function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
              var uid = CurrentRecord.val().uid;
              console.log(uid);
              adminUIDList.push(uid);
            }
        );
});

function compareUIDAdmin(uid){
  if(adminUIDList.includes(uid)==true){
    return true;
  }
  return false;
}

function compareUIDStaff(uid){
  if(staffUIDList.includes(uid)==true){
    return true;
  }
  return false;
}

// register function
function register () {
    email = document.getElementById('email_register').value
    password = document.getElementById('password_register').value
    first_name = document.getElementById('first_name').value
    last_name = document.getElementById('last_name').value

    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password entered is invalid')
      return
      // Don't continue running the code
    }

    auth.createUserWithEmailAndPassword(email, password)
     .then(function() {

        var user = auth.currentUser
        var database_ref = database.ref()
        
        //Create user data
        var user_data = {
        email : email,
        first_name : first_name,
        last_name : last_name,
        last_login : Date.now(),
        uid : uid
        }
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data)
        
     })
     .catch(function(error){
        var error_code = error.code;
        var error_message = error.message;

        alert (error_message)
     })

     firebase.auth().currentUser.sendEmailVerification(email)
      .then(() => {
        // Email verification sent!
        alert('Verification email sent')
        // ...
      })
      .catch(function(error){
        var error_code = error.code;
        var error_message = error.message;

        alert (error_message)
     });
}

// Set up our login function
function login () {
    // Get all our input fields
    email = document.getElementById('email_login').value
    password = document.getElementById('password_login').value
  
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
      
      if (compareUIDAdmin(user.uid)==true){
        database_ref.child('admin/' + user.uid).update(user_data);
        alert('Admin Logged In!!')
        window.location = "Admin/Homepage/homepage.html"
      }

      else if (compareUIDStaff(user.uid)==true){
        database_ref.child('staff/' + user.uid).update(user_data);
        alert('Staff Logged In!!')
        window.location = "Admin/Homepage/homepage.html"
      }

      else{
        database_ref.child('users/' + user.uid).update(user_data);
        alert('User Logged In!!');
        window.location = "index.html";
      }
      // Push to Firebase Database
      
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
}
  

function validate_email(email){
    var expression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

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
        return false
    }else {
        return true
    }
}

function validate_field(field){
    if (field == null){
        return false
    }

    if (field <= 0){
        return false
    }else{
        return true
    }
}

function logout(){
    firebase.auth().signOut().then(() => {
        alert("User Logged Out Successfully")   
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    window.location.href = "LogIn.html";
}

function edit_profile(){
  email = document.getElementById('email_change').value
  first_name = document.getElementById('firstName_change').value
  last_name = document.getElementById('lastName_change').value

  var user = auth.currentUser
  var database_ref = database.ref()
      
  //Create user data
  var user_data = {
  email : email,
  first_name : first_name,
  last_name : last_name,
  last_login : Date.now()
  }

  database_ref.child('users/' + user.uid).update(user_data
    , (error) => {
      if (error){
        alert ('Data was not saved')
      } else {
        alert('Profile changed successfully')
      }
    })
  
  user.updateEmail(email).then(() => {
  // Update successful
  // ...
  }).catch((error) => {
    // An error occurred
    // ...
  });

  newPassword = document.getElementById('password_change').value

  user.updatePassword(newPassword).then(() => {
    // Update successful.
  }).catch((error) => {
    // An error ocurred
    var error_message = error.message
    alert(error_message)
    // ...
  });
}

function reset_password(){
  email = document.getElementById('user_email').value

  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    // Password reset email sent!
    alert ('Password reset email sent')
    // ..
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
}
const user = auth.currentUser;
function profile(){
  if (user !== null){
    console.log(user);
    var uid = user.uid;
    if (compareUIDAdmin(uid)==true){
      firebase.database().ref('admin/' + uid).once('value'),(snapshot)=>{
        var email = snapshot.val().email;
        var first_name = snapshot.val().first_name;
        var last_name = snapshot.val().last_name;

        document.getElementById('email').innerHTML = email;
        document.getElementById('email_change').value = email;

        document.getElementById('firstName').innerHTML = first_name;
        document.getElementById('firstName_change').value = first_name;

        document.getElementById('lastName').innerHTML = '&nbsp' + last_name;
        document.getElementById('lastName_change').value = last_name;
      }
      return;
    }
    else if(compareUIDStaff(uid)==true){
      firebase.database().ref('staff/' + uid).once('value'),(snapshot)=>{
        var email = snapshot.val().email;
        var first_name = snapshot.val().first_name;
        var last_name = snapshot.val().last_name;

        document.getElementById('email').innerHTML = email;
        document.getElementById('email_change').value = email;

        document.getElementById('firstName').innerHTML = first_name;
        document.getElementById('firstName_change').value = first_name;

        document.getElementById('lastName').innerHTML = '&nbsp' + last_name;
        document.getElementById('lastName_change').value = last_name;
      }
      return;
    }
    else{
      firebase.database().ref('users/' + uid).once('value'),(snapshot)=>{
        var email = snapshot.val().email;
        var first_name = snapshot.val().first_name;
        var last_name = snapshot.val().last_name;

        document.getElementById('email').innerHTML = email;
        document.getElementById('email_change').value = email;

        document.getElementById('firstName').innerHTML = first_name;
        document.getElementById('firstName_change').value = first_name;

        document.getElementById('lastName').innerHTML = '&nbsp' + last_name;
        document.getElementById('lastName_change').value = last_name;
      }
    }
  }
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      if (compareUIDAdmin(uid)==true){
        firebase.database().ref('admin/' + uid).once('value'),(snapshot)=>{
          var email = snapshot.val().email;
          var first_name = snapshot.val().first_name;
          var last_name = snapshot.val().last_name;

          document.getElementById('email').innerHTML = email;
          document.getElementById('email_change').value = email;

          document.getElementById('firstName').innerHTML = first_name;
          document.getElementById('firstName_change').value = first_name;

          document.getElementById('lastName').innerHTML = '&nbsp' + last_name;
          document.getElementById('lastName_change').value = last_name;
        }
        return;
      }
      else if(compareUIDStaff(uid)==true){
        firebase.database().ref('staff/' + uid).once('value'),(snapshot)=>{
          var email = snapshot.val().email;
          var first_name = snapshot.val().first_name;
          var last_name = snapshot.val().last_name;

          document.getElementById('email').innerHTML = email;
          document.getElementById('email_change').value = email;

          document.getElementById('firstName').innerHTML = first_name;
          document.getElementById('firstName_change').value = first_name;

          document.getElementById('lastName').innerHTML = '&nbsp' + last_name;
          document.getElementById('lastName_change').value = last_name;
        }
        return;
      }
      else{
        firebase.database().ref('users/' + uid).once('value'),(snapshot)=>{
          var email = snapshot.val().email;
          var first_name = snapshot.val().first_name;
          var last_name = snapshot.val().last_name;

          document.getElementById('email').innerHTML = email;
          document.getElementById('email_change').value = email;

          document.getElementById('firstName').innerHTML = first_name;
          document.getElementById('firstName_change').value = first_name;

          document.getElementById('lastName').innerHTML = '&nbsp' + last_name;
          document.getElementById('lastName_change').value = last_name;
        }
      }
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      // var firstNameRef = firebase.database().ref('users/' + uid + '/first_name');
      // firstNameRef.on('value', (snapshot) => {
      //   var firstNameData = snapshot.val();
      //   document.getElementById('firstName').innerHTML = firstNameData
      //   document.getElementById('firstName_change').value = firstNameData
      // });
      // var lastNameRef = firebase.database().ref('users/' + uid + '/last_name');
      // lastNameRef.on('value', (snapshot) => {
      //   var lastNameData = snapshot.val();
      //   document.getElementById('lastName').innerHTML = '&nbsp' + lastNameData
      //   document.getElementById('lastName_change').value = lastNameData
      // });
      // var lastNameRef = firebase.database().ref('users/' + uid + '/email');
      // lastNameRef.on('value', (snapshot) => {
      //   var emailData = snapshot.val();
      //   document.getElementById('email').innerHTML = emailData
      //   document.getElementById('email_change').value = emailData
      // });
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

window.onload = SelectAllData;

function AddItemsToTable(order_id,item,price,date,status){
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    orderList.push([order_id,item,price,date,status]);

    td1.innerHTML = ++no;
    td2.innerHTML = order_id;
    td4.innerHTML = item;
    td5.innerHTML = price;
    td6.innerHTML = date;
    td7.innerHTML = status;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);
    tbody.appendChild(trow);
}
