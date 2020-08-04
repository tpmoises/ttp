<?php
// echo "<embed src='alert.mp3'width='1' height='1'>";
session_start();
 try { 

$cod_motorista=$_GET["cod_motorista"];

// ex.: chamada direta pelo passageiro='1 001 101';
//      chamada, pelo sistema, normal ='1 000 011';

require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";

$sqlUpdate="UPDATE app_motoristas SET status_anterior = status WHERE codigo = $cod_motorista ";
$atualizacao=getConsultas($pdoConnection,$sqlUpdate); 


$pdoConnection = null;
 } catch(Exception $e) {        echo "Erro em setSatatusComoChamando.php: {$e->getMessage()}";    }   
 
?>


