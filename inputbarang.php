<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("INSERT INTO barang VALUES (null,?,?,?,?,?,?,?,?,?,?)");
    $st->execute(array($_GET['nama_barang'],$_GET['harga'],$_GET['stok'],$_GET['tipe'],$_GET['berat'],$_GET['panjang'],$_GET['lebar'],$_GET['tinggi'],$_GET['keterangan'],$_GET['tag']));
    $message="";
    if($st->errorInfo()[0] != "00000"){
        $message = "gagal";
        echo json_encode($st->errorInfo());
    }
    else
    {
        $message = "berhasil";
    }

    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($message).");";
    }
    else
        echo json_encode($message);
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
