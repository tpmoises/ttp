 <?php
try { 
session_start();
require_once "funcoes.php";

//ini_set('display_errors', 1);

//error_reporting(E_ALL);
$codigoV=$_GET['codigo'];
$sql="select url_foto FROM App_passageiros WHERE (codigo=$codigoV)";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
foreach($resultados as $resultado): 
 $url_fotoPassageiro=$resultado;//Parto do pincioio que o código é unico
endforeach;	
echo $url_fotoPassageiro;

} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
