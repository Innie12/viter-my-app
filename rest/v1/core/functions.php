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

//Step-16 (DELETE)

function checkId($id)
{
    $response = new Response();
    if ($id === '' || !is_numeric($id)) {
        $response->setSuccess(false);
        $error = [];
        $error['code'] = '400';
        $error['error'] = 'ID cannot be blank or must be numeric.';
        $error['success'] = false;
        $response->setData($error);
        $response->send();
        exit;
    }
}

function checkDelete($models)
{
    $query = $models->delete();
    checkQuery($query, "There's something wrong with models. (delete)");
    return $query;
}

// Validation - after this go to models > WebServices
function checkExistence($count, $msg = '')
{
    if ($count > 0) {
        $response = new response();
        $error = [];
        $response->setSuccess(false);
        $error['error'] = $msg;
        $response->setData($error);
        $response->send();
        exit;
    }
}


// Validation
function isNameExist($models, $name)
{
    // Make sure to set the property on $models before calling this function!
    $query = $models->checkName();
    $count = $query->rowCount();
    checkExistence($count, "{$name} already exist");
}

// Validation after this go to update
function compareName($models, $name_old, $name)
{
    if (strtolower($name_old) != strtolower($name)) {
        isNameExist($models, $name);
    }
}

// Validation
function isEmailExist($models, $email)
{
    $query = $models->checkEmail();
    $count = $query->rowCount();
    checkExistence($count, "{$email} already exist");
}
// Validation after this go to update
function compareEmail($models, $email_old, $email)
{
    if (strtolower($email_old) != strtolower($email)) {
        isEmailExist($models, $email);
    }
}



// Loading Step 2
function checkLimitId($start, $total)
{
    $response = new Response();
    if ($start = '' || !is_numeric($start) || $total = '' || !is_numeric($total)) {
        $response->setSuccess(false);
        $error = [];
        $error['code'] = '400';
        $error['error'] = "Limit ID cannot be blank or must be numeric.";
        $error['success'] = false;
        $response->setData($error);
        $response->send();
        exit;
    }
}

// Loading Step 3

function checkReadLimit($models)
{
    $query = $models->readLimit();
    checkQuery($query, "There's something with your models. (readLimit");
    return $query;
}

// Loading Step 4 - after this go to model 
function checkReadQuery($query, $total_result, $models_total, $models_start)
{
    $response = new Response();
    $returnData = [];
    $returnData['data'] = getResultData($query);
    $returnData['count'] = $query->rowCount();
    $returnData['total'] = $total_result->rowCount();
    $returnData['per_page'] = $models_total;
    $returnData['page'] = (int)$models_start;
    $returnData['total_pages'] = ceil($total_result->rowCount() / $models_total);
    $returnData['success'] = true;
    $response->setData($returnData);
    $response->send();
    exit;
}
