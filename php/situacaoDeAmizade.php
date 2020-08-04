 <?php
try { 
session_start();
require_once "funcoes.php";

//ini_set('display_errors', 1);

//error_reporting(E_ALL);
$codPassageiro=$_GET['codPassageiro'];
$codMotorista=$_GET['codMotorista'];

$sql="select tipo FROM rede_amigos WHERE (motorista=$codMotorista and passageiro=$codPassageiro and tipo=1) limit 1";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
foreach($resultados as $resultado): 
 echo $resultado['tipo'];
endforeach;	
 

} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
