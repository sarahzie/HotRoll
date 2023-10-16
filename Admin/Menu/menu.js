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
    firebase.database().ref('menu').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var name = CurrentRecord.val().name;
                var price = CurrentRecord.val().price;
                AddItemsToTable(name,price);
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

function AddItemsToTable(name,price){
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    menuList.push([name,price]);
    td1.innerHTML = ++no;
    td2.innerHTML = name;
    td3.innerHTML = "RM" + price;
    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);

    var ControlDiv = document.createElement("div");
    ControlDiv.innerHTML = '<button type="button" class="btn btn-success my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes(null)">Add new Record</button>'
    ControlDiv.innerHTML += '<button type="button" class="btn btn-primary my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes('+no+')">Edit Record</button>'

    trow.appendChild(ControlDiv);
    tbody.appendChild(trow);
}

var ModName = document.getElementById('NameMod');
var ModPrice = document.getElementById('PriceMod');
var ButtonModAdd = document.getElementById('AddModButton');
var ButtonModDelete = document.getElementById('DeleteModButton');
var ButtonModEdit = document.getElementById('EditModButton');


function FillTboxes(index){
    if(index==null){
        ModName.value = "";
        ModPrice.value = "";
        ButtonModAdd.style.display = 'inline-block';
        ButtonModDelete.style.display = 'none';
        ButtonModEdit.style.display = 'none';
    }

    else{
        --index;
        ModName.value = menuList[index][0];
        ModPrice.value = menuList[index][1];
        ButtonModAdd.style.display = 'none';
        ButtonModDelete.style.display = 'inline-block';
        ButtonModEdit.style.display = 'inline-block';
    }
}

function AddMenu(){
    firebase.database().ref("menu/"+ count).set(
        {
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
                $("exampleModalCenter").modal('hide');
            }
        }
    )
}

function EditMenu(){
    firebase.database().ref("menu/"+ count).update(
        {
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
                $("exampleModalCenter").modal('hide');
            }
        }
    )
}

function DeleteMenu(){
    firebase.database().ref("menu/"+ count).remove().then(
        function(){
            alert("record was deleted");
            location.reload();
            $("exampleModalCenter").modal('hide');
        }
    )
}