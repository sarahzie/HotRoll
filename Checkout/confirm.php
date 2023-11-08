<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    </head>
    <body>
        <form method="post" action="checkout.php">
            <h2 id="itemName">Name</h2>
            <h2 id="itemPrice">Price</h2>
            <input type="submit" class="btn btn-danger" value="Proceed to Checkout"></button>
        </form>
    </body>
    <script>
        var price = sessionStorage.getItem('price');
        var name = sessionStorage.getItem('name');
        document.getElementById('itemName').innerHTML = name;
        document.getElementById('itemPrice').innerHTML = price;
    </script>
    <script>
        // Retrieve data from sessionStorage
        var dataToRetrieve1 = sessionStorage.getItem('price');
        var dataToRetrieve2 = sessionStorage.getItem('name');

        // Send the data to the PHP script using AJAX
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'checkout.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log('Data received from PHP:');
                console.log('Data 1: ' + dataToRetrieve1);
                console.log('Data 2: ' + dataToRetrieve2);
            }
        };
        xhr.send('price=' + dataToRetrieve1 + '&name=' + dataToRetrieve2);
    </script>
    <script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    </script>
</html>
<?php

echo "<script>
var price = sessionStorage.getItem('price');
var name = sessionStorage.getItem('name');
console.log(name,price);
</script>";