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
var uid;
function SelectAllData(){
    document.getElementById("tbody1").innerHTML = "";
    no = 0;
    firebase.database().ref('users').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var email = CurrentRecord.val().email;
                var first_name = CurrentRecord.val().first_name;
                var last_name = CurrentRecord.val().last_name;
                var last_login = CurrentRecord.val().last_login;
                uid = CurrentRecord.val().uid;
                AddItemsToTable(uid,email,first_name,last_name,last_login);
                count++;
            }
        );
    });
}

window.onload = SelectAllData;

//<!-- Button trigger modal reference for copy pasting -->
//<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes(null)">Add new Record</button>

//Filling the Table

var customerList = [];

function AddItemsToTable(uid,email,first_name,last_name,last_login){
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    customerList.push([uid,email,first_name,last_name,last_login]);
    td1.innerHTML = ++no;
    td2.innerHTML = email;
    td3.innerHTML = first_name;
    td4.innerHTML = last_name;
    td5.innerHTML = last_login;
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    var ControlDiv = document.createElement("div");
    //ControlDiv.innerHTML = '<button type="button" class="btn btn-success my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes(null)">Add new Record</button>'
    ControlDiv.innerHTML = '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes('+no+')">Edit Record</button>'

    trow.appendChild(ControlDiv);
    tbody.appendChild(trow);
}

var ModUID = document.getElementById('UIDMod');
var ModEmail = document.getElementById('EmailMod');
var ModFirstName = document.getElementById('FirstNameMod');
var ModLastName = document.getElementById('LastNameMod');
var ButtonModAdd = document.getElementById('AddModButton');
var ButtonModDelete = document.getElementById('DeleteModButton');
var ButtonModEdit = document.getElementById('EditModButton');


function FillTboxes(index){
    if(index==null){
        ModUID.value = "";
        ModEmail.value = "";
        ModFirstName.value = "";
        ModLastName.value = "";
        ButtonModAdd.style.display = 'inline-block';
        ButtonModDelete.style.display = 'none';
        ButtonModEdit.style.display = 'none';
    }

    else{
        --index;
        ModUID.value = customerList[index][0];
        ModEmail.value = customerList[index][1];
        ModFirstName.value = customerList[index][2];
        ModLastName.value = customerList[index][3];
        ButtonModAdd.style.display = 'none';
        ButtonModDelete.style.display = 'inline-block';
        ButtonModEdit.style.display = 'inline-block';
    }
}

function AddCustomer(){
    firebase.database().ref("users/"+ ModUID.value).set(
        {
            email: ModEmail.value,
            first_name: ModFirstName.value,
            last_name: ModLastName.value,
            uid: ModUID.value
        },
        (error) => {
            if(error){
                alert('record was not added, there was an error');
            }
            else{
                alert("record was added");
                location.reload();
                $("exampleModalCenter").modal('hide');
            }
        }
    )
}

function EditCustomer(){
    firebase.database().ref("users/"+ ModUID.value).update(
        {
            first_name: ModFirstName.value,
            last_name: ModLastName.value
        },
        (error) => {
            if(error){
                alert('record was not updated, there was an error');
            }
            else{
                alert("record was updated");
                location.reload();
                $("exampleModalCenter").modal('hide');
            }
        }
    )
}

function DeleteCustomer(){
    firebase.database().ref("users/"+ ModUID.value).remove().then(
        function(){
            alert("record was deleted");
            location.reload();
            $("exampleModalCenter").modal('hide');
        }
    );
}