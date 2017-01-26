<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=quizonline;host=localhost','root','');
    $st = $db->prepare("SELECT * FROM peserta WHERE nama = ? AND nim = ?");
    $st->execute(array($_GET['nama'],$_GET['nim']));
    $hasil = $st->fetchAll(PDO::FETCH_ASSOC);
    $message = "";
    if($hasil){
        $message=$hasil;
    }
    else
        $message = "gagal";

    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($message).");";
    }
    else
        echo json_encode($message);
?>
