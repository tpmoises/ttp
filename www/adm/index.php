<?php 
session_start();
//include('ssl.php');      
if(isset($_SESSION['usuarioNome'])){
	echo "Bem vindo! Você está logado.";										
} else{
	echo "Bem vindo! Você está off-line.";
}
?>
 <!DOCTYPE><html lang="pt-br">
 
<head>

	<title>Teste 0.001 22/05/2018 - Simulador</title>

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

<body>      <nav class="navbar navbar-inverse">  <div class="container-fluid">    <div class="navbar-header"> 

     <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">       

	 <span class="icon-bar"></span>        <span class="icon-bar"></span>        

	 <span class="icon-bar"></span>                              </button>  

     


	 <a class="navbar-brand" href="#" id="nSite">TT</a>    </div> <!-- valor TT -->   

	 <div class="collapse navbar-collapse" id="myNavbar">      

	 <ul class="nav navbar-nav">        <li class="active"><a id="inicio" href="#">Início</a></li>	<!-- valor Início -->  	

	 <li><a  id="simularViagem" href="#">Simular viagem...</a></li> 
	 
      
	  <li class="dropdown">   
	 
     <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="analisarViagens">Visualizar<span class="caret">

	 </span></a>          <ul class="dropdown-menu">		    

	 <li><a id="visualizarTodosMotoristas" href="#">Todos os motoristas</a></li>			
	 <li><a id="visualizarSoMotoristasOnLine" href="#">Só motoristas OnLine</a></li>			
	 <li><a id="visualizarSoMotoristasOffLine" href="#">Só motoristas OffLine</a></li>			
     <li><a id="visualizarSoMotoristasCorridaDireta" href="#">Só motoristas Corrida Direta</a></li>	
	 <li><a id="visualizarDeterminadoMotorista" href="#">Determinado motorista</a></li></ul>        

	 </li>	
	 
	 
	 
	 <li class="dropdown">      
	 

	 <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="analisarViagens">Analisar viagens<span class="caret">

	 </span></a>          <ul class="dropdown-menu">		    

	 <li><a id="simulada" href="#">Simulada</a></li>			

	 <li><a id="reais" href="#">Reais</a></li></ul>        

	 </li>	
	 
	 <li class="dropdown">
		 <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="configuracoes">Configurações
		 <span class="caret"></span></a>          
		 <ul class="dropdown-menu">	
       <li>
				<a href="#" id="areas" >Áreas de visualizações...</a>
			 </li>

			 <!--<li>
				<a href="#" id="formasDePagamento" >Formas de pagamento...</a>
			 </li>			
			 <li>
				<a href="#" id="teletransporte">Teletransporte... </a>
			 </li> 				
			 <li>
				<a href="#" id="compartilharViagem" >Compartilhar viagem com...</a>
			 </li>
			 <li> 
				<a href="#" id="notificações" >Notificações... </a>	 
			</li>
			 <li> 
				<a href="#" id="idioma" >Idioma... </a>	 
			</li>
			 <li> 
				<a href="#" id="suasReferencias" >Suas referêcias geográficas... </a>	 
			</li> -->
		 </ul>        
	 </li>	        		   <li class="dropdown">

	 <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="ajuda">Ajuda<span class="caret"></span></a>

	 <ul class="dropdown-menu">								 	

	 <li><a href="#" id="faleConosco" >Fale Conosco...</a></li>									

	 <li><a href="#" id="politica" >Politicas de privacidade...</a></li>

	 <li><a href="#" id="termosLegais" >Termos legais...</a></li>

	 </ul>		   </li>		   		</ul>      <ul class="nav navbar-nav navbar-right">        

	 <li><a href="#"><span class="glyphicon glyphicon-user"></span> Cadastrar</a></li>        

	 <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Entrar</a></li>		      

	 </ul>    </div>  </div></nav>		
	 <div id="map"> </div> 
     <div id="controls"></div>	 	 

	 <div id="myBotoesEsq">		<a  id="miniBtAcheme" href="#" class="btn btn-info btn-block">

	 <span class="glyphicon glyphicon-map-marker"></span>         </a>				  		

	 </div>	        <div id="btAnalisarViagens">		  

	 <button type="button" id="fazerViagem2"  class="btn btn-primary btn-block">Analisar viagens...</button>	 

	 </div>	
     <div id="appPassageiro">	 
	 <p class="tituloApp">App - Passageiro&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- x</p>
	 <iframe src="https://teletransporte.net" allow="geolocation https://teletransporte.net;"  width="330" height="570">
       <p>Your browser does not support iframes.</p>
     </iframe>
	 </div>
	 <div id="appMotorista">
    <p class="tituloApp">App - Motorista&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- x </p>	 
	 <iframe src="https://www.ttm.drmoisessantos.com" allow="geolocation https://www.ttm.drmoisessantos.com;"  width="330" height="570">
       <p>Your browser does not support iframes.</p>
     </iframe></div>
	 <!-- Janela modal   -->				

	 <div class="modal fade" id="janelaModal" tabindex="-1" role="dialog" aria-labelledby="tituloJanelaModal" aria-hidden="true">

	 <div class="modal-dialog" role="document">				<div class="modal-content">				  <div class="modal-header">

	 <h5 class="modal-title" id="tituloJanelaModal">Título</h5>					

	 <button type="button" class="close" data-dismiss="modal" aria-label="Close">					  <span aria-hidden="true">&times;</span>					</button>				  </div>				  

<div id="conteudoModal" class="modal-body">					                   local conteudo aqui	   				   </div>

				  <div class="modal-footer">													  
				  </div>				</div>			  </div>
				  
				  </div>	
                  <input type="hidden" value="" id="hLatLngFinal" />				  
				  <script        src="leaflet/leaflet.js">    </script>     	
				  <script        src="leaflet/leaflet-routing-machine.js"> </script>	
				  <!-- <script src="leaflet/leaflet-button-control.js"></script> -->	
				  <script src="leaflet/Control.Geocoder.js"></script>		
				 <!-- <script src="js/jquery-1.10.2.min.js"></script>	-->
				 <script src="https://code.jquery.com/jquery-1.12.4.js"></script>  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>				  <!-- Bootstrap -->     <script src="js/bootstrap.js"></script>	
				  
				 



				  
				  <!-- Meu arquivo principal - inicio dia 04/04/2018 - Depois de ler sobre POO -->	
				  <script src="js/App.js"></script>	
				   <script src="js/Passageiro.js"></script>	
				   <script src="js/Corrida.js"></script>	
				   <script src="js/Motoristas.js"></script>	
				   <script src="js/status.js"></script>	 
				   
				  <script src="js/jsSimTT.js"></script>	
				 
				  
           
</body></html>