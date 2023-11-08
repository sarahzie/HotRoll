<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['price']) && isset($_POST['name'])){
        $price = $_POST["price"];
        $name = $_POST["name"];
        echo "Data received from sessionStorage 1: " . $price . "<br>";
        echo "Data received from sessionStorage 2: " . $name;
    }
    else{
        echo "One or both data keys are missing.";
    }
    
} else {
    echo "No data received.";
}

require "../vendor/autoload.php";

$stripe_secret_key = "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";

\Stripe\Stripe::setApiKey($stripe_secret_key);

$checkout_session = \Stripe\Checkout\Session::create([
    "mode" => "payment",
    "success_url" => "http://localhost/HotRoll/Checkout/success.php",
    "cancel_url" => "http://localhost/HotRoll/Checkout/index.php",
    "locale" => "auto",
    "line_items" => [
        [
            "quantity" => 1,
            "price_data" => [
                "currency" => "myr",
                "unit_amount" => 2000,
                "product_data" => [
                    "name" => "Borgir"
                ]
            ]
        ]      
    ]
]);

http_response_code(303);
header("Location: " . $checkout_session->url);

//var price = sessionStorage.getItem('price');
//var name = sessionStorage.getItem('name');