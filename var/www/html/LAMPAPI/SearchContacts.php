<?php    
    //for CORS
    $http_origin = $_SERVER['HTTP_ORIGIN'];
    if ($http_origin == "http://127.0.0.1:5500" || $http_origin == "http://www.domain2.com" || $http_origin == "http://www.domain3.com")
    {  
        header("Access-Control-Allow-Origin: $http_origin");
    }
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    $method = $_SERVER['REQUEST_METHOD'];
    if ($method == "OPTIONS") {
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
    }
    
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