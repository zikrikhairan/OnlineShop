var ip="http://localhost/swalayan/"
var ipdatabarang=ip+"databarang.php"
var iplogin=ip+"login.php"
var ipregister=ip+"register.php"
var ipdatapelanggan=ip+"datapelanggan.php"
var ipdatatransaksi=ip+"datatransaksi.php"
var ipinputbarang=ip+"inputbarang.php"
var ipgambar=ip+"images/"
var iptransaksi=ip+"transaksi.php"
var ipmaxid=ip+"maxid.php"
var ipupdatebarang=ip+"updatebarang.php"
var ipupdatestok=ip+"updatestok.php"
var ipupdatestatus=ip+"updatestatus.php"
var ippembayaran=ip+"pembayaran.php"
var iptransaksipelanggan=ip+"transaksipelanggan.php"
var ipuploadgambar=ip+"uploadgambar.php"
var pelangganid;
var pelanggannama;
var pelangganalamat;
var pelanggankecamatan;
var pelanggannotelepon;
var maxid;
var datastokbarang = []
var statusbarang;
var pelangganmemesan;

$("[type='number']").keypress(function(evt){evt.preventDefault();});
$("#password").attr('type','password');
$("#buttonlogin").click(function(){
 	$.getJSON(iplogin+"?callback=?",
 		{
 			username:document.getElementById('username').value,
 			password:document.getElementById('password').value,
 		},
 		function(json){
 			if(json != "gagal"){
 				$("#login").hide();
 				pelangganid=json[0].id
 				pelanggannama=json[0].nama
 				pelangganalamat=json[0].alamat
 				pelanggankecamatan=json[0].kecamatan
 				pelanggannotelepon=json[0].no_telepon
 				$("#tampilanpelanggan").show();
 				$("#namapelanggan").val(pelanggannama);
 				$("#alamatpelanggan").val(pelangganalamat);
 				$("#kecamatanpelanggan").val(pelanggankecamatan);
 				$("#nomorpelanggan").val(pelanggannotelepon);

 			}
 			else if(document.getElementById('username').value == "admin" && document.getElementById('password').value== "admin"){
 				$("#login").hide();
 				$("#tampilanadmin").show();
 				$("#pilihanadmin").show();
 			}
 			else{
 				alert("Masukkan username dan password dengan benar")
 			}
 		}
 		)
 	}

);
$("#buttonregister").click(function(){
 	$("#login").hide();
 	$("#register").show();
 	}
);
$("#keluar").click(function(){
 	window.location.reload();
 	}
);
$("#daftarkan").click(function(){
 	$.getJSON(ipregister+"?callback=?",
 		{
 			username:document.getElementById('registerusername').value,
 			password:document.getElementById('registerpassword').value,
 			nama:document.getElementById('registernama').value,
 			alamat:document.getElementById('registeralamat').value,
 			kecamatan:document.getElementById('registerkecamatan').value,
 			no_telepon:document.getElementById('registerno_telepon').value
 		},
 		function(json){
 			if(json == "berhasil"){
 				window.location.reload();	
 			}
 			else{
 				alert("Data gagal didaftarkan")
 			}
 		}
 	)
});
window.onload=function(){
	$.getJSON(ipmaxid+"?callback=?",{},
		function(json){
	 		maxid=json[0].id;
	 		maxid++
	 		console.log(maxid)
 		}
 	)
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for (var i in json){
 				var datasemuabarang=json[i];
 				datastokbarang.push({
 					"id": datasemuabarang.id_barang,
 					"stok": datasemuabarang.stok
 				})
 			}
 		}
 	)
 	console.log(datastokbarang)
}
$("#makanan").bind("mouseover", function(){
 	$("#makanandanminuman").show();
 	$("#perlengkapanrumahtangga").hide();
	$("#perawatantubuh").hide();
	$("#mainan").hide();
	$("#alatalattulis").hide();
});
$("#perlengkapan").bind("mouseover", function(){
 	$("#perlengkapanrumahtangga").show();
 	$("#makanandanminuman").hide();
	$("#perawatantubuh").hide();
	$("#mainan").hide();
	$("#alatalattulis").hide();
});
$("#perawatan").bind("mouseover", function(){
	$("#perawatantubuh").show();
 	$("#makanandanminuman").hide();
 	$("#perlengkapanrumahtangga").hide();
	$("#mainan").hide();
	$("#alatalattulis").hide();
});
$("#main").bind("mouseover", function(){
	$("#mainan").show();
 	$("#makanandanminuman").hide();
 	$("#perlengkapanrumahtangga").hide();
	$("#perawatantubuh").hide();
	$("#alatalattulis").hide();
});
$("#alat").bind("mouseover", function(){
	$("#alatalattulis").show();
 	$("#makanandanminuman").hide();
 	$("#perlengkapanrumahtangga").hide();
	$("#perawatantubuh").hide();
	$("#mainan").hide();
});
var urutan=0;
var belanja=0;
var data;
$("#libiskuit").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "biskuit" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data = json;
 		}
 		)
 	}
 );
 var data2;
 $("#lisusu").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "susu"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data2 = json;
 		}
 		)
 	}
 );
 var data3;
 $("#liminuman").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "minuman"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data3 = json;
 		}
 		)
 	}
 );
 var data4;
 $("#lisnack").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "snack" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data4 = json;
 		}
 		)
 	}
 );
 var data5;
 $("#libumbu").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "bumbu" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data5 = json;
 		}
 		)
 	}
 );
 var data6;
 $("#lisembako").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "sembako" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data6 = json;
 		}
 		)
 	}
 );
 var data7;
 $("#liroti").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "roti" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data7 = json;
 		}
 		)
 	}
 );
 var data8;
 $("#libahankue").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "bahan kue" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data8 = json;
 		}
 		)
 	}
 );
 var data9;
 $("#lipermen").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "permen" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data9 = json;
 		}
 		)
 	}
 );
 var data10;
 $("#licokelat").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "cokelat" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data10 = json;
 		}
 		)
 	}
 );
 var data11;
 $("#limie").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "mie"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data11 = json;
 		}
 		)
 	}
 );
 var data12;
 $("#lisarapan").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "sarapan"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data12 = json;
 		}
 		)
 	}
 );
 var data13;
 $("#liminyakgoreng").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "minyak goreng" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data13 = json;
 		}
 		)
 	}
 );
 var data14;
 $("#lisirup").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "sirup"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data14 = json;
 		}
 		)
 	}
 );
 var data15;
 $("#limakanandiawetkan").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "makanan diawetkan"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data15 = json;
 		}
 		)
 	}
 );
 var data16;
 $("#lirokok").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "rokok"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data16 = json;
 		}
 		)
 	}
 );
 var data17;
 $("#liperawatanrambut").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perawatan rambut"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data17 = json;
 		}
 		)
 	}
 );
 var data18;
 $("#liperawatantubuh").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perawatan tubuh" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data18 = json;
 		}
 		)
 	}
 );
 var data19;
 $("#liperawatankulit").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perawatan kulit" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data19 = json;
 		}
 		)
 	}
 );
 var data20;
 $("#liperawatangigi").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perawatan gigi"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data20 = json;
 		}
 		)
 	}
 );
 var data21;
 $("#likosmetik").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "kosmetik"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data21 = json;
 		}
 		)
 	}
 );
 var data22;
 $("#liobatobatan").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "obat-obatan"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data22 = json;
 		}
 		)
 	}
 );
 var data23;
 $("#liperlengkapanmelamin").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perlengkapan melamin"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data23 = json;
 		}
 		)
 	}
 );
