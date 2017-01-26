<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("SELECT max(id) as id FROM transaksi");
    $st->execute();
    $hasil = $st->fetchAll(PDO::FETCH_ASSOC);
    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($hasil).");";
    }
    else
        echo json_encode($hasil);
?>
