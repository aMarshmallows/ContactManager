<?php
    $inData = getRequestInfo();
    
    $Id = $inData["ID"];

    
    $conn = new mysqli("localhost", "TheCourtmac", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE (ID =? AND Name = ?)");
        $stmt->bind_param("ss",  $Id, $inData["Name"]);
        $stmt->execute();
        $stmt->close();
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