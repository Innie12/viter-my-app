<?php
// db variables
$conn = null;
// connection to db and store in conn variable
$conn = checkDatabaseConnection();

// use model
$contact = new Contact($conn);

// no id shall pass
if (array_key_exists('id', $_GET)) {
    checkEndpoint();
}

//check data
checkPayload($data);


$contact->contact_fullname = checkIndex($data, 'contact_fullname');
$contact->contact_email = checkIndex($data, 'contact_email');
$contact->contact_message = checkIndex($data, 'contact_message');
$contact->contact_created = date("Y-m-d H:i:s");
$contact->contact_updated = date("Y-m-d H:i:s");

// Validation - after this go to Core Funtion - Step-1
isEmailExist($contact, $contact->contact_email);

$query = checkCreate($contact);
returnSuccess($contact, 'contact create', $query);
