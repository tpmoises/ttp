<?php
// echo "<embed src='alert.mp3'width='1' height='1'>";
session_start();
 try { 
$statusChamado=$_GET["statusChamado"];
$cod_motorista=$_GET["cod_motorista"];
$cod_corrida=$_GET["cod_corrida"];

// ex.: chamada direta pelo passageiro='1 001 101';
//      chamada, pelo sistema, normal ='1 000 011';

require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";

$sqlUpdate="UPDATE app_motoristas SET status='$statusChamado',corrida_corrente=$cod_corrida  WHERE codigo = $cod_motorista ";
$atualizacao=getConsultas($pdoConnection,$sqlUpdate); 


$pdoConnection = null;
 } catch(Exception $e) {        echo "Erro em setSatatusComoChamando.php: {$e->getMessage()}";    }   
 
?>


