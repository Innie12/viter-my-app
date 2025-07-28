<?php

$conn = null;
$conn = checkDatabaseConnection();

// use models
$webServices = new WebServices($conn);

if (array_key_exists('id', $_GET)) {
    $webServices->web_services_aid = $_GET['id'];

    checkId($webServices->web_services_aid);
    $query = checkDelete($webServices);
    http_response_code(200);
    returnSuccess($webServices, "web services delete", $query);
}

checkEndpoint();