var data24;
 $("#liperlengkapanplastik").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perlengkapan plastik"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data24 = json;
 		}
 		)
 	}
 );
 var data25;
 $("#liperlengkapankaca").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perlengkapan kaca"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data25 = json;
 		}
 		)
 	}
 );
 var data26;
 $("#liperalatanlistrik").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "peralatan listrik"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data26 = json;
 		}
 		)
 	}
 );
 var data27;
 $("#liperlengkapankebersihan").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perlengkapan kebersihan" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data27 = json;
 		}
 		)
 	}
 );
 var data28;
 $("#liperlengkapandapur").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perlengkapan dapur"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data28 = json;
 		}
 		)
 	}
 );
 var data29;
 $("#liperlengkapanmusiman").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "perlengkapan musiman" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    }); 				}
 			}
 			data29 = json;
 		}
 		)
 	}
 );
 var data30;
 $("#litaskoper").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "tas koper"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data30 = json;
 		}
 		)
 	}
 );
 var data31;
 $("#lipakaiandalam").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "pakaian dalam" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data31 = json;
 		}
 		)
 	}
 );
 var data32;
 $("#limainanlembut").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "mainan lembut" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data32 = json;
 		}
 		)
 	}
 );
 var data33;
 $("#limainanlakilaki").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "mainan laki-laki" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data33 = json;
 		}
 		)
 	}
 );
 var data34;
 $("#limainanperempuan").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "mainan perempuan" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data34 = json;
 		}
 		)
 	}
 );
 var data35;
 $("#lipermainan").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "permainan" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data35 = json;
 		}
 		)
 	}
 );
 var data36;
 $("#lipendidikan").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "pendidikan" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data36 = json;
 		}
 		)
 	}
 );
 var data37;
 $("#lipensil").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "pensil"  && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data37 = json;
 		}
 		)
 	}
 );
 var data38;
 $("#lipena").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},

 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "pena" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data38 = json;
 		}
 		)
 	}
 );
 var data39;
 $("#lipenghapus").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				console.log(i)
 				if(json[i].tipe.toLowerCase() == "penghapus" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data39 = json;
 		}
 		)
 	}
 );
 var data40;
 $("#libuku").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "buku" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data40 = json;
 		}
 		)
 	}
 );
 var data41;
 $("#likertas").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "kertas" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data41 = json;
 		}
 		)
 	}
 );
 var data42;
 $("#lialatkantor").click(function(){
 	$("#listkotak").empty()
 	$.getJSON(ipdatabarang+"?callback=?",{},
 		function(json){
 			for(var i in json){
 				if(json[i].tipe.toLowerCase() == "alat kantor" && json[i].stok>=1 ){
 					$("<tr>",{
 						id:"kotak"+json[i].id_barang,
 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
	 				}).appendTo("#listkotak");
				    var test = $("#"+json[i].id_barang).click(function () {
				    	urutan++;
				    	var id=json[this.id-1].id_barang;
				    	var nama=json[this.id-1].nama_barang;
				    	var harga=json[this.id-1].harga
				    	var stok=json[this.id-1].harga
				    	var jumlah=$("#jumlah"+id+"").val()
			 			$("<tbody>",{
			 				id : "tbody"
			 			}).appendTo("#tabel");
		 				$("<tr>",{
		 					id:"row"+urutan
		 				}).attr("width", "100%").appendTo("#tbody");
		 				$("<td>",{
		 					html:urutan
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"baris"+urutan,
		 					html:id
		 				}).attr("width", "40px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:nama
		 				}).attr("width", "300px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					id:"banyak"+urutan,
		 					html:jumlah
		 				}).attr("width", "90px").appendTo("#row"+urutan+"");
		 				$("<td>",{
		 					html:"Rp. "+harga*jumlah
		 				}).attr("width", "70px").appendTo("#row"+urutan+"");
		 				belanja=belanja+(harga*jumlah)
		 				document.getElementById("totalbelanja").innerHTML=belanja
				    });
 				}
 			}
 			data42 = json;
 		}
 		)
 	}
 );
