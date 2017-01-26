<?php
    header("Access-Control-Allow-Origin:*");
    // header('Content-Type: application/json');
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("SELECT * FROM transaksi");
    $st->execute();
    $hasil = $st->fetchAll(PDO::FETCH_ASSOC);
    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($hasil).");";
    }
    else
        echo json_encode($hasil);
?>
