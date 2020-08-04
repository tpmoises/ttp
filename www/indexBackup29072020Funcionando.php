<?php 
   //INDEX.PHP DO APP Passageiro
   session_start();
 /*  try {
      if (file_exists('js/extremoz.osm')) {
         $xml = simplexml_load_file('js/extremoz.osm');
         $result = $xml->xpath("//node/@visible");
         foreach ($result as $att) {
            unset($att[0]);
         }
         $result = $xml->xpath("//node/@version");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//node/@changeset");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//node/@timestamp");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//node/@user");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//node/@uid");
         foreach ($result as $att) {
            unset($att[0]);
         }


         $result = $xml->xpath("//way/@visible");
         foreach ($result as $att) {
            unset($att[0]);
         }
         $result = $xml->xpath("//way/@version");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//way/@changeset");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//way/@timestamp");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//way/@user");
         foreach ($result as $att) {
            unset($att[0]);
         }

         $result = $xml->xpath("//way/@uid");
         foreach ($result as $att) {
            unset($att[0]);
         }



       //  for($i=0; $i < count($xml->{'osm'}->{'node'}); $i++) {
   
           // if(strval($xml->{'user-manager'}->{'auth-config'}->{'user'}[$i]->name) == $name) {
      //          unset($xml->{'user-manager'}->{'osm'}->{'node'}[$i]->visible);
          //  }
        
     //   }
        $xml->asXML('js/extremoz2.osm'); // XML original com o novo elemento
       //  print_r($xml);
     } else {
         exit('Falha ao abrir extremoz.osm');
     }  
  } catch (Exception $e) {
      echo 'Exceção capturada: ',  $e->getMessage(), "\n";
  }  */
  
  

   //for ($i = 1; $i <= 10; $i++) {
  //    echo $i;
 // }

  /* foreach ($osm->node->[0]->rating as $rating) {
      switch((string) $rating['type']) { // Get attributes as element indices
      case 'thumbs':
          echo $rating, ' thumbs up';
          break;
      case 'stars':
          echo $rating, ' stars';
          break;
      }
  }  */
   ?>
   <?php  
         
   
               if (isset($_GET['sair'])){
               $logout= $_GET["sair"]; 
               if ($logout=="yes"){
                   try{                 
                   session_unset();                    
                  echo "<script>window.location.href = 'https://ttp-sandbox.drmoisessantos.com';</script>";//ou https://teletransporte.net
                  //  echo "<script>alert('Ao entrar novamente no App limpe os dados em Configurar>Apps e Notificações>ttp>Armazenamento>Limpar dados no seu Android...Estamos resolvendo isso...isso é apenas um protótipo nosso do App ');window.location.href = 'https://teletra nsporte.net';</script>";
                    
                   } catch(Exception $e) {        echo "Erro: index.php{$e->getMessage()}";    }   
                        
                 }} ?>
