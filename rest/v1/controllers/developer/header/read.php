<?php
// check database connection
$conn = null;
$conn = checkDatabaseConnection();
// use models
$header = new header($conn);

// if (array_key_exist('id', $_GET)){
//     $webServices->
// }

if (empty($_GET)) {
    $query = checkReadAll($header);
    http_response_code(200);
    getQueriedData($query);
}
