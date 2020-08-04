 <?php
try { 
session_start();
require_once "funcoes.php";
if (isset($_GET['id_facebook'])){//id_facebook
    $id_facebook=$_GET['id_facebook'];
} else {
    $id_facebook=0;
}

$viaFace=  $_SESSION["viaFace"];
$sql="select codigo,id_facebook,nome,url_foto FROM App_passageiros WHERE (id_facebook='$id_facebook')";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
foreach($resultados as $resultado): 
 echo $resultado['codigo'].';'.$resultado['id_facebook'].';'.$resultado['nome'].';'.$resultado['url_foto'].';'.$viaFace;
endforeach;	


} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
