<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");     
session_start();	 
 try { 


 
$codigo=$_GET["cod_corrida"]; 

	
require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";

  $campos=" ultPosicao ";
  $sql="SELECT $campos FROM corridas WHERE ";
  $sql=$sql."(corridas.codigo=$codigo) LIMIT 1";   	
 
 //  $tam=matCood.length;	
			 //matCoord=matCood.split("|");  
			// matCoord[0]=matCoord[0].replace(/\{\"intinerario\":\"/ig, "");
			// matCoord.pop();//retira ultimo elemento: "\}"
			// var ultLatLng=matCood.length-1
    //usleep(100000);
	 $resultados = getConsultas($pdoConnection,$sql); 
foreach($resultados as $resultado): 	 
	 echo $resultado['ultPosicao'];  
endforeach;	 
 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>