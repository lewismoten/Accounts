<?php
include 'configuration.php';

error_reporting(E_ERROR);
set_error_handler("onError", E_ALL);

function onError($number, $message, $file, $line) {
	showError($message);
}

function validateRequest() {

	$method = $_SERVER['REQUEST_METHOD'];

	if($method !== 'POST') {
		showError('expected method: post');
		exit;
	}

	$size = (int) $_SERVER['CONTENT_LENGTH'];

	if($size > 2048) {

		showError('too much data');
		exit;
	}

}

function getInput() {

	$input = file_get_contents("php://input");

	if($input === false) {

		showError('could not read input');
		exit;

	}

	$obj = json_decode($input);

	if($obj === null) {

		showError('json cannot be decoded');
		exit;

	}

    validateAccountName($obj);
    validateEmail($obj);
    validatePassword($obj);
    validateNonce($obj);

    return $obj;
}

function validateAccountName($obj) {
	if(!isset($obj->accountName)) return;
    $obj->accountName = trim($obj->accountName);
    if(strlen($obj->accountName) > 64) {
        showError('Account Name is too long');
    }
    if(strlen($obj->accountName) < 3) {
        showError('Account Name is too short');
    }
    // TODO: Regex match $[a-zA-Z0-d]*^
}
function validateEmail($obj) {
	if(!isset($obj->email)) return;
    $obj->email = trim($obj->email);

    if(strlen($obj->email) > 64) {
        showError('Email is too long');
    }
    if(strlen($obj->email) < 3) {
        showError('Email is too short');
    }
    // TODO: Regex match $[a-zA-Z0-d.]+@[a-zA-Z0-d.]+^
    // Do a better match than that...
}

function validatePassword($obj) {
	if(!isset($obj->password)) return;
    $obj->password = trim($obj->password);

    if(strlen($obj->password) > 64) {
        showError('Password is too long');
    }
    if(strlen($obj->password) < 8) {
        showError('Password is too short');
    }
    // TODO: Regex match
    // at least one lowercase letter
    // at least one uppercase letter
    // at least one number
    // at least one symbol
} 

function validateNonce($obj) {
	if(!isset($obj->nonce)) return;

    $obj->nonce = trim($obj->nonce);
    if(strlen($obj->nonce) != 6) {
        showError('invalid token');
    }
    // TODO: Regex match $[\da-f]^
}

function openDatabase() {

	$db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

	if($db->connect_error) {

		showError('database connection failed');
		exit;
	}

	if($db->connect_errno) {

		showError($db->connect_errno());
		showError('database connection failed');
		exit;
	}

	if($db->error) {

		showError($db->error());
		showError('database connection failed');
		exit;
	}

	return $db;
}


function showError($message) {

	showHeaders();

	$error = new stdClass;
	$error->success = false;
	$error->message = $message;

	echo json_encode($error);

	die();
}

function showData($data) {

	showHeaders();

	$obj = new stdClass;
	$obj->success = true;
	$obj->data = $data;

	echo json_encode($obj);

}

function showHeaders() {

	header('Cache-Control: no-cache, must-revalidate');
	header('Expires: Tue, 11 Jul 2023 22:10:00 GMT');
	header('Content-type: application/json');

}
?>