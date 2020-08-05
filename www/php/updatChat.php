<?php
session_start();
 try { 

$codigo=$_GET["codigo"];
$texto=$_GET["texto"];
$texto='"me":"'+$texto+'"';//"me":"Bom dia..."
	
require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";

if ($statusMotorista){     //$lat_mot , $lng_mot |
 $sqlUpdate="UPDATE corridas SET chat=CONCAT(chat,',$texto') WHERE codigo = '$codigo' ";
 $atualizacao=getConsultas($pdoConnection,$sqlUpdate); 
 $sql="Select chat WHERE codigo=$codigo";
 $consulta=getConsultas($pdoConnection,$sqlUpdate); 
 echo $consulta['chat'];	
}

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>