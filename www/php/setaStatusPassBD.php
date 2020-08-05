 <?php
 header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");   
try { 
session_start();
require_once "funcoes.php";

$codigo=$_GET['cod_passageiro'];
$status=$_GET["status"];

unset($_SESSION['chat']);

$sqlUpdate="UPDATE App_passageiros SET status = '$status' WHERE codigo = $codigo ";

$pdoConnection = require_once "conexaoPDO.php";
$atualizacao = getConsultas($pdoConnection,$sqlUpdate); 


} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
