<?php
// check database connection
$conn = null;
$conn = checkDatabaseConnection();
// use models
$contact = new ($conn);


if (empty($_GET)) {
    $query = checkReadAll($contact);
    http_response_code(200);
    getQueriedData($query);
}
