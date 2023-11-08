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

const auth = firebase.auth();

var price = sessionStorage.getItem('price');
var name = sessionStorage.getItem('name');


function AddOrder(){
    const id = generate6DigitID();
    const date = formatDateAsDDMMYY();
    firebase.database().ref("order/"+ id).set(
        {
            id: id,
            uid: auth.currentUser.uid,
            item: sessionStorage.getItem('name'),
            price: price,
            date: date,
            status: "Pending"
        },
        (error) => {
            if(error){
                alert('record was not added, there was an error');
            }
            else{
                window.location.href = "https://buy.stripe.com/test_00g9Dq5gPbJU5dCfYY";
            }
        }
    )
}

function generate6DigitID() {
    // Generate a random number between 100,000 and 999,999 (inclusive)
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    // Convert the number to a 6-digit string
    const sixDigitID = randomNumber.toString();
    return sixDigitID;
}

function formatDateAsDDMMYY() {
    const currentDate = new Date();
  
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Add 1 to account for the zero-based month
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year
  
    // Ensure the day and month are two digits by adding leading zeros if necessary
    const formattedDay = (day < 10 ? '0' : '') + day;
    const formattedMonth = (month < 10 ? '0' : '') + month;
  
    // Combine the components into the DDMMYY format
    const formattedDate = `${formattedDay}${formattedMonth}${year}`;
  
    return formattedDate;
}