<!DOCTYPE html>
<html lang="pt-br">
   <head>
      <meta name="google-site-verification" content="UMSEg2bz6OKlG0rKM9LSWVFWfwhLd0DajGa03TZ1pdI" /> 
      <title>Atenção! SANDBOXTeletransporte.net - TT Passageiros <?php 
         if (isset($_SESSION["login"])) {echo $_SESSION["login"];} ?></title>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="description" content="Módulo usuario" />
      <meta name="keywords" content="" />
      <meta name="author" content="Moises Santos" />
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta http-equiv="Content-Security-Policy" content="
      default-src  none; 
	  
	  img-src * data: blob: 
	  https://ttm.drmoisessantos.com  https://www.facebook.com https://connect.facebook.net/en_US/sdk.js
	  https://teletransporte.net https://www.facebook.com/v6.0/plugins/login_button.php; 
	  
	  child-src blob: 'self' https://www.facebook.com https://connect.facebook.net/en_US/sdk.js https://www.facebook.com/v6.0/plugins/login_button.php s-static.ak.facebook.com static.ak.facebook.com www.facebook.com https://web.facebook.com;  
	  
	  frame-src 
	  'self' s-static.ak.facebook.com static.ak.facebook.com www.facebook.com https://web.facebook.com;
	  
	  script-src 	  
	  'self' 'unsafe-inline' 'unsafe-eval' connect.facebook.net 
	  https://code.jquery.com/jquery-1.12.4.js 
	  https://code.jquery.com/ui/1.12.1/jquery-ui.js 	  
	  https://ttm.drmoisessantos.com
	  https://teletransporte.net 	  
	  https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js	  
	  https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js 
	  https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.js
	  https://www.facebook.com
	  https://www.facebook.com/v6.0/plugins/login_button.php
	  https://unpkg.com/leaflet.marker.slideto@0.2.0/Leaflet.Marker.SlideTo.js
	  https://nominatim.openstreetmap.org/ https://web.facebook.com;
	  
	  
	  style-src 
	  'self' data: 'unsafe-inline' 
	  https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css
	  https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css 
	  https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css
	  
	  https://ttm.drmoisessantos.com 
	  https://www.facebook.com
	  https://connect.facebook.net/en_US/sdk.js
	  https://www.facebook.com/v6.0/plugins/login_button.php
	  https://web.facebook.com
	  https://teletransporte.net ;
	  
	  media-src 
	  'self' https://teletransporte.net  https://ttm.drmoisessantos.com https://www.facebook.com https://connect.facebook.net/en_US/sdk.js https://www.facebook.com/v6.0/plugins/login_button.php https://web.facebook.com; 
	  
	  font-src 'self' https://teletransporte.net https://ttm.drmoisessantos.com  https://www.facebook.com https://connect.facebook.net/en_US/sdk.js https://www.facebook.com/v6.0/plugins/login_button.php;
	   
	  connect-src  
	  'self' https://ttm.drmoisessantos.com 
	  https://overpass-api.de/api/interpreter
	  https://overpass.kumi.systems/api/interpreter
	  https://teletransporte.net 
	  https://api.mapbox.com 
	  https://nominatim.openstreetmap.org 
	  https://code.jquery.com/jquery-1.12.4.js 
	  https://code.jquery.com/ui/1.12.1/jquery-ui.js 	  
	  https://www.facebook.com
	  https://www.facebook.com/v6.0/plugins/login_button.php
	  https://connect.facebook.net/en_US/sdk.js
	  https://graph.facebook.com
	  https://web.facebook.com
	  https://*.facebook.com/v6.0/
	  
	  ws://localhost:3000" />

      <link         rel="stylesheet"         href="leaflet/leaflet.css"    />
      <link         rel="stylesheet"         href="leaflet/leaflet-routing-machine.css"    />
      <link rel="stylesheet" href="leaflet/Control.Geocoder.css" />
      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->   
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->    
      <!--[if lt IE 9]>      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script> 
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>    <![endif]-->		
      <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->  	
      <link rel="shortcut icon" href="favicon.ico">
      <!-- Bootstrap -->    
      <link rel="stylesheet" href="css/bootstrap.css">
      <!-- Requer -->		
      <!-- FOR IE9 below -->	<!--[if lt IE 9]>	
      <script src="js/modernizr-2.6.2.min.js"></script>	
      <script src="js/respond.min.js"></script>	
      <![endif]-->     
      <!-- antigo  -->
      <!-- <script src='https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js'></script>
      <link href='https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css' rel='stylesheet' /> -->
      
      
<script src='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.js'></script>
<link href='https://api.mapbox.com/mapbox-gl-js/v1.11.1/mapbox-gl.css' rel='stylesheet' />


      <link rel="stylesheet" href="css/css.css" />
   </head>
   <!--Fim head -->
   <body>
       <div id="fb-root"></div>
    
     
