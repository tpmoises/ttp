<?php 


function getCorpoEmail($parCodigo){
	//só HHh iSSdaijaDdUhuhEh222sUhbss2S12M1E17MyRRDAajhNkalaDjklajhOjajaU767aahaaaa 
	$parLink="https://teletransporte.net/php/validandoEmail.php?iSSdaijaDdUhuhEh222sUhbss2S12M1E17MyRRDAajhNkalaDjklajhOjajaU767aahaaaa=$parCodigo";
	

$s1="
<table style='width: 50%; height: 70%; background-color: #cce5ff;'>
<tbody>
<tr>
<td>&nbsp;</td>
<td style='text-align: center;'>
<h1><strong>TT</strong></h1>
<h2><strong>&nbsp;Email de valida&ccedil;&atilde;o</strong></h2>
<h3>Clique no seguinte link: <a href='$parLink'>$parLink</a></h3>
</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td style='text-align: center;'>
<h3>OU copie cole em seu navegador.</h3>
<h2>site: <a title='teletransporte.net' href='https://teletransporte.net' target='_blank' rel='noopener'>teletransporte.net</a>&nbsp;</h2>
<p><a title='teletransporte.net' href='https://teletransporte.net' target='_blank' rel='noopener'><img src='https://teletransporte.net/imgs/imag1.jpg' alt='https://teletransporte.net/imgs/imag1.jpg' width='479' height='255' /></a></p>
<p><span style='color: #ff0000;'>Se n&atilde;o fez inscri&ccedil;&atilde;o no site da TeleTranporte (TT), apague este email.</span></p>
<pre id='tw-target-text' class='tw-data-text tw-ta tw-text-small' dir='ltr' data-placeholder='Tradu&ccedil;&atilde;o' data-fulltext=''><span lang='pt-br' style='color: #ff0000;'>If you did not register on the TeleTranporte (TT) website, delete this email.<br /><br />                 <br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Atte, Team TT.</span></pre>
</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
";

return $s1;

}

function getProducts($pdo,$sql){
	// a query sql vem de fora 
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
function getPrestadores($pdo){
	$sql = "SELECT *  FROM prestadores "; //"SELECT *  FROM prod_servicos ";
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}
function getConsultas($pdo,$sql){	
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function updatePrecoProduto($pdo,$sql){
	// a query sql vem de fora 
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
}


function getProductsByIds($pdo, $ids) {
	$sql = "SELECT * FROM prod_servicos WHERE id IN (".$ids.")";
	$stmt = $pdo->prepare($sql);
	$stmt->execute();
	return $stmt->fetchAll(PDO::FETCH_ASSOC);
} 
function insereCorrida($latLngFinal,$latLngInicial,$latLngBusca,$cod_passageiro,$nome_passageiro,$cod_motorista,$setagemInicial,$status,$end_embarque,$end_final_declarado,$contato_pas,$ctEstimado,$nameFileRandChatOfTravel,$pdoConnection,$amigos,$codPromocao1,$urlDominioAppPass){
	  try {

			$pdoConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // prepare sql and bind parameters
			$stmt=$pdoConnection->prepare("INSERT INTO corridas (lat_lng_final,lat_lng_inicial,lat_lng_busca,cod_passageiro,nome_passageiro,cod_motorista,setagem_inicial,status,end_embarque,end_final_declarado,contato_pas,ctEstimado, chat, amigos,promocao1,url_dominio_app_passageiro) VALUES (:latLngFinal,:latLngInicial,:latLngBusca,:cod_passageiro,:nome_passageiro,:cod_motorista,:setagemInicial,:status,:end_embarque,:end_final_declarado,:contato_pas,:ctEstimado,:nameFileRandChatOfTravel,:amigos,:codPromocao1,:url_dominio_app_passageiro);");   
    
	
			$stmt->bindParam(':latLngFinal', $latLngFinal);
			$stmt->bindParam(':latLngInicial', $latLngInicial);
			$stmt->bindParam(':latLngBusca', $latLngBusca);
			
			$stmt->bindParam(':cod_passageiro', $cod_passageiro);
			$stmt->bindParam(':nome_passageiro', $nome_passageiro);
			
			
			$stmt->bindParam(':cod_motorista', $cod_motorista);//celular
			
			$stmt->bindParam(':setagemInicial', $setagemInicial);  //	$stmt->bindParam(':logradouro', $logradouro);  $stmt->bindParam(':numero', $numero); $stmt->bindParam(':complemento', $complemento);//$stmt->bindParam(':bairro', $bairro);/    $stmt->bindParam(':cidade', $cidade);/    $stmt->bindParam(':estado', $estado);//	$stmt->bindParam(':cep', $cep);/    $stmt->bindParam(':pais', $pais);  
			$stmt->bindParam(':status', $status);
			
			$stmt->bindParam(':end_embarque', $end_embarque);
			$stmt->bindParam(':end_final_declarado', $end_final_declarado);
			
			$stmt->bindParam(':contato_pas', $contato_pas);
			$stmt->bindParam(':ctEstimado', $ctEstimado);

            $stmt->bindParam(':nameFileRandChatOfTravel', $nameFileRandChatOfTravel);
            
            $stmt->bindParam(':amigos', $amigos);
            
            $stmt->bindParam(':codPromocao1', $codPromocao1);
            
             $stmt->bindParam(':url_dominio_app_passageiro', $urlDominioAppPass);
            
            
			
			
			// Insere uma linha
			
			$stmt->execute();
            $cod_corrida=$pdoConnection->lastInsertId();//acho que é isso			
			//$sql=" SELECT last_insert_id()";
            //$cod_corrida = getConsultas($pdoConnection,$sql); 
			return ($cod_corrida);
			//echo "Cadastro feito com sucesso! Faça o login.";
			//echo "<script>setTimeout(function(){window.location.replace('https://ttp.drmoisessantos.com') }, 3000);;</script>";
	
			}catch(PDOException $e){
				echo "Error em insercao corrida: " . $e->getMessage();
			}
  
  
  //$pdoConnection = null;
	 
	 
 
	//INSERT INTO `App_passageiros`(`codigo`, `nome`, `sobrenome`, `cpf`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`, `cep`, `pais`,  `senha`, `email`, `fone`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8],[value-9],[value-10],[value-11],[value-12],[value-13],[value-14],[value-15],[value-16])
	// foreach($resultados as $resultado): 
     // echo $resultado['status'];
     //endforeach;

}

function setAmizade($querAmizade,$codPassageiro,$codMotorista){
    try { 
//querAmizade: 1 cliente quer que exista exista
//querAmizade: 0 não quer ser mais amigo

// ex.: chamada direta pelo passageiro='1 001 101';
//      chamada, pelo sistema, normal ='1 000 011';

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
            
			return 1;
	 }else{
		 	 //se encontrou o código - atualiza registro novo
		 $sqlUpdate="UPDATE rede_amigos SET tipo=1 WHERE (motorista=$codMotorista and passageiro=$codPassageiro)";
	     $atualizacao=getConsultas($pdoConnection,$sqlUpdate); 
	     return 1;
	 }	

}else{
	//atualizar o registro de amizade
	$sqlUpdate="UPDATE rede_amigos SET tipo=0 WHERE (motorista=$codMotorista and passageiro=$codPassageiro)";
	$atualizacao=getConsultas($pdoConnection,$sqlUpdate); 
	return 0;

}



 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
}
?>