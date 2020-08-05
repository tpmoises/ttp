 <?php
 header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");   
try { 
session_start();
require_once "funcoes.php";

$codigo=$_GET['cod_passageiro'];
$sql="select status FROM App_passageiros WHERE (codigo=$codigo)";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
foreach($resultados as $resultado): 
 echo $resultado['status'];//Parto do pincioio que o código é unico
endforeach;	


} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
