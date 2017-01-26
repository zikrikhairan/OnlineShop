<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("INSERT INTO transaksi (id, id_pelanggan, id_barang, jumlah) VALUES (?,?,?,?)");
    $st->execute(array($_GET['id'],$_GET['id_pelanggan'],$_GET['id_barang'],$_GET['jumlah']));
    $message="";
    if($st->errorInfo()[0] != "00000"){
        $message = "gagal";
        echo json_encode($st->errorInfo());
    }
    else
    {
        $message = "tersimpan";
    }

    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($message).");";
    }
    else
        echo json_encode($message);
?>
