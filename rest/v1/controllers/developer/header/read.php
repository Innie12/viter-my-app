<?php
// check database connection
$conn = null;
$conn = checkDatabaseConnection();
// use models
$header = new Header($conn);


if (empty($_GET)) {
    $query = checkReadAll($header);
    http_response_code(200);
    getQueriedData($query);
}