var pencarian;
$("#btnpencarian").click(function(){
	var textcari=document.getElementById("carikata").value
	if(document.getElementById("pilihanpencarian").value==0)
	{
		alert("Pilihan pencarian")
	}
	else if(document.getElementById("pilihanpencarian").value==1)
	{
		alert("Pencarian berdasarkan nama Barang")
		$("#listkotak").empty()
		$.getJSON(ipdatabarang+"?callback=?",{},
	 		function(json){
	 			for(var i in json){
	 				if(json[i].nama_barang.toLowerCase().includes(textcari.toLowerCase())  && json[i].stok>=1 ){
	 					console.log(i)
	 					$("<tr>",{
	 						id:"kotak"+json[i].id_barang,
	 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
		 				}).appendTo("#listkotak");
					    var test = $("#"+json[i].id_barang).click(function () {
					    	urutan++;
					    	var id=json[this.id-1].id_barang;
					    	var nama=json[this.id-1].nama_barang;
					    	var harga=json[this.id-1].harga
					    	var stok=json[this.id-1].harga
					    	var jumlah=$("#jumlah"+id+"").val()
				 			$("<tbody>",{
				 				id : "tbody"
				 			}).appendTo("#tabel");
			 				$("<tr>",{
			 					id:"row"+urutan
			 				}).attr("width", "100%").appendTo("#tbody");
			 				$("<td>",{
			 					html:urutan
			 				}).attr("width", "40px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					id:"baris"+urutan,
			 					html:id
			 				}).attr("width", "40px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:nama
			 				}).attr("width", "300px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:"Rp. "+harga
			 				}).attr("width", "90px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					id:"banyak"+urutan,
			 					html:jumlah
			 				}).attr("width", "90px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:"Rp. "+harga*jumlah
			 				}).attr("width", "70px").appendTo("#row"+urutan+"");
			 				belanja=belanja+(harga*jumlah)
			 				document.getElementById("totalbelanja").innerHTML=belanja
					    });
	 				}
	 			}
	 			pencarian = json;
	 		}
 		)
	}
	else if(document.getElementById("pilihanpencarian").value==2)
	{
		alert("Pencarian berdasarkan keterangan Barang")
		$("#listkotak").empty()
	 	$.getJSON(ipdatabarang+"?callback=?",{},
	 		function(json){
	 			for(var i in json){
	 				if(json[i].keterangan.toLowerCase().includes(textcari.toLowerCase()) && json[i].stok>=1 ){
	 					console.log(i)
	 					$("<tr>",{
	 						id:"kotak"+json[i].id_barang,
	 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
		 				}).appendTo("#listkotak");
					    var test = $("#"+json[i].id_barang).click(function () {
					    	urutan++;
					    	var id=json[this.id-1].id_barang;
					    	var nama=json[this.id-1].nama_barang;
					    	var harga=json[this.id-1].harga
					    	var stok=json[this.id-1].harga
					    	var jumlah=$("#jumlah"+id+"").val()
				 			$("<tbody>",{
				 				id : "tbody"
				 			}).appendTo("#tabel");
			 				$("<tr>",{
			 					id:"row"+urutan
			 				}).attr("width", "100%").appendTo("#tbody");
			 				$("<td>",{
			 					html:urutan
			 				}).attr("width", "40px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					id:"baris"+urutan,
			 					html:id
			 				}).attr("width", "40px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:nama
			 				}).attr("width", "300px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:"Rp. "+harga
			 				}).attr("width", "90px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					id:"banyak"+urutan,
			 					html:jumlah
			 				}).attr("width", "90px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:"Rp. "+harga*jumlah
			 				}).attr("width", "70px").appendTo("#row"+urutan+"");
			 				belanja=belanja+(harga*jumlah)
			 				document.getElementById("totalbelanja").innerHTML=belanja
					    });
	 				}
	 			}
	 			pencarian = json;
	 		}
 		)
	}
	else if(document.getElementById("pilihanpencarian").value==3)
	{
		alert("Pencarian berdasarkan keterangan Barang")
		$("#listkotak").empty()
	 	$.getJSON(ipdatabarang+"?callback=?",{},
	 		function(json){
	 			for(var i in json){
	 				if(json[i].tag.toLowerCase().includes(textcari.toLowerCase()) && json[i].stok>=1 ){
	 					console.log(i)
	 					$("<tr>",{
	 						id:"kotak"+json[i].id_barang,
	 						html:"<td style='width:100%; border:2px solid;'>"+json[i].nama_barang+"<br>"+json[i].harga+"<br><img class='gambar' src='"+ipgambar+json[i].nama_barang+".jpg'  style='width:100%;height:auto;' alt='"+json[i].nama_barang+"'><img class='gambarbesar' src='"+ipgambar+json[i].nama_barang+".jpg'  alt='"+json[i].nama_barang+"'><br><input type='number' id='jumlah"+json[i].id_barang+"' value='1' min='1' max='"+json[i].stok+"'><br><br>"+json[i].keterangan+"<br><button id='"+json[i].id_barang+"'>Pesan</td>"
		 				}).appendTo("#listkotak");
					    var test = $("#"+json[i].id_barang).click(function () {
					    	urutan++;
					    	var id=json[this.id-1].id_barang;
					    	var nama=json[this.id-1].nama_barang;
					    	var harga=json[this.id-1].harga
					    	var stok=json[this.id-1].harga
					    	var jumlah=$("#jumlah"+id+"").val()
				 			$("<tbody>",{
				 				id : "tbody"
				 			}).appendTo("#tabel");
			 				$("<tr>",{
			 					id:"row"+urutan
			 				}).attr("width", "100%").appendTo("#tbody");
			 				$("<td>",{
			 					html:urutan
			 				}).attr("width", "40px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					id:"baris"+urutan,
			 					html:id
			 				}).attr("width", "40px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:nsama
			 				}).attr("width", "300px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:"Rp. "+harga
			 				}).attr("width", "90px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					id:"banyak"+urutan,
			 					html:jumlah
			 				}).attr("width", "90px").appendTo("#row"+urutan+"");
			 				$("<td>",{
			 					html:"Rp. "+harga*jumlah
			 				}).attr("width", "70px").appendTo("#row"+urutan+"");
			 				belanja=belanja+(harga*jumlah)
			 				document.getElementById("totalbelanja").innerHTML=belanja
					    });
	 				}
	 			}
	 			pencarian = json;
	 		}
 		)
	}
 	}
 );

