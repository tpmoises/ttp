<?php
// echo "<embed src='alert.mp3'width='1' height='1'>";
session_start();
 try { 


// ex.: chamada direta pelo passageiro='1 001 101';
//      chamada, pelo sistema, normal ='1 000 011';
//       CORRIDA direta pelo passageiro='0 001 101';
//      CORRIDA, pelo sistema, normal ='0 000 011';

require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";
$sqlUpdate="UPDATE corridas SET status='$statusChamado' WHERE codigo = '".$codigo."' ";
$atualizacao=getConsultas($pdoConnection,$sqlUpdate); 

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
 
?>


