const firebaseConfig = {
    apiKey: "AIzaSyAqGDm4BApwNxuwAYRJlrzlXhx1LqHroZ8",
    authDomain: "hotroll-90290.firebaseapp.com",
    databaseURL: "https://hotroll-90290-default-rtdb.firebaseio.com",
    projectId: "hotroll-90290",
    storageBucket: "hotroll-90290.appspot.com",
    messagingSenderId: "820474583676",
    appId: "1:820474583676:web:3f44f7f0554cd4c29287f9"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
const adminUIDList = [];
const staffUIDList = [];

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

function edit_profile(){
    email = document.getElementById('email_change').value
    first_name = document.getElementById('firstName_change').value
    last_name = document.getElementById('lastName_change').value
  
    var user = auth.currentUser;
    var database_ref = database.ref();
    var uid = user.uid;
        
    //Create user data
    var user_data = {
        email : email,
        first_name : first_name,
        last_name : last_name,
        last_login : Date.now()
    }
    
    if (compareUIDAdmin(uid)==true){
        database_ref.child('admin/' + user.uid).update(user_data
            ,(error) => {
                if (error){
                    alert ('Data was not saved')
                } else {
                    alert('Profile changed successfully')
                }
            })
    }

    else if(compareUIDStaff(uid)==true){
        database_ref.child('staff/' + user.uid).update(user_data
            ,(error) => {
                if (error){
                    alert ('Data was not saved')
                } else {
                    alert('Profile changed successfully')
                }
            })
    }
    
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

function profile(){
    var uid = auth.currentUser.uid;
    if (compareUIDAdmin(uid)==true){
        var firstNameRef = firebase.database().ref('admin/' + uid + '/first_name');
            firstNameRef.on('value', (snapshot) => {
                var firstNameData = snapshot.val();
                document.getElementById('firstName').innerHTML = firstNameData;
                document.getElementById('firstName_change').value = firstNameData;
            });
        var lastNameRef = firebase.database().ref('admin/' + uid + '/last_name');
            lastNameRef.on('value', (snapshot) => {
                var lastNameData = snapshot.val();
                document.getElementById('lastName').innerHTML = '&nbsp' + lastNameData;
                document.getElementById('lastName_change').value = lastNameData;
            });
        var lastNameRef = firebase.database().ref('admin/' + uid + '/email');
            lastNameRef.on('value', (snapshot) => {
                var emailData = snapshot.val();
                document.getElementById('email').innerHTML = emailData;
                document.getElementById('email_change').value = emailData;
            });
    }

    else if (compareUIDStaff(uid)==true){
        var firstNameRef = firebase.database().ref('staff/' + uid + '/first_name');
            firstNameRef.on('value', (snapshot) => {
                var firstNameData = snapshot.val();
                document.getElementById('firstName').innerHTML = firstNameData;
                document.getElementById('firstName_change').value = firstNameData;
            });
        var lastNameRef = firebase.database().ref('staff/' + uid + '/last_name');
            lastNameRef.on('value', (snapshot) => {
                var lastNameData = snapshot.val();
                document.getElementById('lastName').innerHTML = '&nbsp' + lastNameData;
                document.getElementById('lastName_change').value = lastNameData;
            });
        var lastNameRef = firebase.database().ref('staff/' + uid + '/email');
            lastNameRef.on('value', (snapshot) => {
                var emailData = snapshot.val();
                document.getElementById('email').innerHTML = emailData;
                document.getElementById('email_change').value = emailData;
            });
    }
}

function logout(){
    firebase.auth().signOut().then(() => {
        alert("User Logged Out Successfully")   
        // Sign-out successful.
    }).catch((error) => {
        // An error happened.
    });
    window.location.href = "../../LogIn.html";
}

setTimeout(function(){
    //your code here
    profile();
   }, 3000);
 