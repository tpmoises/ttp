<?php
//Modulo ttp
 try { 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");     
 session_start();
$KMN=1.852;//Constante Milhas Nauticas - VALIDO PARA DISTANCIAS MENORES QUE 800MN
$lat_pas_km = $_GET["lat"]*60*$KMN; 
$lng_pas_km = $_GET["lng"]*60*$KMN;  	
$status=$_GET["status"];
$stringIdAmigosFace=$_SESSION["amigosFace"];
$matIdAmigosFace=explode(',',$stringIdAmigosFace);//retorna $matIdAmigosFace[0],$matIdAmigosFace[1],...
$quqntId=count($matIdAmigosFace);

if($quqntId>0){
    $condAmigosDoFace="";
    for ($i = 0;$i < $quqntId; $i++) {
//Acessa as variÃ¡veis de sessao com amigos do Face queforam inicializadas em cadastraPassageiroViaFacebook.php
        if ($i==($quqntId-1)){              
          $condAmigosDoFace=$condAmigosDoFace.' app_motoristas.id_facebook='.$matIdAmigosFace[$i]; //ultimo da  
        }else{
         $condAmigosDoFace=$condAmigosDoFace.' app_motoristas.id_facebook='.$matIdAmigosFace[$i].' or ';    
         
        }
        
    }
}

//$condAmigosDoFace="app_motoristas.id_facebook=".$matIdAmigosFace[0]." or "."app_motoristas.id_facebook=".$matIdAmigosFace[1];
require_once "funcoes.php";

usleep(100000);//milionÃ©simos de segundos. 1s=1000000
$dist_max_emb=4.0;//configurado pelo motorista 1.0
$dist_viavel=6.0;// caculado pelo sistema 2.0
//COMPRIMENTO^2 = DLA^2 + DLO^2
//$dist_max^2 = 5*5 
//$dist_max = 5 
//DLA^2=(lat_pas_km - (lat_posicao*"(-.$KMN.")))^2
// DLO^2=(lng_pas_km-(lng_posicao*(-".$KMN.")))^2
if ($dist_max_emb>=$dist_viavel){
 $dist_max=$dist_max_emb;	
} else
{
	 $dist_max=$dist_viavel;
}
//Modulo ttp
//COMPRIMENTO^2=$dist_max^2
 //-5.848,-35.2 moises
 //$dist_max=10 km
 $dist_max=$_GET["raioChamDir"];
 $condAmizade=$_GET["condAmizade"];
 
          
 
 $condicao="SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2))<(".$dist_max.") ";
 //SELECT  codigo, apelido, lat_posicao,lng_posicao, dist_max_emb, dist_viavel,conceito,posicao FROM app_motoristas WHERE ((((10.8261662092-(lat_posicao*(-1.852)))^2)+((65.1873425332-(lng_posicao*(-1.852)))^2))<=(10^2) )  GROUP BY conceito LIMIT 10
 if (isset($status)){
	 $sql="SELECT  SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido, codigo, nome, lat_posicao,lng_posicao, conceito,posicao,ficticio, qUnidade,valorUnidade,valorMinuto,margemLucro,url_avatar, cat_cnh FROM app_motoristas WHERE (".$condicao ." and status='$status')  ORDER BY conceito, distancia LIMIT 10";   
	 
     //inclue amigo e amigos do facebook em 12/02/2020
     if ($condAmizade=='soAmigos'){
		 $codPassageiro=$_GET['codPassageiro'];
         $sql="SELECT distinct  SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido, app_motoristas.codigo, app_motoristas.nome, lat_posicao,lng_posicao, conceito,posicao,ficticio, qUnidade,valorUnidade,valorMinuto,margemLucro,motorista, tipo,url_avatar, cat_cnh,id_facebook FROM app_motoristas, rede_amigos  WHERE ((".$condicao." and status='$status' and tipo=1 and app_motoristas.codigo=rede_amigos.motorista  and rede_amigos.passageiro=$codPassageiro) or (".$condicao." and status='$status' and tipo=1 and (".$condAmigosDoFace.")))  ORDER BY conceito, distancia";   
	 }
	 
	 

	 }else{
	  $sql="SELECT  SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido, codigo, nome, lat_posicao,lng_posicao, conceito,posicao,ficticio, qUnidade,valorUnidade,valorMinuto,margemLucro,url_avatar, cat_cnh FROM app_motoristas WHERE (".$condicao .")  ORDER BY conceito, distancia LIMIT 10";    
	  if ($condAmizade=='soAmigos'){
		 $codPassageiro=$_GET['codPassageiro'];
         
		 
		 //retira o status
	     $sql="SELECT  SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido, app_motoristas.codigo, app_motoristas.nome, lat_posicao,lng_posicao, conceito,posicao,ficticio, qUnidade,valorUnidade,valorMinuto,margemLucro,motorista, tipo,url_avatar, cat_cnh FROM app_motoristas, rede_amigos  WHERE (".$condicao." and app_motoristas.codigo=motorista and passageiro=$codPassageiro and tipo=1)  ORDER BY conceito, distancia LIMIT 10";   
     }
 }

    	

 //$sql="SELECT  apelido, lat_posicao,lng_posicao,posicao, conceito FROM app_motoristas WHERE (1)";   	
    
	$pdoConnection = require_once "conexaoPDO.php";
	$resultados = getConsultas($pdoConnection,$sql); 
	  $cont=0;
      $cont2=0;
      $codAnt=-1;
     foreach($resultados as $resultado):         
          $cont++;       
     endforeach;

	$matJson='{"motoristas":[';
    foreach($resultados as $resultado): 
	$cont2++;
	if ($cont>$cont2){
       if ($codAnt!=$resultado['codigo']){//para retirar valores repetidos do select soAmigos

            if ($resultado['id_facebook']){//acrescenta id_facebook ao resultado
                $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","nome":"'.$resultado['nome'].'","apelido":"'.$resultado['apelido'].'","posicao":"'.$resultado['posicao'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","qUnidade":"'.$resultado["qUnidade"].'","valorUnidade":"'.$resultado["valorUnidade"].'","valorMinuto":"'.$resultado["valorMinuto"].'","margemLucro":"'.$resultado["margemLucro"].'","url_avatar":"'.$resultado['url_avatar'].'","cat_cnh":"'.$resultado['cat_cnh'].'","ficticio":"'.$resultado['ficticio'].'","Dist":"'.$resultado['distancia'].'","id_facebook":"'.$resultado['id_facebook'].'"},');	

            }else{
                $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","nome":"'.$resultado['nome'].'","apelido":"'.$resultado['apelido'].'","posicao":"'.$resultado['posicao'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","qUnidade":"'.$resultado["qUnidade"].'","valorUnidade":"'.$resultado["valorUnidade"].'","valorMinuto":"'.$resultado["valorMinuto"].'","margemLucro":"'.$resultado["margemLucro"].'","url_avatar":"'.$resultado['url_avatar'].'","cat_cnh":"'.$resultado['cat_cnh'].'","ficticio":"'.$resultado['ficticio'].'","Dist:":"'.$resultado['distancia'].'"},');	 
            }
       
       }
       $codAnt=$resultado['codigo'];
	}else{
        if ($codAnt!=$resultado['codigo']){
            if ($resultado['id_facebook']){
                $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","nome":"'.$resultado['nome'].'","apelido":"'.$resultado['apelido'].'","posicao":"'.$resultado['posicao'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","qUnidade":"'.$resultado["qUnidade"].'","valorUnidade":"'.$resultado["valorUnidade"].'","valorMinuto":"'.$resultado["valorMinuto"].'","margemLucro":"'.$resultado["margemLucro"].'","url_avatar":"'.$resultado['url_avatar'].'","cat_cnh":"'.$resultado['cat_cnh'].'","ficticio":"'.$resultado['ficticio'].'","Dist":"'.$resultado['distancia'].'","id_facebook":"'.$resultado['id_facebook'].'"}');
            }else{
                $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","nome":"'.$resultado['nome'].'","apelido":"'.$resultado['apelido'].'","posicao":"'.$resultado['posicao'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","qUnidade":"'.$resultado["qUnidade"].'","valorUnidade":"'.$resultado["valorUnidade"].'","valorMinuto":"'.$resultado["valorMinuto"].'","margemLucro":"'.$resultado["margemLucro"].'","url_avatar":"'.$resultado['url_avatar'].'","cat_cnh":"'.$resultado['cat_cnh'].'","ficticio":"'.$resultado['ficticio'].'","Dist:":"'.$resultado['distancia'].'"}');
            }
            }
        
        $codAnt=$resultado['codigo'];
	}
      //utf8_encode
    endforeach;	
	$matJson=$matJson.']}';
	echo $matJson;
	
   
  $_SESSION['qUnidade']=$resultado["qUnidade"];
  $_SESSION['valorUnidade']=$resultado["valorUnidade"]; 
  $_SESSION['valorMinuto']=$resultado["valorMinuto"];
  $_SESSION['margemLucro']=$resultado["margemLucro"];
	

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
 //Modulo ttp
?>
