<?php 
   //INDEX.PHP DO APP Passageiro
   //session_start();   
  
   if (isset($_GET['fazerAmizadeMotorista'])){
  
       $codMotAmizade=$_GET['fazerAmizadeMotorista'];      
       if($codMotAmizade!==undefined){
        $codPassageiro=$_GET['codPassageiro'];        
       if ((!empty($codPassageiro))&&(!empty($codMotAmizade))){
  
            require_once "funcoes.php";
            $amizade=setAmizade(1,$codPassageiro,$codMotAmizade);
               if ($amizade=='1' || $amizade==1){
                 echo "<script>alert('Amizade feita com sucesso!')</script>";    
               }else{
                     echo "<script>alert('Não foi possivel fazer amizade!')</script>";    
               }
       }
      
       
       }
   }
   
               if (isset($_GET['sair'])){
               $logout= $_GET["sair"]; 
               if ($logout=="yes"){
                   try{
                   //unset($_SESSION['login']); está  sicronizado com pagina ativa. Depois vê essa solucao.
                   session_unset();
                   } catch(Exception $e) {        echo "Erro: index.php{$e->getMessage()}";    }   
                        
                 }} 
            ?>
<!DOCTYPE html>
<html lang="pt-br">
   <head>
      <title>Convite Teletransporte.net - TT Passageiros</title>
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
	  s-static.ak.facebook.com static.ak.facebook.com www.facebook.com https://web.facebook.com;
	  
	  script-src 	  
	  'self' 'unsafe-inline' 'unsafe-eval' connect.facebook.net 
	  https://code.jquery.com/jquery-1.12.4.js 
	  https://code.jquery.com/ui/1.12.1/jquery-ui.js 	  
	  https://ttm.drmoisessantos.com
	  https://teletransporte.net 	  
	  https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.js	  
	  https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.js 
	  https://www.facebook.com
	  https://www.facebook.com/v6.0/plugins/login_button.php
	  https://unpkg.com/leaflet.marker.slideto@0.2.0/Leaflet.Marker.SlideTo.js
	  https://nominatim.openstreetmap.org/ https://web.facebook.com;
	  
	  
	  style-src 
	  'self' data: 'unsafe-inline' 
	  https://api.mapbox.com/mapbox-gl-js/v0.46.0/mapbox-gl.css
	  https://api.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css 
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
	  https://z-m-graph.facebook.com/v6.0/
	  ws://localhost:3000" />

       
      
      <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->   
      <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->    
      <!--[if lt IE 9]>      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script> 
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>    <![endif]-->		
      <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->  	
      <link rel="shortcut icon" href="../../favicon.ico">
      <!-- Bootstrap -->    
      <link rel="stylesheet" href="../../css/bootstrap.css">
      <!-- Requer -->		
      <!-- FOR IE9 below -->	<!--[if lt IE 9]>	
      <script src="../../js/modernizr-2.6.2.min.js"></script>	
      <script src="../../js/respond.min.js"></script>	
      <![endif]-->     
     
      <link rel="stylesheet" href="../../css/css.css" />
   </head>
   <!--Fim head -->
   <body>
       <div id="fb-root"></div>
    
     
