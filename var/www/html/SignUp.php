<?php

	$inData = getRequestInfo();
	
	$id = 0;
	$firstName = "";
	$lastName = "";
    $username = "";
    $password = "";

	
	$conn = new mysqli("localhost", "TheCourtmac", "WeLoveCOP4331", "COP4331"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$login = $_POST['firstName']; 
		$select = mysqli_query($conn, "SELECT * FROM Users WHERE Login = $inData[Login]"); 
		if (mysqli_num_rows($select)) {
			returnWithError('This username already exists');
		}
		
		// Gets last row for ID purposes
		$last_row = "SELECT * FROM Users WHERE ID=(SELECT max(ID) FROM Users)";
		$last_row_id = $last_row['ID'] + 1;
		$insert_val = "INSERT INTO Users (ID, FirstName, LastName, Login, Password) VALUES ($last_row_id, $inData['FirstName'], $inData['LastName'], $inData['Login'], $inData['Password'])";
		$insert_val->execute();

		$select->close();
		$insert_val->close();
		$conn->close();
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
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $id )
	{
		$retValue = '{"id":' . $id . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>
