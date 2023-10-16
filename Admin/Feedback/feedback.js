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

var count = 0;
var no;
function SelectAllData(){
    document.getElementById("tbody1").innerHTML = "";
    no = 0;
    firebase.database().ref('feedback').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var id = CurrentRecord.val().id;
                var name = CurrentRecord.val().name;
                var email = CurrentRecord.val().email;
                var message = CurrentRecord.val().message;
                AddItemsToTable(id,name,email,message);
                count++;
            }
        );
    });
}

window.onload = SelectAllData;

//<!-- Button trigger modal reference for copy pasting -->
//<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes(null)">Add new Record</button>

//Filling the Table

var feedbackList = [];

function AddItemsToTable(id,name,email,message){
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');

    feedbackList.push([id,name,email,message]);
    td1.innerHTML = ++no;
    td2.innerHTML = id;
    td3.innerHTML = name;
    
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    var ViewDiv = document.createElement('div');
    ViewDiv.innerHTML = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes('+no+')">View Details</button>'
    trow.appendChild(ViewDiv);

    tbody.appendChild(trow);
}

function FillTboxes(index){
    --index;
    ModID.innerHTML ="Feedback ID: " + feedbackList[index][0];
    ModName.innerHTML = "Name: " + feedbackList[index][1];
    ModEmail.innerHTML = "Email: " + feedbackList[index][2];
    ModMessage.innerHTML = "Message: <br>" + feedbackList[index][3];
}


//<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">View Details</button>