<script>
//id primeio app facebook 609463026453550
// id app test1 com funcionalidades para avaliar (lista de amigos): 1940074352803565
window.fbAsyncInit = function() {
    "use strict";
    var codMot=<?php if (isset($_GET['fazerAmizadeMotorista']))
                      {echo $_GET['fazerAmizadeMotorista'] ; }
                      else{
                        echo undefined ;  
                      }
                      ?>;
                      
                      var url_fotoGlobal=<?php if (isset($_GET['url_foto']))
                      {echo "'".$_GET['url_foto']."'" ; }
                      else{
                        echo "'../../imgs/sf.png'" ;  
                      }
                      ?>;
                      document.getElementById('fotoPass').src= url_fotoGlobal;
    
    

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
               var amigosFace='';//response.friends.data; suspenso em 30/03/2020 corona
                   

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
               var StringIdAmigosFace=criaIHamigosFace(amigosFace) ;
               
               //alert(amigosFace);
               
               if (!(response.id=='undefined')){//se diferente de indefinido
                    $.post('../../php/cadastraPassageiroViaFacebook.php', {//cadastra/pega dado passageiro
                "id_facebook": response.id,            
                "first_name": response.first_name,
                 "last_name": response.last_name,
                  "url_foto":url_foto,
                  "StringIdAmigosFace":StringIdAmigosFace
                 },
                  function(codPassageiroRetornado) {
                      //cod
                                window.location.href = 'https://teletransporte.net/convites/amizade.php?fazerAmizadeMotorista='+codMot+'&codPassageiro='+codPassageiroRetornado+'&url_foto='+url_foto+'&self=1';
                }); 
               }else{
                window.location.href = 'https://teletransporte.net/convites/amizade.php?fazerAmizadeMotorista='+codMot;
               }
                                     }
             );
       //     FB.api('/me/friends',{ fields: 'name,id' }, function(r) {
     //alert(r.name); }); //.. it only has two values name and id. 
   }

   FB.Event.subscribe('auth.login', function(response){ //Ocorre quando loga via facebook
         //  alert('aconteceuLogin');
           setGetDadosPassageiro();
   <?php    
 
      
   ?>
      
     });
 
 
   
    FB.getLoginStatus(function(response) {
         if (response.status === 'connected') {
             var uid = response.authResponse.userID;
             var accessToken = response.authResponse.accessToken;
            //  alert('entrouGetLoginStatusConnected');
              <?php 
               if (isset($_GET['sairViaFace'])){
               $logout= $_GET["sairViaFace"]; 
               if ($logout=="yes"){
               ?>
                 FB.logout(function(response) {   
                     try{
                        window.location.href = 'https://teletransporte.net/convites/amizade.php?fazerAmizadeMotorista='+codMot;  
                      }catch (e) {
                             alert("erro na function  FB.logout:  " + e.message);
                      }    
                    
                 });// chama logout
                 try{
                  if (!FB){
                       window.location.href = 'https://teletransporte.net/convites/amizade.php?fazerAmizadeMotorista='+codMot;
                  }   
                 }catch (e) {
                             alert("erro na function  getLoginStatus perto FB.logout:  " + e.message);
                      } 
                 <?php   
                  
                 }}
          ?>
          if(!(isset($_GET['self']))){// e nao veio daqui mesmo desse script
           FB.login(function(response) {
            // Original FB.login code
            }, { auth_type: 'reauthenticate' })
              
          }
         
            
         } else if (response.status === 'not_authorized') {
             console.log('not_authorized');
              FB.login(function(response) {
            // Original FB.login code
            }, { auth_type: 'reauthenticate' })
         } else {
             console.log('is not logged');
             
          //   setGetDadosPassageiro();
            <?php if (isset($_SESSION['login'])) { ?>
               window.location.href = 'https://teletransporte.net/convites/amizade.php?fazerAmizadeMotorista='+codMot; 
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
       
 //      
//document.getElementById('loginConvite').style.display='none'
</script>
      
     
      
      
      
      <div id="loginConvite" class="modallogin">
         <div class="modal-content">
            <div class="modal-header">
               <h3 class="modal-title" id="tituloLogin">Login</h3>
               <button type="button" onclick="" class="close" data-dismiss="modal" aria-label="Close">
               <span aria-hidden="true">&times;</span></button>				  
            </div>
            <!-- Modal Content -->
            <form method="post" class="modal-contentLogin animate" action="/php/entraPas.php" >
               <div class="imgcontainer">
                  <img id="fotoPass" class="foto" src="../../imgs/sf.png" alt="Avatar" class="avatar">
                  
               </div>
               <div>
                    <div class="fb-login-button" data-width="" data-size="medium" data-button-type="login_with" data-auto-logout-link="true" scope="public_profile" data-use-continue-as="true"></div>
                  <br><br>
                  <?php 
                  if (isset($_GET['url_foto'])){?>
                   <p><a href="https://play.google.com/store/apps/details?id=net.teletransporte.ttpassageiro">Agora baixe o TT Passageiros no Google Play <br/><img width="200px" src="../../imgs/ttpGooglePlay.jpg"><br/>
                <img width="200px" src="../../imgs/18-gplay.jpg"></a></p>
                  <?php }
                  ?>
                  <p><a href="https://play.google.com/store/apps/details?id=net.teletransporte.ttm&hl=pt_BR" target="_blank" >Seja um motorista</a></p>
               </div>
               
            </form>
           
            
         </div>
      </div>
     
     <script>
      document.getElementById('loginConvite').style.display = 'block';
     </script>
        
     
      <script src="../../js/jquery-1.12.4.js"></script>  
      <script src="../../js/jquery-ui.js">	</script>				  
      <!-- Bootstrap -->     
      <script src="../../js/bootstrap.js"></script>	
     
     
   </body>
</html>