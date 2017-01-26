<?php
    $db = mysql_connect("localhost","root");
    if (!$db) {
        die('Could not connect to db: ' . mysql_error());
    }
    mysql_select_db("swalayan",$db);
    $result = mysql_query("select * from pelanggan", $db); 
    $json_response = array();
    while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
        $row_array['id'] = $row['id'];
        $row_array['username'] = $row['username'];
        $row_array['password'] = $row['password'];
        array_push($json_response,$row_array);
    }
    echo json_encode($json_response);
    header("Access-Control-Allow-Origin:*");
?>
