 <?php
try { 
session_start();
require_once "funcoes.php";

$codigo=$_GET['codMotorista'];
$codAlfanumerico=$_GET['codAlafanumericoPromocao'];
	$sql="select  * FROM promocoes WHERE (promocoes.dono=$codigo and  (promocoes.data_final>=CURRENT_DATE()) and codigo_alfanumerico LIKE '%$codAlfanumerico%')";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
$tam=count($resultados);

//$resultado['data_final']->format('Y-m-d')

 $matJson='{"promocoes":[';
    $interacao=1;    
    foreach($resultados as $resultado): 
        if ($tam==$interacao){
            $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","codigoAlfanumerico":"'.$resultado['codigo_alfanumerico'].'","status":"'.$resultado['status'].'","data_final":"'.$resultado['data_final'].'","desconto":"'.$resultado['desconto'].'","regras":"'.$resultado['regras'].'","valor_fixo":"'.$resultado['valor_fixo'].'"}');
        }else{
            $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","codigoAlfanumerico":"'.$resultado['codigo_alfanumerico'].'","status":"'.$resultado['status'].'","data_final":"'.$resultado['data_final'].'","desconto":"'.$resultado['desconto'].'","regras":"'.$resultado['regras'].'","valor_fixo":"'.$resultado['valor_fixo'].'"},');
           	
        }
        $interacao++;
    endforeach;	
	$matJson=$matJson.']}';
	echo $matJson;

} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
