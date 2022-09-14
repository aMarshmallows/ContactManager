<?php
	//for CORS
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://127.0.0.1:5500" || $http_origin == "http://www.domain2.com" || $http_origin == "http://www.domain3.com")
    {  
        header("Access-Control-Allow-Origin: $http_origin");
    }
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

	$inData = getRequestInfo();
	
	$FirstName = $inData["firstName"];
	$LastName = $inData["lastName"];
    $Login = $inData["login"];
    $Password = $inData["password"];
	$userId = $inData["userId"];

	$conn = new mysqli("localhost", "TheCourtmac", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$insert_val = $conn->prepare("INSERT INTO Users (firstName, lastName, login, password) VALUES (?, ?, ?, ?)");
		$insert_val->bind_param("ssss", $FirstName, $LastName,  $Login, $Password);
		$insert_val->execute();
		$insert_val->close();
		$conn->close();
		returnWithError("");
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}	
?>