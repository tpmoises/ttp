<?php 
//INDEX.PHP DO APP Passageiro
session_start();
//include('ssl.php');  
$logout= $_GET["sair"]; 
//echo $logout;
if ($logout=="yes"){
    session_unset($_SESSION);
	session_destroy();
}
?>
<!DOCTYPE html><html lang="pt-br">
 <head>
	<title>Teste 0.003 26/04/2018 - Passageiro <?php echo $_SESSION["login"]; ?></title>
	<meta charset="utf-8" />    		    <meta http-equiv="X-UA-Compatible" content="IE=edge">    <title>TT &mdash; Sotution Ultimate </title>	<meta name="viewport" content="width=device-width, initial-scale=1">	<meta name="description" content="Módulo usuario" />  	<meta name="keywords" content="free html5, free template, free bootstrap, html5, css3, mobile first, responsive" />  	<meta name="author" content="Moises Santos" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link         rel="stylesheet"         href="leaflet/leaflet.css"    />
	<link         rel="stylesheet"         href="leaflet/leaflet-routing-machine.css"    /> 
	<link rel="stylesheet" href="leaflet/Control.Geocoder.css" />
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->   
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->    
	<!--[if lt IE 9]>      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js">
	</script> 
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>    <![endif]-->		
	<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->  	
	<link rel="shortcut icon" href="favicon.ico">	
	<!-- Bootstrap -->    <link rel="stylesheet" href="css/bootstrap.css"> <!-- Requer -->		
	<!-- FOR IE9 below -->	<!--[if lt IE 9]>	
	<script src="js/modernizr-2.6.2.min.js"></script>	
	<script src="js/respond.min.js"></script>	
	<![endif]-->     
	<script src='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js'></script>
	<link href='https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css' rel='stylesheet' />
	<link rel="stylesheet" href="css/css.css" />
</head>
<!--Fim head -->
<body> 


<div id='map' style='width: 100%; height: 100%;'></div>

<script> 
mapboxgl.accessToken = 'pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2ppdzZjbzV0MGdjcjNwb3N4Y2tydnkwdyJ9.1BxdUbMyZ9vL2bvHNZEjhg';
 var map = new mapboxgl.Map({
 container: 'map',
  zoom:3,
  style: 'mapbox://styles/mapbox/streets-v10'
});
</script>

testInndex.php
               
	<script        src="leaflet/leaflet.js">    </script>     	
	<script        src="leaflet/leaflet-routing-machine.js"> </script>	
	<!-- <script src="leaflet/leaflet-button-control.js"></script> -->	
	<script src="leaflet/Control.Geocoder.js"></script>		
	<!-- <script src="js/jquery-1.10.2.min.js"></script>	-->
	<script src="https://code.jquery.com/jquery-1.12.4.js"></script>  
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js">	</script>				  
	<!-- Bootstrap -->     <script src="js/bootstrap.js"></script>	
	<!-- Meus arquivos  - inicio dia 04/04/2018 hoje 07/06/2018 -->	
	
	<!-- <script src="js/App.js"></script>	
	<script src="js/Passageiro.js"></script>	
	<script src="js/Corrida.js"></script>	
	<script src="js/Motoristas.js"></script>	
	<script src="js/status.js"></script>	
	<script src="js/js001.js"></script>	-->
			 
				  
           
</body></html>