$("#kirimbarang").click(function(){
 	$("#listkotak").hide()
 	$("#pesanan").hide()
 	$("#kirimbarang").hide()
 	$("#datapelanggan").show()
 	$("#kirim").show()
 	$("#kembali").show()
 	}
);

$("#kirim").click(function(){
 	if(urutan<=0)
 	{
 		alert("Anda belum memesan")
 	}
 	else{
	 	for (var i = 1; i <= urutan; i++) {
	 		for (var j in datastokbarang)
		 	{
		 		var dataidterpesan = document.getElementById("baris"+i).innerHTML
		 		if(datastokbarang[j].id == dataidterpesan)
		 		{
		 			datastokbarang[j].stok=datastokbarang[j].stok-document.getElementById("banyak"+i).innerHTML
		 		}
		 	}
		 	for (var k in datastokbarang)
		 	{
		 		if(datastokbarang[k].stok < 0)
		 		{
		 			statusbarang = "kurang"
		 			alert("barang tidak mencukupi, ulangi pesanan Anda")
		 			break
		 		}
		 		else{
		 			statusbarang = "tersedia"
		 		}
		 	}
		 	console.log(document.getElementById("baris"+i).innerHTML)
	 		console.log(pelangganid)
	 		console.log("Jumlahnya "+document.getElementById("banyak"+i).innerHTML)
	 		console.log(datastokbarang)
	 	}
	 	if(document.getElementById("kota").value==0)
	 	{
	 		console.log(statusbarang)
	 		alert("Pilih kota")
	 	}
	 	else
	 	{

		 	if(statusbarang == "tersedia"){
		 		var deferred  = []
		 		for(var l = 1; l<=urutan; l++)
		 		{
			 		deferred.push($.getJSON(iptransaksi+"?callback=?",
				 		{
				 			id: maxid,
				 			id_pelanggan:pelangganid,
				 			id_barang:document.getElementById("baris"+l).innerHTML,
				 			jumlah:document.getElementById("banyak"+l).innerHTML,
				 		},
				 		function(json){
				 			if(json == "tersimpan"){
				 				for(var m= 1; m<=datastokbarang.length; m++ ){
					 				$.getJSON(ipupdatestok+"?callback=?",
								 		{
								 			stok: datastokbarang[m-1].stok,
								 			id_barang:datastokbarang[m-1].id
								 		},
								 		function(json){
								 			if(json == "terupdate"){
								 				pelangganmemesan = "memesan"
								 			}
								 			else{
								 				console.log("data gagal diupdate")
								 			}	
								 		}
								 	)
					 			}
				 			}
				 			else{
				 				alert("Pesanan gagal dientrikan")
				 			}	
				 		}
				 	));
				 	$.when.apply(null,deferred).done(function(){
			 		
					if(pelangganmemesan=="memesan")
				 	{
				 		$.getJSON(ippembayaran+"?callback=?",
					 		{
					 			id_transaksi: maxid,
					 			total_belanja: belanja,
					 			nama:$("#namapelanggan").val(),
					 			alamat:$("#alamatpelanggan").val(),
					 			no_hp:$("#nomorpelanggan").val(),
					 			kota:$("#kota").val()
					 		},
					 		function(json){
					 			if(json == "tersimpan"){
					 				console.log("data tersimpan")	
					 			}
					 			else{
					 				console.log("data gagal disimpan")
					 			}	
					 		}
					 	)
					 	window.location.reload();
				 	}
			 	});
			 	}
		 	}
		}
	 }
});
$("#kembali").click(function(){
 	$("#listkotak").show()
 	$("#pesanan").show()
 	$("#kirimbarang").show()
 	$("#datapelanggan").hide()
 	$("#kirim").hide()
 	$("#kembali").hide()
 	}	
 );
