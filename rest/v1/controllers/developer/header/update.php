<?php
//declare db variable
$conn = null;
//use db
$conn = checkDatabaseConnection();
//use model
$header = new Header($conn);

if (array_key_exists('id', $_GET)) {
    checkPayload($data);

    $header->header_aid = $_GET['id'];
    $header->header_name = checkIndex($data, 'header_name');
    $header->header_link = $data['header_link'];
    $header->header_updated = date("Y-m-d H:i:s");

    $query = checkUpdate($header);
    returnSuccess($header, 'header update', $query);
}

checkEndpoint();
