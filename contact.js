const firebaseConfig = {
    apiKey: "AIzaSyAqGDm4BApwNxuwAYRJlrzlXhx1LqHroZ8",
    authDomain: "hotroll-90290.firebaseapp.com",
    databaseURL: "https://hotroll-90290-default-rtdb.firebaseio.com",
    projectId: "hotroll-90290",
    storageBucket: "hotroll-90290.appspot.com",
    messagingSenderId: "820474583676",
    appId: "1:820474583676:web:3f44f7f0554cd4c29287f9"
}
firebase.initializeApp(firebaseConfig);

var feedbackForm = document.getElementById("feedbackForm");

feedbackForm.addEventListener("submit", (e)=>{
    e.preventDefault();

    var name = document.getElementById("fullName").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var id = Date.now();
    console.log(id);
    addFeedback(id,name,email,message);
});

function addFeedback(id,name,email,message){
    firebase.database().ref("feedback/" + id).set(
        {
            id: id,
            name: name,
            email: email,
            message: message
        },
        (error) => {
            if(error){
                alert('Feedback was not sent, there was an error');
            }
            else{
                alert("Feedback successfully sent");
            }
        }
    )
}