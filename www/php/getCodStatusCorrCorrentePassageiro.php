 <?php
try { 
session_start();
require_once "funcoes.php";

$codigo=$_GET['cod_passageiro'];
$sql="select corrida_corrente FROM App_passageiros WHERE (codigo=$codigo)";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
foreach($resultados as $resultado): 
    $_SESSION["codigoCorrida"] =$resultado['corrida_corrente'];
 $r1=$resultado['corrida_corrente'];//Parto do pincioio que o código é unico
endforeach;	

$sql="select status FROM corridas WHERE (codigo=".$resultado['corrida_corrente'].")";
//$pdoConnection = require_once "conexaoPDO.php";
$resultados2 = getConsultas($pdoConnection,$sql); 

foreach($resultados2 as $resultado2): 
 $r2= $resultado2['status'];
endforeach;	

echo $r1.",".$r2;

} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