$("#masukkan").click(function(){
 	$.getJSON(ipinputbarang+"?callback=?",
 		{
 			nama_barang:$("#masukkannama").val(),
 			harga:$("#masukkanharga").val(),
 			stok:$("#masukkanstok").val(),
 			tipe:$("#masukkantipe").val(),
 			berat:$("#masukkanberat").val(),
 			panjang:$("#masukkanpanjang").val(),
 			lebar:$("#masukkanlebar").val(),
 			tinggi:$("#masukkantinggi").val(),
 			keterangan:$("#masukkanketerangan").val(),
 			tag:$("#masukkantag").val()
 		},
 		function(json){
 			if(json == "berhasil"){
 				alert("data berhasil diinputkan")	
 			}
 			else{
 				alert("Data gagal diinputkan")
 			}	
 		}
 	)
 	console.log("submit event");
    var fd = new FormData(document.getElementById("fileinfo"));
    fd.append($("#masukkannama").val(), "");
    $.ajax({
      url: ipuploadgambar,
      type: "POST",
      data: fd,
      enctype: 'multipart/form-data',
      processData: false,  // tell jQuery not to process the data
      contentType: false   // tell jQuery not to set contentType
    }).done(function( data ) {
        console.log("PHP Output:");
        console.log( data );
    });
    return false;
});
$("#kembalilogin").click(function(){
	window.location.reload()
});
$("#kembalilogin2").click(function(){
	window.location.reload()
});
$("#kembalilogin3").click(function(){
	window.location.reload()
});
$("#kembalilogin4").click(function(){
	window.location.reload()
});
$("#kembalilogin5").click(function(){
	window.location.reload()
});
$("#kembaliadmin").click(function(){
	$("#pilihanadmin").show()
	$("#inputbarang").hide()
});
$("#kembaliadmin2").click(function(){
	$("#pilihanadmin").show()
	$("#tabeltransaksi").hide()
});
$("#kembaliadmin3").click(function(){
	$("#pilihanadmin").show()
	$("#updatebarang").hide()
});
$("#buttoninputbarang").click(function(){
	$("#inputbarang").show()
	$("#pilihanadmin").hide()
});
$("#buttonupdatebarang").click(function(){
	$("#updatebarang").show()
	$("#pilihanadmin").hide()
});
$("#buttonlihattransaksi").click(function(){
	$("#tabeltransaksi").show()
	$("#pilihanadmin").hide()
});