<script>
//id primeio app facebook 609463026453550
// id app test1 com funcionalidades para avaliar (lista de amigos): 1940074352803565
window.fbAsyncInit = function() {
    "use strict";
    FB.init({
      appId      : '609463026453550',
      cookie     : true,
      xfbml      : true,
      version    : 'v6.0'
    });
    //alert('fbAsyncInit')  ;
   FB.AppEvents.logPageView();
   // {"fields":"id,first_name,last_name,picture,friends"} para usar amigos do face-suspenso
   function setGetDadosPassageiro(){
            FB.api(
          '/me',
          'GET',
           {"fields":"id,first_name,last_name,picture"},
           function(response) {
               var url_foto="https://graph.facebook.com/" + response.id + "/picture";
               /** var amigosFace='';//response.friends.data; suspenso em 30/03/2020 corona
                   
              
                function criaIHamigosFace(amsFace){
                   var varsSessaoAmigosFace;
                   var virgula=",";
                         varsSessaoAmigosFace="";
                         for (var x=0;x<amsFace.length;x++){
                             if(x==amsFace.length-1){
                                 varsSessaoAmigosFace+=amsFace[x].id;
                             }else{
                                 varsSessaoAmigosFace+=amsFace[x].id+virgula;
                             }
                             
                             
                         }
                         return varsSessaoAmigosFace;//string tipo "id,id..." dos amigos do face
                     }
                                
               //alert(amigosFace); */
               var StringIdAmigosFace='';//criaIHamigosFace(amigosFace) ;
               if (!(response.id=='undefined')){
                    $.post('php/cadastraPassageiroViaFacebook.php', {//cadastra/pega dado passageiro
                "id_facebook": response.id,            
                "first_name": response.first_name,
                 "last_name": response.last_name,
                  "url_foto":url_foto,
                  "StringIdAmigosFace":StringIdAmigosFace
                 },
                  function(r) {
                                window.location.href = 'https://ttp-sandbox.drmoisessantos.com';//  https://teletransporte.net
                }); 
               }else{
                  // alert(response.id);
                   //window.location.href = 'https://teletr ansporte.net';
               }
                                     }
             );
       //     FB.api('/me/friends',{ fields: 'name,id' }, function(r) {
     //alert(r.name); }); //.. it only has two values name and id. 
   }

   FB.Event.subscribe('auth.login', function(response){ //Ocorre quando loga via facebook       
           setGetDadosPassageiro();  
      
     });
 
 
     FB.Event.subscribe('auth.logout', function(response){ //Ocorre quando loga via facebook       
  //    FB.login(function(response) {
            // Original FB.login code
       //     }, { auth_type: 'reauthenticate' });
      
     });
   
    FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
             var uid = response.authResponse.userID;
             var accessToken = response.authResponse.accessToken;
            
              
         } else if (response.status === 'not_authorized') {
             console.log('not_authorized');
         } else {
             console.log('is not logged');
            <?php if (isset($_SESSION['login'])) { ?>
               window.location.href = 'https://ttp-sandbox.drmoisessantos.com/index.php?sair=yes';  
             <?php } ?>  
         }
     });
       
    };

      (function(d, s, id){
         var js, fjs = d.getElementsByTagName(s)[0];
         if (d.getElementById(id)) {return;}
         js = d.createElement(s); js.id = id;
         js.src = "https://connect.facebook.net/en_US/sdk.js";
         fjs.parentNode.insertBefore(js, fjs);
       }(document, 'script', 'facebook-jssdk'));
       
       

