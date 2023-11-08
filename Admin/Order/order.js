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

function SelectAllData(){
    document.getElementById("tbody1").innerHTML = "";
    no = 0;
    count = 0;
    firebase.database().ref('order').once('value',
    function(AllRecords){
        AllRecords.forEach(
            function(CurrentRecord){
                var order_id = CurrentRecord.val().id;
                var uid = CurrentRecord.val().uid;
                var item = CurrentRecord.val().item;
                var price = CurrentRecord.val().price;
                var date = CurrentRecord.val().date;
                var status = CurrentRecord.val().status;
                AddItemsToTable(order_id,uid,item,price,date,status);
                count++;   
            }
        );
    });
}

window.onload = SelectAllData;
var orderList = [];

function AddItemsToTable(order_id,uid,item,price,date,status){
    var tbody = document.getElementById('tbody1');
    var trow = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    var td4 = document.createElement('td');
    var td5 = document.createElement('td');
    var td6 = document.createElement('td');
    var td7 = document.createElement('td');
    orderList.push([order_id,uid,item,price,date,status]);

    td1.innerHTML = ++no;
    td2.innerHTML = order_id;
    td3.innerHTML = uid;
    td4.innerHTML = item;
    td5.innerHTML = price;
    td6.innerHTML = date;
    td7.innerHTML = status;

    trow.appendChild(td1);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);
    trow.appendChild(td6);
    trow.appendChild(td7);

    var ControlDiv = document.createElement("div");
    ControlDiv.innerHTML = '<button type="button" class="btn btn-success my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="acceptOrder('+no+')">Accept Order</button>';
    ControlDiv.innerHTML += '<button type="button" class="btn btn-danger my-2 ml-2" data-toggle="modal" data-target="#exampleModalCenter" onclick="cancelOrder('+no+')">Cancel Order</button>';

    trow.appendChild(ControlDiv);
    tbody.appendChild(trow);
}

function acceptOrder(index){
    --index;
    orderID = orderList[index][0]
    firebase.database().ref("order/"+ orderID).update(
        {
            status: "Accepted"
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

function cancelOrder(index){
    --index;
    orderID = orderList[index][0]
    firebase.database().ref("order/"+ orderID).remove().then(
        function(){
            alert("order was canceled");
            location.reload();
        }
    )
}