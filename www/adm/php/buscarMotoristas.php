<?php
 try { 
$KMN=1.852;//Constante Milhas Nauticas - VALIDO PARA DISTANCIAS MENORES QUE 800MN
$lat_pas_km = $_GET["lat"]*60*$KMN; 
$lng_pas_km = $_GET["lng"]*60*$KMN;  	
require_once "funcoes.php";
session_start();
usleep(100000);//milionésimos de segundos. 1s=1000000
$dist_max_emb=1.0;//configurado pelo motorista
$dist_viavel=2.0;// caculado pelo sistema
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
//COMPRIMENTO^2=$dist_max^2
 //-5.848,-35.2 moises
 //$dist_max=10 km
 $condicao="SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2))<(".$dist_max.") ";
 //SELECT  codigo, apelido, lat_posicao,lng_posicao, dist_max_emb, dist_viavel,conceito,posicao FROM app_motoristas WHERE ((((10.8261662092-(lat_posicao*(-1.852)))^2)+((65.1873425332-(lng_posicao*(-1.852)))^2))<=(10^2) )  GROUP BY conceito LIMIT 10
 
 $sql="SELECT  SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido,nome, codigo, lat_posicao,lng_posicao, conceito,posicao FROM app_motoristas WHERE (".$condicao .")  ORDER BY distancia LIMIT 10";   

 //$sql="SELECT  apelido, lat_posicao,lng_posicao,posicao, conceito FROM app_motoristas WHERE (1)";   	
    
	$pdoConnection = require_once "conexaoPDO.php";
	$resultados = getConsultas($pdoConnection,$sql); 
	  $cont=0;
	  $cont2=0;
	 foreach($resultados as $resultado): 
      $cont++;
     endforeach;	
	$matJson='{"motoristas":[';
    foreach($resultados as $resultado): 
	$cont2++;
	if ($cont>$cont2){
	   $matJson=$matJson.('{"nome":"'.$resultado['nome'].'","codigo":"'.$resultado['codigo'].'","apelido":"'.$resultado['apelido'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","Dist:":"'.$resultado['distancia'].'"},');	 
	}else{
	   $matJson=$matJson.('{"nome":"'.$resultado['nome'].'","codigo":"'.$resultado['codigo'].'","apelido":"'.$resultado['apelido'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","Dist:":"'.$resultado['distancia'].'"}');
	}
      
    endforeach;	
	$matJson=$matJson.']}';
	echo $matJson;
  

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>