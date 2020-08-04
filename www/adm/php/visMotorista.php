<?php
 try { 
require_once "funcoes.php";
session_start();
$status=$_GET["status"];//se trocar por parentese dá erro:Function name must be a string in...
 
 //SELECT  codigo, apelido, lat_posicao,lng_posicao, dist_max_emb, dist_viavel,conceito,posicao FROM app_motoristas WHERE ((((10.8261662092-(lat_posicao*(-1.852)))^2)+((65.1873425332-(lng_posicao*(-1.852)))^2))<=(10^2) )  GROUP BY conceito LIMIT 10
 
 $sql="SELECT codigo, apelido,nome, lat_posicao,lng_posicao, conceito,posicao FROM app_motoristas WHERE (status='$status')  ORDER BY codigo";   

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
	   $matJson=$matJson.('{"nome":"'.$resultado['nome'].'","apelido":"'.$resultado['apelido'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'"},');	 
	}else{
	   $matJson=$matJson.('{"nome":"'.$resultado['nome'].'","apelido":"'.$resultado['apelido'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'"}');
	}
      
    endforeach;	
	$matJson=$matJson.']}';
	echo $matJson;
  

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>