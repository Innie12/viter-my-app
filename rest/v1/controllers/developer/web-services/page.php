<?php

// LOAD PAGE STEP 1 - after this go to  CORE FUNCTION


// SET HTTP HEADER
require '../../../core/header.php';
// USE NEEDED FUNCTIONS
require '../../../core/functions.php';
// USE MODELS
require '../../../models/developer/web-services/WebServices.php';
$conn = null;
$conn = checkDatabaseConnection();
// GET PAYLOAD
$body = file_get_contents("php://input");
$data = json_decode($body, true);

$WebServices = new WebServices($conn);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if (array_key_exists('start', $_GET)) {
        $WebServices->web_services_start = $_GET['start'];
        $WebServices->web_services_total = 5;

        checkLimitId($WebServices->web_services_start, $WebServices->web_services_total);

        $query = checkReadLimit($WebServices);
        $total_result = checkReadAll($WebServices);
        http_response_code(200);

        checkReadQuery(
            $query,
            $total_result,
            $WebServices->web_services_total,
            $WebServices->web_services_start,
        );
    }
}

checkEndpoint();
