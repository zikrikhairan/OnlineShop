<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
    <script type="text/javascript" src="https://www.bps.go.id/js/tabeldinamis/dataDynamic/downloadButton2.js">
      window.onload(tableTOXML());
    </script>
  </head>
  <body>

  </body>
</html>
<?php
    header("Access-Control-Allow-Origin:*");
    $db = new PDO('mysql:dbname=swalayan;host=localhost','root','');
    $st = $db->prepare("SELECT barang.nama_barang, barang.harga, transaksi.*  FROM transaksi JOIN barang ON barang.id_barang = transaksi.id_barang");
    $st->execute();
    $hasil = $st->fetchAll(PDO::FETCH_ASSOC);
    if(isset($_GET['callback'])){
        echo $_GET['callback']."(".json_encode($hasil).");";
    }
    else
        echo json_encode($hasil);
?>