</script>

     
         
      <?php   
         echo   "<input type='hidden' id='IHDistBusca' value='0'>"; 
         echo   "<input type='hidden' id='IHDistTraj' value='0'>"; 
         
         echo   "<input type='hidden' id='IHTimeD1' value='0'>"; 
         echo   "<input type='hidden' id='IHTimeD2' value='0'>"; 
         
         echo   "<input type='hidden' id='IHraioChamDir' size='4' value='10'>"; 
         echo   "<input type='hidden' id='IHidFiltroSoAmigos'  value='todos'>"; 
         echo   "<input type='hidden' id='IHsugDest' size='4' value=''>"; 
         
         echo   "<input type='hidden' id='IHsugPromocao' size='4' value=''>"; 
         
         echo   "<input type='hidden' id='IHStatusPassageiro' size='8' value='00000000'>"; 
         echo   "<input type='hidden' id='IHficticio' size='1' value='1'>"; 
         //".$_SESSION['qUnidade']."
              echo   "<input type='hidden' id='IHqUnidade' value=''>";//km/litro
         
         //".$_SESSION['valorUnidade']."
          echo   "<input type='hidden' id='IHvalorUnidade' value=''>";// preco por unidade combustivel
          echo   "<input type='hidden' id='IHvalorMinuto' value='0.3'>";//R$ 0,2
          echo   "<input type='hidden' id='IHmargemLucro' value='0.45'>";//30%
          
          
           
         
         if(!isset($_SESSION['login'])){	
          
         
         ?>				 
      <p class="avisoSimulacao centraliza" id="avisoSimulacao">Modo visitante. Faça o login!</p>
      <?php }?>
      <nav id="menus" class="navbar navbar-inverse">
         <div class="container-fluid">
            <div class="navbar-header">
               <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">       
               <span class="icon-bar"></span>        
               <span class="icon-bar"></span>        
               <span class="icon-bar"></span>                              
               </button>  
               <a class="navbar-brand" href="/" id="nSite">TT</a> <!-- valor TT -->      
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
               <!--Início Itens Menu -->			 
               <ul class="nav navbar-nav">
                  <li class="active"><a id="inicio" href="/">Início</a></li>
                  <li><a  id="fazerViagem" href="#">Fazer viagem...</a></li>
                  <li class="dropdown">
                     <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="voceeagente">Você e a gente<span class="caret"></span></a>
                     <ul class="dropdown-menu">
                        <?php  if(!isset($_SESSION['login'])){ ?>
                        <li><a id="suaQualificacao" href="#">Sua qualificação...</a></li>
                        <li><a id="viagensFeitas" href="#">Viagens feitas... </a></li>
                        <?php }
                           ?>
                        <li><a id="validacoes" href="#">Validações... </a></li>
                     </ul>
                  </li>
                  <li class="dropdown">
                     <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="configuracoes">Configurações<span class="caret"></span></a>          
                     <ul class="dropdown-menu">
                        <li><a href="#" id="distParaChamadasDiretas" >Distância e MAmigos...</a> </li>
                        <li><a href="#" id="formasDePagamento" >Formas de pagamento...</a> </li>
                        <?php  if(!isset($_SESSION['login'])){ ?>
                        <li><a href="#" id="teletransporte">Teletransporte... </a></li>
                        <li><a href="#" id="compartilharViagem" >Compartilhar viagem com...</a></li>
                        <li><a href="#" id="notificações" >Notificações... </a></li>
                        <li><a href="#" id="idioma" >Idioma... </a></li>
                        <li><a href="#" id="suasReferencias" >Suas referêcias geográficas... </a></li>
                        <?php  } ?>
                     </ul>
                  </li>
                  <li class="dropdown">
                     <a class="dropdown-toggle" data-toggle="dropdown" href="#" id="ajuda">Ajuda<span class="caret"></span></a>
                     <ul class="dropdown-menu">
                        <li><a href="#" id="faleConosco" >Fale Conosco...</a></li>
                        <li><a href="#" id="politica" >Politicas de privacidade...</a></li>
                        <li><a href="#" id="termosLegais" >Termos legais...</a></li>
                        <li><a href="#" id="excluirContaEDados" >Excluir conta...</a></li>
                     </ul>
                  </li>
               </ul>
               <!--Início dos itens a direita -->					 
               <ul class="nav navbar-nav navbar-right">
                  <!--  Php: Diz se o passageiro está logado -->				 
                  <?php 
                     if(isset($_SESSION['login'])){	
                     
                       
                     
                       echo   "<input type='hidden' id='IHcodigo' value='".$_SESSION['codigo']."'>";
                     
                     echo   "<<input type='hidden' id='IHcelular' value=''>"; 
                     echo   "<input type='hidden' id='IHvalidado' value=''>";
                                         echo   "<input id='login' type='hidden' value='".$_SESSION['login']."' >";						   
                     echo   "<li><a href='#'><span class='glyphicon glyphicon-user'></span> Bem vindo ".$_SESSION['login']."!</a></li>";
                            
                             if (isset($_SESSION["id_facebook"])){
                                 
                                  echo   "<li><a id='ASairViaFace' href='#'><span class='glyphicon glyphicon-log-out'></span> Sair</a></li>";
    
    
    
    
                                  
   
                             }else{
                             
                             echo   "<li><a href='index.php?sair=yes'><span class='glyphicon glyphicon-log-out'></span> Sair</a></li>";	    
                             }
                     
                      
                     } else{
                     if (isset($_SESSION['loginErro'])){
                     echo  "<li><a href='#' id='erro'><span class='glyphicon glyphicon-exclamation-sign'></span>" .$_SESSION['loginErro']."</a></li>";
                     unset($_SESSION['loginErro']);
                     }
                   //  echo  "<li><a href='#' id='cadastrar'><span class='glyphicon glyphicon-user'></span> Cadastrar</a></li>";
                     echo   "<li><a href='#' id='entrar'><span class='glyphicon glyphicon-log-in'></span> Entrar</a></li>";		      
                     unset($_SESSION['login']);
                      }?>
               </ul>
               <!--Fim dos itens a direita -->				 
            </div>
         </div>
      </nav>
      <!--Fim nav -->
      <!-- Box principal -->
      <!--Mapa -->
      <div id="map"></div>
      <!--Fim Mapa -->
      <br>
      <?php
      //lembra de tirar este parâmetro quando ELEVAR de Teste Interno para Producao no gitHub
      //e tirat condicao daqui
      // lembrar de nomear parametro de origi para "test" mesmo fica mais claro
      if (isset($_GET['testInterno'])){
            echo ' <div id="btComFome"><br/><a href="/foods" class="btCSD">Com fome?</a> </div>';
         }?>
      <div class="rodape">
      </div>
      <!-- Div dos botoes  a esquerda: ache-me,etc -->	 
      <div id="myBotoesEsq">		
         <a  id="miniBtAcheme" href="#" class="btn btn-info btn-block">
         <span class="glyphicon glyphicon-map-marker"></span>         
         </a>
        
      </div>
      <!-- Botão destino id="fazerViagem2" -->	 
      <div id="btDestino">
         <button type="button" id="fazerViagem2"  class="btn btn-primary btn-block btn-lg">Tudo ok? Informe destino...</button>	
         <a href='pp.html'>Politica de Privacidade</a>
         <br>	   
         <a href='termosdoservico.html'>Termos legais e dos serviços</a>
      </div>
      <div id="bts">
         <div class="dropdownRapido">
            <a id='btm' class="dropbtn btCSD">Rápido</a>
            <div id="myDropdown" class="dropdownRapido-content">
               <a href='#' id='distParaChamadasDiretas2' >Distancia e MAmigos</a>
               <a href="#" id='escolhaMotorista'>Escolha Motorista</a>    
            </div>
         </div>
         <div id="btLimpar"><br/><a href="/" class="btCSD">Limpar</a> </div>
           
         <?php if (isset($_SESSION['login'])) {?>
            <div id="DivfotoPas"> <img id="ImgFotoPas"  class="w3-circle"  alt="Passageiro" /> </div>
          <?php echo '<script> if (document.getElementById("login"))  {     document.getElementById("ImgFotoPas").src=';echo "'".$_SESSION["url_foto"]."'";  echo ';}</script>';
?>
         <?php } ?>
      </div>
      <!-- <div id="dxy" style="top:0px; width:100px; height:100px; z-index:10100"><div style="width:350%;"><img src="imgs/aba.jpg" width="100%" ><a href='https://play.google.com/store/apps/details?id=net.teletransporte.ttpassageiro' target="_blank"><img src="imgs/PeqttpPlayStore.jpg" alt="Baixar App TT Passageiros no Google Play" width="100%"></a><br>Baixar App TT Passageiros no Google Play<br> Em testes<div></div>  -->
      <!-- Janela modal  generica -->
      <div class="modal fade" id="janelaModal" tabindex="-1" role="dialog" aria-labelledby="tituloJanelaModal" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-header">
                  <h5 class="modal-title" id="tituloJanelaModal">Título</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>				  
               </div>
               <div id="conteudoModal" class="modal-body">
                  local conteudo aqui	   				   
               </div>
               <div class="modal-footer">													  
               </div>
            </div>
         </div>
      </div>
      <!-- Painel motorista escolhido -->
      <div  id="painelMotoristaEscolhido" class="container">
         <div class="panel panel-primary">
            <div id="cabPainelMotoristaEscolhido" class="panel-heading">Seu motorista</div>
            <div id="conteudoPainelMotoristaEscolhido" class="panel-body">
               <span>Nome:</span><em id="nomeMotoristaEscolhido"></em><br/>
               <img class="foto" src="/imgs/sf.png" /><br/>
               <button id="btContatoPainelMotoristaEscolhido" class="btn btn-primary" type="button">Contato(<span  id="contadorMsgs"></span>)</button> 
               <button id="btCancelarPainelMotoristaEscolhido" class="btn btn-danger" type="button">Cancelar*</button>
               <p>*Custo proporcional ao deslocamento feito at&eacute; voc&ecirc;.</p>
               <p>&nbsp;</p>
            </div>
         </div>
      </div>
      <div class="modal fade" id="janelaModalChat" tabindex="-1" role="dialog" aria-labelledby="tituloJanelaModal" aria-hidden="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content alturaMaxChat">
               <div class="modal-header">
                  <h5 class="modal-title" id="tituloJanelaModal">Entre em contato</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span></button>				  
               </div>
               <div id="conteudoModal" class="modal-body">
                   
                  <div id='chat' style='display:none;height:150px;overflow-y: scroll;' class="col-sm-3 col-sm-offset-4 frame" ><!-- class="col-sm-3 col-sm-offset-4 frame" -->
                     <ul id='ull'></ul>
                     
                  </div>
                  <div>
                        <div class="msj-rtaAnt macroAnt">
                           <div style="background:whitesmoke !important" class="text text-r" ><!--  -->
                              <input class="mytext" placeholder="Digite uma mensagem"/>
                             
                                <span style="left:90%;top:-45px;" id="spSeta" class="glyphicon glyphicon-share-alt"></span>
                                <!-- <div style="padding:10px;">
                               </div> -->
                           </div>
                        </div>
                        
                     </div>
                  
               </div>
               <div class="modal-footer">													  
               </div>
            </div>
         </div>
      </div>
      <!-- Modal Login -->
      <div id="id01" class="modallogin">
         <div class="modal-content">
            <div class="modal-header">
               <h3 class="modal-title" id="tituloLogin">Login</h3>
               <button type="button" onclick="document.getElementById('id01').style.display='none'" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span></button>				  
            </div>
            <!-- Modal Content -->
            <form method="post" class="modal-contentLogin animate" action="/php/entraPas.php" >
               <div class="imgcontainer">
                  <img class="foto" src="/imgs/sf.png" alt="Avatar" class="avatar">
               </div>
               <div>
                    <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" scope="public_profile" data-use-continue-as="true"></div>
                  <br><br>
                  <!-- <p>OU</p>
                  <label for="login"><b>Login</b></label>
                  <input type="text" inputmode="numeric" autocomplete="off" placeholder="Entre com CPF" name="login" required>
                  </br>
                  <label for="senha"><b>Senha</b></label>
                  <input type="password" placeholder="Entre com a senha"  name="senha" required>
                  </br> 
                  </br>
                  <button type="submit" class="btn btn-primary btn-lg" >Entrar</button>
                  
                  <label>
                  <input type="checkbox" checked="checked" name="lembrar-me">Lembrar-me
                  </label> 
                  -->
               </div>
               <div>
                  </br>	  
                  <button type="button" onclick="document.getElementById('id01').style.display='none'" class="cancelbtn">Fechar</button>
                  <!--
                  </br>
                  <span><a href='#' id="recSenha">Recuperar senha?</a></span>	
                  </br>
                  <span ><a href="#" onclick="cadastrar()" >Fazer cadastro</a></span>	
                  </br>
                  <p><a href="https://play.google.com/store/apps/details?id=net.teletransporte.ttm&hl=pt_BR" target="_blank" >Seja um motorista</a></p>
                  -->
                  
               </div>
               
            </form>
           
            <div class="modal-footer">													  
            </div>
         </div>
      </div>
      <!-- Modal DivCam -->
      <div id="DivCam" class="modallogin">
         <div class="modal-content">
            <div class="modal-header">
               <h3 class="modal-title" id="tituloLogin">Identificação por imagem</h3>
               <button type="button" onclick="document.getElementById('DivCam').style.display='none'" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span></button>				  
            </div>
            <!-- Modal Content -->
            <div>
               <video id="video" width="320" height="240" preload autoplay loop muted ></video>
               <canvas id="canvas" width="320" height="240"></canvas>
            </div>
            <div>
               <button type="button" onclick="document.getElementById('DivCam').style.display='none'" class="cancelbtn">Fechar</button>
               <button type="button"  class="btn btn-primary btn-lg" id="capture">Escolher motorista...</button>
            </div>
            <div class="modal-footer">													  
            </div>
         </div>
      </div>
      <!-- </div> <!-- Fim do boxPrincipal>   -->        
      <script        src="leaflet/leaflet.js">    </script>     	
      <script        src="leaflet/leaflet-routing-machine.js"> </script>	
      <!-- <script src="leaflet/leaflet-button-control.js"></script> -->	
      <script src="leaflet/Control.Geocoder.js"></script>		
      <script src="https://unpkg.com/leaflet.marker.slideto@0.2.0/Leaflet.Marker.SlideTo.js"></script>		
      <!-- <script src="js/jquery-1.10.2.min.js"></script>	-->
      <script src="js/jquery-1.12.4.js"></script>  
      <script src="js/jquery-ui.js">	</script>				  
      <!-- Bootstrap -->     <script src="js/bootstrap.js"></script>	
      <!-- Meus arquivos  - inicio dia 04/04/2018 hoje 07/06/2018 -->	
      <script src="js/App.js"></script>	
      <script src="js/Passageiro.js"></script>	
      <script src="js/Corrida.js"></script>	
      <script src="js/Motoristas.js"></script>	
      <script src="js/status.js"></script>	
      <script src="js/js001.js"></script>	
      <script src="js/tracking-min.js"></script>
      <script src="js/data/face-min.js"></script>
   </body>
</html>