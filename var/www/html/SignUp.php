<?php

	$inData = getRequestInfo();
	
	$FirstName = $inData["FirstName"];
	$LastName = $inData["LastName"];
    $Login = $inData["Login"];
    $Password = $inData["Password"];
	
	$conn = new mysqli("localhost", "TheCourtmac", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{	
		$insert_val = $conn->prepare("INSERT INTO Users (firstName, lastName, login, password) VALUES (?,?,?,?)");
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
