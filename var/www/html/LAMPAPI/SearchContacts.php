<?php    
    $inData = getRequestInfo();
    
    $searchResults = "";
    $searchCount = 0;
    
    $conn = new mysqli("localhost", "TheCourtmac", "WeLoveCOP4331", "COP4331");
    if ($conn->connect_error)
    {
        returnWithError( $conn->connect_error );
    }
    else
    {
        $stmt = $conn->prepare("select * from Contacts where (FirstName like ? OR LastName like ? OR Email like ? OR Phone like ?) and ID=?");
        $searchResult = "%" . $inData["search"] . "%";
        $stmt->bind_param("sssss", $searchResult, $searchResult, $searchResult, $searchResult, $inData["ID"]);
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
            $searchResults .= ' {"FirstName" : "' . $row["FirstName"] . '", "LastName" : "' . $row["LastName"] . '",
                            "Phone" : "' . $row["Phone"] . '", "Email" : "' . $row["Email"] . '"}';
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
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson( $retValue );
    }
    
    function returnWithInfo( $searchResults )
    {
        $retValue = '{"results":[' . $searchResults . '],"error":""}';
        sendResultInfoAsJson( $retValue );
    }

?>