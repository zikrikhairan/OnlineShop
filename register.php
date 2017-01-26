<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("INSERT INTO pelanggan VALUES (null,?,?,?,?,?,?)");
    $st->execute(array($_GET['username'],$_GET['password'],$_GET['nama'],$_GET['alamat'],$_GET['kecamatan'],$_GET['no_telepon']));
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
?>
