<?php
    header("Access-Control-Allow-Origin:*");
    // header('Content-Type: application/json');
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("SELECT * FROM barang");
    $st->execute();
    $hasil = $st->fetchAll(PDO::FETCH_ASSOC);
    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($hasil).");";
    }
    else
        echo json_encode($hasil);
    // header("Access-Control-Allow-Origin:*");
    // $db = mysql_connect("localhost","root");
    // if (!$db) {
    //     die('Could not connect to db: ' . mysql_error());
    // }
    // mysql_select_db("swalayan",$db);
    // $result = mysql_query("select * from barang", $db); 
    // $json_response = array();
    // while ($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
    //     $row_array['id_barang'] = $row['id_barang'];
    //     $row_array['nama_barang'] = $row['nama_barang'];
    //     $row_array['harga'] = $row['harga'];
    //     $row_array['stok'] = $row['stok'];
    //     $row_array['tipe'] = $row['tipe'];
    //     $row_array['berat'] = $row['berat'];
    //     $row_array['panjang'] = $row['panjang'];
    //     $row_array['lebar'] = $row['lebar'];
    //     $row_array['tinggi'] = $row['tinggi'];
    //     $row_array['keterangan'] = $row['keterangan'];
    //     $row_array['tag'] = $row['tag'];
    //     array_push($json_response,$row_array);
    // }
    // if(isset($_GET['callback'])){
    //     echo $_GET['callback']."(".json_encode($json_response).");"
    // }
    // else
    // echo json_encode($json_response);
?>
