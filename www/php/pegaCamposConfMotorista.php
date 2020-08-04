<?php
//Modulo ttp
 try { 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");     
 session_start();
$codigo=$_GET["codigo"];
require_once "funcoes.php";


    	

    $sql="SELECT  qUnidade,valorUnidade,valorMinuto,margemLucro FROM app_motoristas WHERE (codigo=$codigo)";   	
    
	$pdoConnection = require_once "conexaoPDO.php";
	$resultados = getConsultas($pdoConnection,$sql); 
	
	 foreach($resultados as $resultado): 
       echo json_encode($resultado);
     endforeach;	
	
	
	
	
   
  $_SESSION['qUnidade']=$resultado["qUnidade"];
  $_SESSION['valorUnidade']=$resultado["valorUnidade"]; 
  $_SESSION['valorMinuto']=$resultado["valorMinuto"];
  $_SESSION['margemLucro']=$resultado["margemLucro"];
	

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
 //Modulo ttp
?>
