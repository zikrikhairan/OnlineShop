<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("INSERT INTO pembayaran (id_transaksi, total_belanja, nama, alamat, no_hp, kota) VALUES (?,?,?,?,?,?)");
    $st->execute(array($_GET['id_transaksi'],$_GET['total_belanja'],$_GET['nama'],$_GET['alamat'],$_GET['no_hp'],$_GET['kota']));
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
