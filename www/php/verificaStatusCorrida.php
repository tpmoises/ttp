<?php
session_start();
 try { 
$codigo= $_GET["cod_corrida"]; 
	
require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";

 
 $sql="SELECT codigo,status FROM corridas WHERE (codigo='$codigo')   LIMIT 1";   

 
    
	
	
	$resultados = getConsultas($pdoConnection,$sql); 
	 foreach($resultados as $resultado): 
      echo $resultado['status'];
     endforeach;	
	 
	  
  

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>