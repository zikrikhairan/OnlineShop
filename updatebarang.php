<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("UPDATE barang SET nama_barang=?, harga=?, stok=?, berat=?, panjang=?, lebar=?, tinggi=?, keterangan=?, tag=? WHERE id_barang=?");
    $st->execute(array($_GET['nama_barang'],$_GET['harga'],$_GET['stok'],$_GET['berat'],$_GET['panjang'],$_GET['lebar'],$_GET['tinggi'],$_GET['keterangan'],$_GET['tag'],$_GET['id_barang']));
    $message="";
    if($st->errorInfo()[0] != "00000"){
        $message = "gagal";
        echo json_encode($st->errorInfo());
    }
    else
    {
        $message = "terupdate";
    }

    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($message).");";
    }
    else
        echo json_encode($message);
?>
