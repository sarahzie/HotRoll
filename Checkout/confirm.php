<html>
    <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
         <link rel="stylesheet" href="confirm.css">
	</head>
    <body>

			<div class="iphone">
			  <header class="header">
				<h1>Checkout</h1>
			  </header>

				<div>
				  <h2>Menu</h2>

				  <div class="card">
					<address>
					  <h2 id="itemName">Name</h2>
					<h2 id="itemPrice">Price</h2>
					</address>
				  </div>
					<div>
					    <br><input type="submit" class="button button--full" value="Back to Menu" onclick="window.location.href='../Customer/menu.html';"></button>
						<br><input type="submit" class="button button--full" value="Proceed to Checkout" onclick="window.location.href='https://buy.stripe.com/test_00g9Dq5gPbJU5dCfYY';"></button>
					</div>
				</div>
				</div>
        
    </body>
    <script>
        var price = sessionStorage.getItem('price');
        var name = sessionStorage.getItem('name');
        document.getElementById('itemName').innerHTML = name;
        document.getElementById('itemPrice').innerHTML = 'RM'+ price;
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