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
    //Get Read
    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        $result = require 'read.php';
        sendResponse($result);
        exit;
    }
    //post Create
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $result = require 'create.php';
        sendResponse($result);
        exit;
    }
    //put Update 
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') { //step-13
        $result = require 'update.php';
        sendResponse($result);
        exit;
    }

    //Delete = Remove a row
    if ($_SERVER['REQUEST_METHOD'] == 'DELETE') { //step-14
        $result = require 'delete.php';
        sendResponse($result);
        exit;
    }
}
