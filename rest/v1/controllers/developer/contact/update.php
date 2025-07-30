<?php
//declare db variable
$conn = null;
//use db
$conn = checkDatabaseConnection();
//use model
$contact = new Contact($conn);

if (array_key_exists('id', $_GET)) {
    checkPayload($data);
    $contact->contact_aid = $_GET['id'];
    $contact->contact_fullname = checkIndex($data, 'contact_fullname');
    $contact->contact_email = checkIndex($data, 'contact_email');
    $contact->contact_message = checkIndex($data, 'contact_message');
    $contact->contact_updated = date("Y-m-d H:i:s");

    // Validation -> after this go to modelAddServices
    $contact_email_old = $data['contact_email_old'];
    compareEmail($contact, $contact_email_old, $contact->contact_email);

    $query = checkUpdate($contact);
    returnSuccess($contact, 'contact update', $query);
}

checkEndpoint();
