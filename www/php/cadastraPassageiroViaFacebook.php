<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");   
session_start();
 try { 

$nome = $_POST["first_name"];
$sobrenome = $_POST["last_name"];
$id_facebook = $_POST["id_facebook"];
$url_foto=$_POST["url_foto"];


$_SESSION["amigosFace"]=$_POST["StringIdAmigosFace"];//"id01,id02,..."


require_once "funcoes.php";
$pdoConnection = require_once "conexaoPDO.php"; 
$sql="SELECT id_facebook, codigo, nome,url_foto , sobrenome,fone FROM App_passageiros WHERE (id_facebook=$id_facebook)";   

	$Quantidade_resultados = count(getConsultas($pdoConnection,$sql)); 
   
   $_SESSION["viaFace"]="1";
   $_SESSION["id_facebook"]=$id_facebook;
   $_SESSION['url_foto']=$url_foto;
   
   
   $resultados = getConsultas($pdoConnection,$sql); 	
   
   foreach($resultados as $resultado): 
	 $_SESSION["login"]=$resultado["nome"];
     $_SESSION["codigo"]=$resultado["codigo"];	    
   endforeach;
	if ($Quantidade_resultados!=0) {
       // echo $quqntId."<-qunatidade    sesseion->".$_SESSION["quantidadeAmigosFace"];
	   echo $resultado["codigo"];   
    }else{
		 try {
		   $_SESSION["viaFace"]="1"; 
            $cpf='';
            $fone='';
            $senha='';
            $email='';
            
			$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare sql and bind parameters
			$stmt=$pdoConnection->prepare("INSERT INTO App_passageiros (id_facebook,nome,sobrenome,cpf,url_foto,senha,email,fone) VALUES (:id_facebook,:nome,:sobrenome,:cpf,:url_foto,:senha,:email,:fone)");   
    
	        $stmt->bindParam(':id_facebook', $id_facebook);
	        
			$stmt->bindParam(':nome', $nome);
			$stmt->bindParam(':sobrenome', $sobrenome);
			$stmt->bindParam(':cpf', $cpf);
			
			$stmt->bindParam(':url_foto', $url_foto);
			
			$stmt->bindParam(':email', $email);
			$stmt->bindParam(':fone', $fone);//celular
			
			$stmt->bindParam(':senha', $senha);  //	$stmt->bindParam(':logradouro', $logradouro);  $stmt->bindParam(':numero', $numero); $stmt->bindParam(':complemento', $complemento);//$stmt->bindParam(':bairro', $bairro);/    $stmt->bindParam(':cidade', $cidade);/    $stmt->bindParam(':estado', $estado);//	$stmt->bindParam(':cep', $cep);/    $stmt->bindParam(':pais', $pais);  
			// Insere uma linha
		
			$stmt->execute();
		
			
$sql="SELECT codigo FROM App_passageiros WHERE (id_facebook=$id_facebook)";   

	
   
   $resultados = getConsultas($pdoConnection,$sql); 	
   
   foreach($resultados as $resultado): 
     $codigo=$resultado["codigo"];	    
   endforeach;

          echo $codigo;			
		
	
			}catch(PDOException $e){
				echo "Error em cadastraPassageiro.php: " . $e->getMessage();
			}
  $pdoConnection = null;
	 
	 
 }
    
 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>