<?php
require 'Database.php';
require 'Response.php';


function checkDatabaseConnection()
{
    try {
        $conn = Database::connectDb();
        return $conn;
    } catch (PDOException $ex) {
        $response = new Response();
        $data = [];
        $data['succes'] = true;
        $data['data'] = [];
        $data['count'] = 0;
        $data['type'] = 'invalid_request_error';
        $data['error'] = "Database Connection Failed.";
        $response->setData($data);
        $response->send();
        exit;
    }
}

function returnError($msg)
{
    $response = new Response();
    $data = [];
    $data['succes'] = true;
    $data['data'] = [];
    $data['count'] = 0;
    $data['message'] = $msg;
    $response->setData($data);
    $response->send();
    exit;
}

function getResultData($query)
{
    $data = $query->fetchAll();
    return $data;
}

function getQueriedData($query)
{
    $response = new Response();
    $data = [];
    $data['succes'] = true;
    $data['data'] = getResultData($query);
    $data['count'] = $query->rowCount();
    $data['dateNow'] = date('Y-m-d');
    $response->setData($data);
    $response->send();
    exit;
}

function checkQuery($query, $msg)
{
    // if query is false then do thia code
    // ! = FALSE ex is !$IsQuery == false
    if (!$query) {
        $response = new Response();
        $data = [];
        $data['succes'] = false;
        $data['error'] = $msg;
        $data['count'] = 0;
        $data['type'] = 'invalid_request_error';
        $data['dateNow'] = date('Y-m-d');
        $response->setData($data);
        $response->send();
        exit;
    }
}

function checkEndpoint()
{
    $response = new Response();
    $response->setSuccess(false);
    $error = [];
    $error['success'] = false;
    $error['code'] = '404';
    $error['error'] = 'Endpoint not found.';
    $response->setData($error);
    $response->send();
    exit;
}
function invalidInput()
{
    $response = new Response();
    $response->setSuccess(false);
    $error = [];
    $error['success'] = false;
    $error['code'] = '404';
    $error['error'] = 'Invalid input.';
    $response->setData($error);
    $response->send();
    exit;
}

function checkPayload($jsonData)
{
    if (empty($jsonData) || $jsonData === null) {
        invalidInput();
    }
}
function checkIndex($jsonData, $index)
{
    if (!isset($jsonData[$index]) || $jsonData[$index] === '') {
        invalidInput();
    }
    return trim($jsonData[$index]);
}

function returnSuccess($model, $name, $query, $data = ' ')
{
    $response = new Response();
    $returnData = [];
    $returnData['data'] = [$data];
    $returnData['count'] = $query->rowCount();
    $returnData["{$name} ID"] = $model->lastInsertedId;
    $returnData['success'] = true;
    $response->setData($returnData);
    $response->send();
    exit;
}

// CREATE
function checkCreate($models)
{
    $query = $models->create();
    checkQuery($query, "There's something wrong with models. (create)");
    return $query;
}

//step-15 (UPDATE)
function checkUpdate($models)
{
    $query = $models->update();
    checkQuery($query, "There's something wrong with models. (update)");
    return $query;
}

function sendResponse($result)
{
    $response = new Response();
    $response->setSuccess(true);
    $response->setStatusCode(200);
    $response->setData($result);
    $response->send();
}


function checkReadAll($object)
{
    $query = $object->readAll();
    checkQuery($query, "There's comething wrong with models.");
    return $query;
}
 

// $conn = null;
// $conn = checkDatabaseConnection();

// $test = new Test($conn);

// $query = checkReadAll($test);
// getQueriedData($query);
