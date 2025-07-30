<?php
//declare db variable
$conn = null;
//use db
$conn = checkDatabaseConnection();
//use model
$webServices = new WebServices($conn);

if (array_key_exists('id', $_GET)) {
    checkPayload($data);

    $webServices->web_services_aid = $_GET['id'];
    $webServices->web_services_name = checkIndex($data, 'web_services_name');
    $webServices->web_services_description = $data['web_services_description'];
    $webServices->web_services_image = $data['web_services_image'];
    $webServices->web_services_link = $data['web_services_link'];
    $webServices->web_services_text_url = $data['web_services_text_url'];
    $webServices->web_services_updated = date("Y-m-d H:i:s");

    // Validation -> after this go to modelAddServices
    $web_services_name_old = $data['web_services_name_old'];

    compareName($webServices, "", $webServices->web_services_name);


    $query = checkUpdate($webServices);
    returnSuccess($webServices, 'web services update', $query);
}

checkEndpoint();
