<?php
// echo "<embed src='alert.mp3'width='1' height='1'>";
session_start();
 try { 
$querAmizade= $_GET["amizade"];
$codPassageiro= $_GET["codPassageiro"];
$codMotorista=$_GET["codMotorista"];
//querAmizade: 1 cliente quer que exista exista
//querAmizade: 0 não quer ser mais amigo

// ex.: chamada direta pelo passageiro='1 001 101';
//      chamada, pelo sistema, normal ='1 000 011';

require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php";
if ($querAmizade==1){
	$sql="select  codigo FROM rede_amigos WHERE (motorista=$codMotorista and passageiro=$codPassageiro)";

     $resultados = getConsultas($pdoConnection,$sql); 
	 $cont=0;
	foreach($resultados as $resultado): 
      $cont++;
     endforeach; 
    // $resultado['codigo']
	// echo $resultado['codigo'];
	
	 if ($cont==0){ 
		 //senao encontrou o código - insere registro novo
	 
	//insere registro de amizade para tipo 1
	$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare sql and bind parameters
			$stmt=$pdoConnection->prepare("INSERT INTO rede_amigos (motorista,passageiro,tipo) VALUES (:motorista,:passageiro,:tipo);");   
    
	
			$stmt->bindParam(':motorista', $codMotorista);
			$stmt->bindParam(':passageiro', $codPassageiro);
			$stmt->bindParam(':tipo', $querAmizade);
			// Insere uma linha
			
			$stmt->execute();
            
			echo 1;
	 }else{
		 	 //se encontrou o código - atualiza registro novo
		 $sqlUpdate="UPDATE rede_amigos SET tipo=1 WHERE (motorista=$codMotorista and passageiro=$codPassageiro)";
	     $atualizacao=getConsultas($pdoConnection,$sqlUpdate); 
	     echo 1;
	 }	

}else{
	//atualizar o registro de amizade
	$sqlUpdate="UPDATE rede_amigos SET tipo=0 WHERE (motorista=$codMotorista and passageiro=$codPassageiro)";
	$atualizacao=getConsultas($pdoConnection,$sqlUpdate); 
	echo 0;

}



 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
 
?>


