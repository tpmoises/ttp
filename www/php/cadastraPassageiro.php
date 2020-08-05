<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");   
session_start();
 try { 
$cpf= $_POST["cpfCad"];	
$email=$_POST["emailCad"];//ser bem rigorosos com o par cpf e email. Tmb ser rigoroso, mas em menor grau, com
// o celular cadastrado que poderá ser mudado com certa dificuldade.
$nome = $_POST["nomeCad"];
$sobrenome = $_POST["sobreNomeCad"];
$fone = $_POST["celCad"];
$senha = $_POST["senhaCad"];

require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php"; 
$sql="SELECT cpf , email FROM App_passageiros WHERE (cpf='$cpf' OR email='$email') ";   
	$resultados = count(getConsultas($pdoConnection,$sql)); 
   // echo 	$resultados ;
	if ($resultados!=0) {
	//	echo var_dump($resultados['cpf']) ;
		
		echo "<p style='font-size:  350%;'>CPF ou Email já cadastrado!</p>";
		
		echo "<script>setTimeout(function(){window.location.replace('https://teletransporte.net') }, 7000);;</script>";
	
    }else{
		 try {

			$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare sql and bind parameters
			$stmt=$pdoConnection->prepare("INSERT INTO App_passageiros (nome,sobrenome,cpf,senha,email,fone) VALUES (:nome,:sobrenome,:cpf,:senha,:email,:fone)");   
    
	
			$stmt->bindParam(':nome', $nome);
			$stmt->bindParam(':sobrenome', $sobrenome);
			$stmt->bindParam(':cpf', $cpf);
			
			$stmt->bindParam(':email', $email);
			$stmt->bindParam(':fone', $fone);//celular
			
			$stmt->bindParam(':senha', $senha);  //	$stmt->bindParam(':logradouro', $logradouro);  $stmt->bindParam(':numero', $numero); $stmt->bindParam(':complemento', $complemento);//$stmt->bindParam(':bairro', $bairro);/    $stmt->bindParam(':cidade', $cidade);/    $stmt->bindParam(':estado', $estado);//	$stmt->bindParam(':cep', $cep);/    $stmt->bindParam(':pais', $pais);  
			// Insere uma linha
			
			$stmt->execute();
			//$cod_passageiro=$pdoConnection->lastInsertId();//acho que é isso
			
            echo "<p style='font-size: 350%;'>Cadastro feito com sucesso! Faça o login!</p>";			
		
			echo "<script>setTimeout(function(){window.location.replace('https://teletransporte.net') }, 3500);;</script>";
	
			}catch(PDOException $e){
				echo "Error em cadastraPassageiro.php: " . $e->getMessage();
			}
  $pdoConnection = null;
	 
	 
 }
	//INSERT INTO `App_passageiros`(`codigo`, `nome`, `sobrenome`, `cpf`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `cep`, `pais`,  `senha`, `email`, `fone`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11],[value-12],[value-13],[value-14],[value-15],[value-16])
	// foreach($resultados as $resultado): 
     // echo $resultado['status'];
     //endforeach;
 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>