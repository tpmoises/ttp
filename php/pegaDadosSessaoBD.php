 <?php
try { 
session_start();
//require_once "funcoes.php";
require_once "funcoes.php";

$codigo=$_GET['cod_corrida'];
$sql="select codigo, cod_motorista, cod_passageiro, nome_passageiro, lat_lng_final, lat_lng_inicial, lat_lng_busca,setagem_inicial,end_embarque, end_final_declarado FROM corridas WHERE (codigo=$codigo)";
$pdoConnection = require_once "conexaoPDO.php";
$resultados = getConsultas($pdoConnection,$sql); 
	
	$matJson='{"corrida":[';
	 foreach($resultados as $resultado): 
      $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","cod_motorista":"'.$resultado['cod_motorista'].'","cod_passageiro":"'.$resultado['cod_passageiro'].'","nome_passageiro":"'.$resultado['nome_passageiro'].'","lat_lng_final":"'.$resultado['lat_lng_final'].'","lat_lng_inicial":"'.$resultado['lat_lng_inicial'].'","lat_lng_busca":"'.$resultado["lat_lng_busca"].'","setagem_inicial":"'.$resultado["setagem_inicial"].'","end_embarque":"'.$resultado["end_embarque"].'","end_final_declarado":"'.$resultado["end_final_declarado"].'"}');	 
     endforeach;	
     
     $matJson=$matJson.']}';
	 echo $matJson;

/*	
echo	json_encode(
         array('codigoCorrida'=>$_SESSION['codigoCorrida'],
               'codigoMotorista'=>$_SESSION["codigoMotorista"],
			   'codigoPassageiro'=>$_SESSION["codigoPassageiro"],
			   'nomePassageiro'=>$_SESSION["nomePassageiro"],
		'latLngFinal'=>$_SESSION["latLngFinal"],
		'latLngInicial'=>$_SESSION["latLngInicial"],
		'latLngBusca'=>$_SESSION["latLngBusca"],
		'setagemInicial'=>$_SESSION["setagemInicial"],
		'end_embarque'=>$_SESSION["end_embarque"],
		'end_final_declarado'=>$_SESSION["end_final_declarado"]
		
			   
			   )); */
			   
/*
       
		//'contato_pas'=>$_SESSION["contato_pas"]			   
		$_SESSION["nomePassageiro"],
		$_SESSION["latLngFinal"],
		$_SESSION["latLngInicial"],
		$_SESSION["latLngBusca"],
		$_SESSION["setagemInicial"],
		$_SESSION["end_embarque"],
		$_SESSION["end_final_declarado"],
		$_SESSION["contato_pas"]=$contato_pas); */
        //$_SESSION["contato_mot"]=$contato_mot; definido quando motorista atender viagem

} catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }  
?>
