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
var count;
var no;
function SelectAllData(){
    document.getElementById("tbody1").innerHTML = "";
    no = 0;
    count = 0;
    firebase.database().ref('menu').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var id = CurrentRecord.val().id;
                var name = CurrentRecord.val().name;
                var price = CurrentRecord.val().price;
                AddItemsToTable(id,name,price);
                count++;
            }
        );
    });
}

window.onload = SelectAllData;

//<!-- Button trigger modal reference for copy pasting -->
//<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes(null)">Add new Record</button>

//Filling the Table

var menuList = [];

function AddItemsToTable(id,name,price){
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    menuList.push([id,name,price]);
    td1.innerHTML = ++no;
    td2.innerHTML = name;
    td3.innerHTML = "RM" + price;
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    var ControlDiv = document.createElement("div");
    ControlDiv.innerHTML = '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes('+no+')">Edit Record</button>'

    trow.appendChild(ControlDiv);
    tbody.appendChild(trow);
}

var ModID = document.getElementById('IDMod');
var ModName = document.getElementById('NameMod');
var ModPrice = document.getElementById('PriceMod');
var ButtonModAdd = document.getElementById('AddModButton');
var ButtonModDelete = document.getElementById('DeleteModButton');
var ButtonModEdit = document.getElementById('EditModButton');


function FillTboxes(index){
    if(index==null){
        ModID.value = "";
        ModName.value = "";
        ModPrice.value = "";
        ButtonModAdd.style.display = 'inline-block';
        ButtonModDelete.style.display = 'none';
        ButtonModEdit.style.display = 'none';
        ModID.disabled = false;
    }

    else{
        --index;
        ModID.value = menuList[index][0];
        ModName.value = menuList[index][1];
        ModPrice.value = menuList[index][2];
        ButtonModAdd.style.display = 'none';
        ButtonModDelete.style.display = 'inline-block';
        ButtonModEdit.style.display = 'inline-block';
        ModID.disabled = true;
    }
}

function AddMenu(){
    firebase.database().ref("menu/"+ ModID.value).set(
        {
            id: ModID.value,
            name: ModName.value,
            price: ModPrice.value
        },
        (error) => {
            if(error){
                alert('record was not added, there was an error');
            }
            else{
                alert("record was added");
                location.reload();
            }
        }
    )
}

function EditMenu(){
    firebase.database().ref("menu/"+ ModID.value).update(
        {
            id: ModID.value,
            name: ModName.value,
            price: ModPrice.value
        },
        (error) => {
            if(error){
                alert('record was not updated, there was an error');
            }
            else{
                alert("record was updated");
                location.reload();
            }
        }
    )
}

function DeleteMenu(){
    firebase.database().ref("menu/"+ ModID.value).remove().then(
        function(){
            alert("record was deleted");
            location.reload();
        }
    )
}
