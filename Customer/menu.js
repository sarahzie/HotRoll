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
    tbody.appendChild(trow);
}

var ModName = document.getElementById('NameMod');
var ModPrice = document.getElementById('PriceMod');