var transaksipelanggan
$("#btnpencariantransaksi").click(function(){
	transaksipelanggan = []
	var no = 1;
	var lihattransaksi;
	document.getElementById("tabeltransaksi2").innerHTML = ""
	$.getJSON(ipdatatransaksi+"?callback=?",{},
	 	function(json){
	 		$("<tbody>",{
				id : "tbodytransaksi2"
			}).appendTo("#tabeltransaksi2");
			$("<tr>",{
				id: "baristransaksi"
			}).attr("width", "100%").appendTo("#tbodytransaksi2");
			$("<th>",{
				html:"ID Transaksi"
			}).attr("width", "10%").appendTo("#baristransaksi");
			$("<th>",{
				html:"ID Pelanggan"
			}).attr("width", "10%").appendTo("#baristransaksi");
			$("<th>",{
				html:"ID Barang"
			}).attr("width", "20%").appendTo("#baristransaksi");
			$("<th>",{
				html:"Jumlah"
			}).attr("width", "10%").appendTo("#baristransaksi");
			$("<th>",{
				html:"Tanggal Dipesan"
			}).attr("width", "20%").appendTo("#baristransaksi");
			$("<th>",{
				html:"Tanggal Diterima"
			}).attr("width", "20%").appendTo("#baristransaksi");
			$("<th>",{
				html:"Status"
			}).attr("width", "10%").appendTo("#baristransaksi");	
 			for(var i in json){
				if(json[i].id==document.getElementById("caritransaksi").value){
					var no=json[i].no;
			    	var id=json[i].id;
			    	var id_barang=json[i].id_barang;
			    	var id_pelanggan=json[i].id_pelanggan;
			    	var jumlah = json[i].jumlah;
			    	var waktu_pesanan = json[i].waktu_pesanan
			    	var waktu_diterima = json[i].waktu_diterima;
			    	var datasemuatransaksi=json[i];
		 			transaksipelanggan.push({
		 				"no": datasemuatransaksi.no,
		 				"status": datasemuatransaksi.status 
		 			})
			    	$("<tbody>",{
		 				id : "tbodytransaksi"
		 			}).appendTo("#tabeltransaksi2");
	 				$("<tr>",{
	 					id:"rowtransaksi"+no
	 				}).attr("width", "100%").appendTo("#tbodytransaksi");
	 				$("<td>",{
	 					html:id
	 				}).attr("width", "10%").appendTo("#rowtransaksi"+no+"");
	 				$("<td>",{
	 					html:id_pelanggan
	 				}).attr("width", "10%").appendTo("#rowtransaksi"+no+"");
	 				$("<td>",{
	 					html:id_barang
	 				}).attr("width", "20%").appendTo("#rowtransaksi"+no+"");
	 				$("<td>",{
	 					html:jumlah
	 				}).attr("width", "10%").appendTo("#rowtransaksi"+no+"");
	 				$("<td>",{
	 					html:waktu_pesanan
	 				}).attr("width", "20%").appendTo("#rowtransaksi"+no+"");
	 				$("<td>",{
	 					html:waktu_diterima
	 				}).attr("width", "20%").appendTo("#rowtransaksi"+no+"");
	 				$("<td>",{
	 					html:"<input type='checkbox' value='terkirim' id='tukarstatus"+no+"' disabled>Sudah Terkirim</input>"
	 				}).attr("width", "10%").appendTo("#rowtransaksi"+no+"");
				}
 			}
 			lihattransaksi = json;
 			$("<div>",{
	 			html:"<input type='checkbox' value='terkirim' id='tukarsemuastatus'>Sudah Terkirim</input>"
	 		}).attr("align", "center").appendTo("#tabeltransaksi2");	
	 		var tukarsemuastatus = $("#tukarsemuastatus").change(function () {
		    	for(var n = 1; n<=transaksipelanggan.length; n++){
		    		if(transaksipelanggan[n-1].status==1){
		    			document.getElementById("tukarsemuastatus").disabled = true;
		    			alert("pesanan sudah diterima pelanggan")
		    			break;
		    		}
		    	}
		    	for(var nn = 1; nn<=transaksipelanggan.length; nn++){
			    	if(this.checked == true){
		 				document.getElementById("tukarstatus"+transaksipelanggan[nn-1].no).checked= true;
		 			}
		 			else if(this.checked == false){
		 				document.getElementById("tukarstatus"+transaksipelanggan[nn-1].no).checked= false;
		 			}
		    	}
		    });
		    console.log(transaksipelanggan)
 		}
 	)
});

