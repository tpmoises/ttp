<?php
// echo "<embed src='alert.mp3'width='1' height='1'>";
session_start();
 try { 

$codPassageiro= $_GET["codPassageiro"];
$codMotorista=$_GET["codMotorista"];
require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";

	$sql="select  tipo FROM rede_amigos WHERE (motorista=$codMotorista and passageiro=$codPassageiro) ";

     $resultados = getConsultas($pdoConnection,$sql); 
	 $cont=0;
	foreach($resultados as $resultado): 
     $ult=$resultado['tipo'];
     endforeach; 
    
	 echo $ult;
	


 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
 
?>


