<?php
    // This will be the basis of our create and updaate code
    $inData = getRequestInfo();
    
    $userId = $inData["userId"];
    $name = $inData["Name"];
    $phone = $inData["Phone"];
    $email = $inData["Email"];
    
    $conn = new mysqli("localhost", "TheCourtmac", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("INSERT into Contacts (Name, Phone, Email, UserId) VALUES(?,?,?,?)");
        $stmt->bind_param("ssss", $name, $phone, $email, $userId);
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