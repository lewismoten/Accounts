<?php
include 'core.php';

validateRequest();
$obj = getInput();
$db = openDatabase();

$query = sprintf(
    "CALL create_account('%s', '%s', @p0);",
    $db->real_escape_string($obj->accountName),
    $db->real_escape_string($obj->email)
);

$reader = $db->query($query);

if($reader === false) {
    //showError($db->error);
	showError('error querying against database');
}

$query = 'SELECT @p0 AS `nonce`;';
$reader = $db->query($query);

if($reader === false) {
    //showError($db->error);
	showError('error reading nonce');
}

$row = $reader->fetch_assoc();

if($row === null) {
	showError('Unable to create token');
	exit;
}

// TODO: Html encode account name and nonce
mail(
    $obj->email, 
    'Please verify your email address', 
    'Please verify your email address:
    '.UI_URL.'verify.php?account='.$obj->accountName.'&nonce='.$row['nonce'],
    "From: ".EMAIL_FROM.""
    );

showData('Verify Email');

$reader->free();

$db->close();

?>
