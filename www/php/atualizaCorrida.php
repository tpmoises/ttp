<?php
session_start();
 try { 
 $cod_corrida=$_GET["codigoCorrida"];
 
 $statusCorrida=$_GET["statusCorrida"];//será setada
 $cod_motorista=$_GET["cod_motorista"];
 $cod_passageiro=$_GET["cod_passageiro"];
 $nome_passageiro=$_GET["nome_passageiro"];
 $latLngFinal=$_GET["latLngFinal"]; 
 $latLngInicial=$_GET["latLngInicial"];//Onde o motorista se enconra
 $latLngBusca=$_GET["latLngBusca"];//==latLngI do passageiro
 $setagemInicial=$_GET["setagemInicial"];	//latLog Detectada
 $end_embarque=$_GET["endEmbarque"]; 
 $end_final_declarado=$_GET["endFinalDeclarado"]; 
 $contato_pas=$_GET["contato_pas"];
 $ctEstimado=$_GET["ctEstimado"];

 $_SESSION["codigoMotorista"]=$cod_motorista;
 $_SESSION["codigoPassageiro"]=$cod_passageiro;
 $_SESSION["nomePassageiro"]=$nome_passageiro;
 $_SESSION["latLngFinal"]=$latLngFinal;
 $_SESSION["latLngInicial"]=$latLngInicial;
 $_SESSION["latLngBusca"]=$latLngBusca;
 $_SESSION["setagemInicial"]=$setagemInicial;
 $_SESSION["end_embarque"]=$end_embarque;
 $_SESSION["end_final_declarado"]=$end_final_declarado;
 $_SESSION["contato_pas"]=$contato_pas;
 //$_SESSION["contato_mot"]=$contato_mot; definido quando motorista atender viagem
 
 
 
 
 // ex.: chamada direta pelo passageiro='1 001 101';
//      chamada, pelo sistema, normal ='1 000 011';

 require_once "funcoes.php";
 $pdoConnection = require_once "conexaoPDO.php";

 $sqlUpdate="UPDATE corridas SET lat_Lng_final=$latLngFinal ";
 $sqlUpdate=$sqlUpdate.",lat_Lng_inicial=$latLngInicial";
 $sqlUpdate=$sqlUpdate.",lat_Lng_busca=$latLngBusca";
 $sqlUpdate=$sqlUpdate.",cod_motorista=$cod_motorista";
 $sqlUpdate=$sqlUpdate.",setagem_inicial=$setagemInicial";
 $sqlUpdate=$sqlUpdate.",ctEstimado=$ctEstimado ";
 
 $sqlUpdate=$sqlUpdate."WHERE codigo = $cod_corrida ";
 
 $atualizacao=getConsultas($pdoConnection,$sqlUpdate);  
 
 
 
 //$latLngInicial,
 //$latLngBusca,
 //$cod_passageiro,
 //$nome_passageiro,
 //$cod_motorista,
 //$setagemInicial,
 //$statusCorrida,
 //$end_embarque,
 //$end_final_declarado,
 //$contato_pas,
 //$ctEstimado,
 
 
 $_SESSION["codigoCorrida"]=$cod_corrida; 

 //echo $cod_corrida;
 
 $pdoConnection = null;



 } catch(Exception $e) {        echo "Erro em isereCorrida.php: {$e->getMessage()}";    }   
 
?>


