<?php    
    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;
    //$userId = $inData['userId'];
    
    $conn = new mysqli("localhost", "TheCourtmac", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("select * from Contacts where (Name like ? OR Phone like ? OR Email like ?) and userId =?");
		$colorName = "%" . $inData["search"] . "%";
		$stmt->bind_param("ssss", $colorName, $colorName, $colorName, $inData["userId"]);
		$stmt->execute(); 
        $result = $stmt->get_result();
        
        while($row = $result->fetch_assoc())
        {
            if( $searchCount > 0 )
            {
                $searchResults .= ",";
            }
            $searchCount++;
            // Storing data as JSON Objects
            $searchResults .= '{"Name" : "' . $row['Name'] . '", "Email" : "' . $row['Email'] . '", "Phone" : "' . $row['Phone'] . '"}';
        }
        
        if( $searchCount == 0 )
        {
            returnWithError( "No Records Found" );
        }
        else
        {
            returnWithInfo( $searchResults );
        }
        
        $stmt->close();
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
        $retValue = '{"id":0,"firstName":"","lastName":"","email":"","phone":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $searchResults )
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson( $retValue );
    }
?>