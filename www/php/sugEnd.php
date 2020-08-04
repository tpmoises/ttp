 <?php
   try { 
  // echo "Erro"
   $end_dig = $_GET["txtPesq"]."%";  	// LIMIT 1
   $estado=$_GET["estado"];
   $cidade=$_GET["cidade"];
   
   
  

   
	require_once "funcoes.php";
    session_start();//	require_once "php/product.php";	
	usleep(100000);//milionésimos de segundos. 1s=1000000
	//codigo funcionou no Myphp:
   $sql="SELECT endereco_logradouro, bairro_descricao, cidade_descricao, cidade_cep uf_sigla FROM endereco, bairro, cidade, uf WHERE ( endereco.bairro_codigo = bairro.bairro_codigo and bairro.cidade_codigo = cidade.cidade_codigo and cidade.uf_codigo = uf.uf_codigo and cidade_descricao = '".$cidade."' and uf_sigla = '".$estado."' ) and ( endereco_logradouro LIKE '".$end_dig."' ) GROUP BY endereco_logradouro, bairro_descricao LIMIT 5 ";   
		
	$pdoConnection = require_once "conexaoPDO.php";
	$sugestoes = getSugestoes($pdoConnection,$end_dig,$sql); 
   foreach($sugestoes as $sugestao): 
      echo utf8_encode("<option value='".$sugestao['endereco_codigo']."'>".$sugestao['endereco_logradouro']."</option>");
   endforeach;	 
   } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
	
	
	

?>