$("#updatetransaksi").click(function(){
	if(document.getElementById("tukarsemuastatus").checked == true){
		alert("update waktu diterima")
		for(var p = 1; p<=transaksipelanggan.length; p++){
 			$.getJSON(ipupdatestatus+"?callback=?",
		 	{
		 		status: 1,
		 		no:transaksipelanggan[p-1].no
		 	},
		 	function(json){
		 		if(json == "terupdate"){
		 			console.log("data terupdate")	
		 		}
		 		else{
		 			console.log("data gagal diupdate")
		 		}	
		 	})
 		}	
	}
	else{
		alert("cek penerimaan pesanan pelanggan")
	}
});
var updatebarang;
var urutanupdate
$("#btntampilkansemuabarangupdate").click(function(){
	urutanupdate=1
	document.getElementById("tabelupdatebarang").innerHTML = ""
	$.getJSON(ipdatabarang+"?callback=?",{},
	 	function(json){
	 		$("<tbody>",{
				id : "tbodyupdatebarang"
			}).appendTo("#tabelupdatebarang");
			$("<tr>",{
				id: "barisupdate"
			}).attr("width", "100%").appendTo("#tbodyupdatebarang");
			$("<th>",{
				html:"ID"
			}).attr("width", "5%").appendTo("#barisupdate");
			$("<th>",{
				html:"Nama"
			}).attr("width", "10%").appendTo("#barisupdate");
			$("<th>",{
				html:"Harga"
			}).attr("width", "7%").appendTo("#barisupdate");
			$("<th>",{
				html:"Stok"
			}).attr("width", "3%").appendTo("#barisupdate");
			$("<th>",{
				html:"Tipe"
			}).attr("width", "10%").appendTo("#barisupdate");
			$("<th>",{
				html:"Berat"
			}).attr("width", "5%").appendTo("#barisupdate");
			$("<th>",{
				html:"Panjang"
			}).attr("width", "5%").appendTo("#barisupdate");	
			$("<th>",{
				html:"Lebar"
			}).attr("width", "5%").appendTo("#barisupdate");	
			$("<th>",{
				html:"Tinggi"
			}).attr("width", "5%").appendTo("#barisupdate");	
			$("<th>",{
				html:"Keterangan"
			}).attr("width", "25%").appendTo("#barisupdate");	
			$("<th>",{
				html:"Tag"
			}).attr("width", "10%").appendTo("#barisupdate");
 			for(var i in json){

		    	$("<tbody>",{
	 				id : "tbodyupdatebarang2"
	 			}).appendTo("#tabelupdatebarang");
 				$("<tr>",{
 					id:"rowupdatebarang"+json[i].id_barang
 				}).attr("width", "100%").appendTo("#tbodyupdatebarang2");
 				$("<td>",{
 					html:"<input id='updateid"+json[i].id_barang+"' type='text' value='"+json[i].id_barang+"' disabled>"
 				}).attr("width", "5%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updatenama"+json[i].id_barang+"' type='text' value='"+json[i].nama_barang+"'>"
 				}).attr("width", "10%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updateharga"+json[i].id_barang+"'type='text' value='"+json[i].harga+"'>"
 				}).attr("width", "7%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updatestok"+json[i].id_barang+"' type='text' value='"+json[i].stok+"'>"
 				}).attr("width", "3%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updatetipe"+json[i].id_barang+"' type='text' value='"+json[i].tipe+"' disabled>"
 				}).attr("width", "10%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updateberat"+json[i].id_barang+"' type='text' value='"+json[i].berat+"'>"
 				}).attr("width", "5%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updatepanjang"+json[i].id_barang+"' type='text' value='"+json[i].panjang+"'>"
 				}).attr("width", "5%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updatelebar"+json[i].id_barang+"'type='text' value='"+json[i].lebar+"'>"
 				}).attr("width", "5%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updatetinggi"+json[i].id_barang+"'type='text' value='"+json[i].tinggi+"'>"
 				}).attr("width", "5%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updateketerangan"+json[i].id_barang+"'type='text' value='"+json[i].keterangan+"'>"
 				}).attr("width", "25%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				$("<td>",{
 					html:"<input id='updatetag"+json[i].id_barang+"'type='text' value='"+json[i].tag+"'>"
 				}).attr("width", "10%").appendTo("#rowupdatebarang"+json[i].id_barang+"");
 				urutanupdate++
 			}
 			updatebarang = json;
 		}

 	)
});

