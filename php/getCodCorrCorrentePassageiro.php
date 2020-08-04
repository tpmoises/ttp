 <?php
try { 
session_start();
require_once "funcoes.php";

$codigo=$_GET['cod_passageiro'];
$sql="select corrida_corrente FROM App_passageiros WHERE (codigo=$codigo)";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
foreach($resultados as $resultado): 
$_SESSION["codigoCorrida"]= $resultado['corrida_corrente'];   
 echo $resultado['corrida_corrente'];//Parto do pincioio que o código é unico
endforeach;	


} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
