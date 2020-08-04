<?php
session_start();
 try { 
$codigo= $_GET["codigo"]; 
	
require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";

 
 $sql="SELECT  codigo,nome,apelido,posicao,lat_posicao,lng_posicao, qUnidade,valorUnidade,valorMinuto,margemLucro,url_avatar,    ficticio, status,fone,conceito,cat_cnh  FROM app_motoristas WHERE (codigo='$codigo')   LIMIT 1";   

 
    
	
	
	$resultados = getConsultas($pdoConnection,$sql); 
	$matJson='{"motorista":[';
	 foreach($resultados as $resultado): 
      $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","nome":"'.$resultado['nome'].'","apelido":"'.$resultado['apelido'].'","posicao":"'.$resultado['posicao'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","qUnidade":"'.$resultado["qUnidade"].'","valorUnidade":"'.$resultado["valorUnidade"].'","valorMinuto":"'.$resultado["valorMinuto"].'","margemLucro":"'.$resultado["margemLucro"].'","url_avatar":"'.$resultado['url_avatar'].'","cat_cnh":"'.$resultado['cat_cnh'].'","ficticio":"'.$resultado['ficticio'].'","Status:":"'.$resultado['status'].'","fone":"'.$resultado['fone'].'","conceito":"'.$resultado['conceito'].'"}');	 
     endforeach;	
     
     $matJson=$matJson.']}';
	 echo $matJson;
	 
	  
  

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>