$("#btnupdatebarang").click(function(){
	for(var nnn = 1; nnn<=urutanupdate; nnn++)
	{
		alert("update waktu diterima")
		$.getJSON(ipupdatebarang+"?callback=?",
		 	{
		 		nama_barang:$("#updatenama"+nnn+"").val(),
	 			harga:$("#updateharga"+nnn+"").val(),
	 			stok:$("#updatestok"+nnn+"").val(),
	 			berat:$("#updateberat"+nnn+"").val(),
	 			panjang:$("#updatepanjang"+nnn+"").val(),
	 			lebar:$("#updatelebar"+nnn+"").val(),
	 			tinggi:$("#updatetinggi"+nnn+"").val(),
	 			keterangan:$("#updateketerangan"+nnn+"").val(),
	 			tag:$("#updatetag"+nnn+"").val(),
	 			id_barang:$("#updateid"+nnn+"").val()
		 	},
		 	function(json){
		 		if(json == "terupdate"){
		 			console.log("data terupdate")	
		 		}
		 		else{
		 			console.log("data gagal diupdate")
		 		}	
		 	})
 	}
});

var datatransaksipelanggan
$("#btndatatransaksipelanggan").click(function(){
	console.log(pelangganid)
	document.getElementById("datatransaksipelanggan").innerHTML=""
	$.getJSON(iptransaksipelanggan+"?callback=?",{},
	 	function(json){	
 			for(var i in json){
				if(json[i].id_pelanggan==pelangganid){
					$("<table>",{
		 				id : "tabeldatatransaksi"+i,
		 				css:{
		 					display:"block",
		 					border:"solid black",
		 					width:"100%"
		 				}
		 			}).appendTo("#datatransaksipelanggan");
			    	$("<tbody>",{
		 				id : "tbodydatatransaksi"+i
		 			}).appendTo("#tabeldatatransaksi"+i+"");
	 				$("<tr>",{
	 					id:"rowdatatransaksi1"+i
	 				}).attr("width", "100%").appendTo("#tbodydatatransaksi"+i+"");
	 				$("<td>",{
	 					html:"Nama"
	 				}).appendTo("#rowdatatransaksi1"+i+"");
	 				$("<td>",{
	 					html:":"
	 				}).attr("width", "5%").appendTo("#rowdatatransaksi1"+i+"");
	 				$("<td>",{
	 					html:json[i].nama_barang
	 				}).appendTo("#rowdatatransaksi1"+i+"");
	 				$("<tr>",{
	 					id:"rowdatatransaksi2"+i
	 				}).attr("width", "100%").appendTo("#tbodydatatransaksi"+i+"");
	 				$("<td>",{
	 					html:"Jumlah"
	 				}).appendTo("#rowdatatransaksi2"+i+"");
	 				$("<td>",{
	 					html:":"
	 				}).attr("width", "5%").appendTo("#rowdatatransaksi2"+i+"");
	 				$("<td>",{
	 					html:json[i].jumlah
	 				}).appendTo("#rowdatatransaksi2"+i+"");
	 				$("<tr>",{
	 					id:"rowdatatransaksi3"+i
	 				}).attr("width", "100%").appendTo("#tbodydatatransaksi"+i+"");
	 				$("<td>",{
	 					html:"Total Harga"
	 				}).appendTo("#rowdatatransaksi3"+i+"");
	 				$("<td>",{
	 					html:":"
	 				}).attr("width", "5%").appendTo("#rowdatatransaksi3"+i+"");
	 				$("<td>",{
	 					html:json[i].jumlah*json[i].harga
	 				}).appendTo("#rowdatatransaksi3"+i+"");
	 				$("<tr>",{
	 					id:"rowdatatransaksi4"+i
	 				}).attr("width", "100%").appendTo("#tbodydatatransaksi"+i+"");
	 				$("<td>",{
	 					html:"Dipesan tanggal"
	 				}).appendTo("#rowdatatransaksi4"+i+"");
	 				$("<td>",{
	 					html:":"
	 				}).attr("width", "5%").appendTo("#rowdatatransaksi4"+i+"");
	 				$("<td>",{
	 					html:json[i].waktu_pesanan
	 				}).appendTo("#rowdatatransaksi4"+i+"");
	 				$("<tr>",{
	 					id:"rowdatatransaksi5"+i
	 				}).attr("width", "100%").appendTo("#tbodydatatransaksi"+i+"");
	 				$("<td>",{
	 					html:"Diterima tanggal"
	 				}).appendTo("#rowdatatransaksi5"+i+"");
	 				$("<td>",{
	 					html:":"
	 				}).attr("width", "5%").appendTo("#rowdatatransaksi5"+i+"");
	 				$("<td>",{
	 					html:json[i].waktu_diterima
	 				}).appendTo("#rowdatatransaksi5"+i+"");
				}
 			}
 			datatransaksipelanggan = json;
 		}
 	)
});