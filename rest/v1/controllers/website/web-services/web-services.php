<?php

// SET HTTP HEADER
require '../../../core/header.php';
// USE NEEDED FUNCTIONS
require '../../../core/functions.php';
// USE MODELS
require '../../../models/developer/web-services/WebServices.php';
// GET PAYLOAD
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
}
