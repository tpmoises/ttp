<?php
//Modulo ttp
 try { 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");     
 session_start();
$KMN=1.852;//Constante Milhas Nauticas - VALIDO PARA DISTANCIAS MENORES QUE 800MN
$lat_pas_km = $_GET["lat"]*60*$KMN; 
$lng_pas_km = $_GET["lng"]*60*$KMN;  	
$status=$_GET["status"];
//usado para pegar amigos do facebook - suspender essa ideia coronavirus
if (isset($_SESSION["amigosFace"])){
    $stringIdAmigosFace=$_SESSION["amigosFace"];
}else{
     $stringIdAmigosFace=null;
}

$matIdAmigosFace=explode(',',$stringIdAmigosFace);//retorna $matIdAmigosFace[0],$matIdAmigosFace[1],...
$quqntId=count($matIdAmigosFace);

if($quqntId>0){
    $condAmigosDoFace="";
    for ($i = 0;$i < $quqntId; $i++) {
//Acessa as variÃ¡veis de sessao com amigos do Face queforam inicializadas em cadastraPassageiroViaFacebook.php
        if ($i==($quqntId-1)){              
          $condAmigosDoFace=$condAmigosDoFace.' app_motoristas.id_facebook='.$matIdAmigosFace[$i]; //ultimo da  
        }else{
         $condAmigosDoFace=$condAmigosDoFace.' app_motoristas.id_facebook='.$matIdAmigosFace[$i].' or ';    
         
        }
        
    }
}

//$pastaBase= getenv("HOME"); 
//configura isto em variavael de ambiente php
/*
$path = getenv("HOME");
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

$path = getenv("HOME")."/public/php";
set_include_path(get_include_path() . PATH_SEPARATOR . $path);

echo var_dump(get_include_path() ); */
//$path = getenv("PHPS");
//set_include_path(get_include_path() . PATH_SEPARATOR . $path);
//echo var_dump($path );
require_once "funcoes.php";

usleep(100000);//milionÃ©simos de segundos. 1s=1000000
$dist_max_emb=4.0;//configurado pelo motorista 1.0
$dist_viavel=6.0;// caculado pelo sistema 2.0
//COMPRIMENTO^2 = DLA^2 + DLO^2
//$dist_max^2 = 5*5 
//$dist_max = 5 
//DLA^2=(lat_pas_km - (lat_posicao*"(-.$KMN.")))^2
// DLO^2=(lng_pas_km-(lng_posicao*(-".$KMN.")))^2
if ($dist_max_emb>=$dist_viavel){
 $dist_max=$dist_max_emb;	
} else
{
	 $dist_max=$dist_viavel;
}
//Modulo ttp
//COMPRIMENTO^2=$dist_max^2
 //-5.848,-35.2 moises
 //$dist_max=10 km
 $dist_max=$_GET["raioChamDir"];
 $condAmizade=$_GET["condAmizade"];
 
 $condicao="SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2))<(".$dist_max.") ";
 
 if (isset($status)){
	 $sql="SELECT distinct id_facebook ,SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido, codigo, nome, sobrenome, lat_posicao,lng_posicao, conceito,posicao,ficticio, qUnidade,valorUnidade,valorMinuto,margemLucro,url_avatar, cat_cnh FROM app_motoristas WHERE (".$condicao ." and status='$status')  ORDER BY conceito, distancia LIMIT 10";   
     //Ordem é importante! Não mudar :
     $amigos=-1;

     //inclue amigo e amigos do facebook em 12/02/2020 sem limites de motoristas
     if ($condAmizade=='soAmigos'){
		 $codPassageiro=$_GET['codPassageiro'];
         $sql="SELECT distinct id_facebook , SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido, app_motoristas.codigo, app_motoristas.nome, app_motoristas.sobrenome, lat_posicao,lng_posicao, conceito,posicao,ficticio, qUnidade,valorUnidade,valorMinuto,margemLucro,motorista, tipo,url_avatar, cat_cnh,id_facebook FROM app_motoristas, rede_amigos  WHERE ((".$condicao." and status='$status' and tipo=1 and app_motoristas.codigo=rede_amigos.motorista  and rede_amigos.passageiro=$codPassageiro))  ORDER BY conceito, distancia";   
         $amigos=1;
	 }
     
     
	 //and (".$condAmigosDoFace.") tirei da condição acima

	 }else{//sem status quando não está logado - 10 motoristas mais perto
	  $sql="SELECT distinct id_facebook , SQRT(POW((".$lat_pas_km."-(lat_posicao*60*(".$KMN."))),2)+POW((".$lng_pas_km."-(lng_posicao*60*(".$KMN."))),2)) AS distancia, apelido, codigo, nome,sobrenome, lat_posicao,lng_posicao,id_facebook, conceito,posicao,ficticio, qUnidade,valorUnidade,valorMinuto,margemLucro,url_avatar, cat_cnh FROM app_motoristas WHERE (".$condicao .")  ORDER BY conceito, distancia LIMIT 10";    
	  
      $amigos=-1;

 }

    	

 
    
	$pdoConnection = require_once "conexaoPDO.php";
	$resultados = getConsultas($pdoConnection,$sql); 
	$tam=count($resultados);
	if ($tam>0){
	 $resultAtual=null;
	 $resultAnterior=null;
	 $aux=[];
	 foreach($resultados as $resultado): 
	     $resultAtual=$resultado['codigo'];
	     if ($resultAtual!=$resultAnterior){
	           array_push($aux,$resultado );
	     }
	   
	     $resultAnterior=$resultado['codigo'];
	 endforeach;	 
	$resultados=$aux;
    $matJson='{"motoristas":[';
    $interacao=1;    
    foreach($resultados as $resultado): 
        
        if ($tam==$interacao){
            $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","nome":"'.$resultado['nome'].'","sobrenome":"'.$resultado['sobrenome'].'","apelido":"'.$resultado['apelido'].'","posicao":"'.$resultado['posicao'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","qUnidade":"'.$resultado["qUnidade"].'","valorUnidade":"'.$resultado["valorUnidade"].'","valorMinuto":"'.$resultado["valorMinuto"].'","margemLucro":"'.$resultado["margemLucro"].'","url_avatar":"'.$resultado['url_avatar'].'","cat_cnh":"'.$resultado['cat_cnh'].'","ficticio":"'.$resultado['ficticio'].'","Dist":"'.$resultado['distancia'].'","id_facebook":"'.$resultado['id_facebook'].'","amigos":"'.$amigos.'"}');
        }else{
            $matJson=$matJson.('{"codigo":"'.$resultado['codigo'].'","nome":"'.$resultado['nome'].'","sobrenome":"'.$resultado['sobrenome'].'","apelido":"'.$resultado['apelido'].'","posicao":"'.$resultado['posicao'].'","lat_posicao":"'.$resultado['lat_posicao'].'","lng_posicao":"'.$resultado['lng_posicao'].'","qUnidade":"'.$resultado["qUnidade"].'","valorUnidade":"'.$resultado["valorUnidade"].'","valorMinuto":"'.$resultado["valorMinuto"].'","margemLucro":"'.$resultado["margemLucro"].'","url_avatar":"'.$resultado['url_avatar'].'","cat_cnh":"'.$resultado['cat_cnh'].'","ficticio":"'.$resultado['ficticio'].'","Dist":"'.$resultado['distancia'].'","id_facebook":"'.$resultado['id_facebook'].'","amigos":"'.$amigos.'"},');	
        }
        $interacao++;
    endforeach;	
	$matJson=$matJson.']}';
	echo $matJson;
	
	  $_SESSION['qUnidade']=$resultado["qUnidade"];
      $_SESSION['valorUnidade']=$resultado["valorUnidade"]; 
      $_SESSION['valorMinuto']=$resultado["valorMinuto"];
      $_SESSION['margemLucro']=$resultado["margemLucro"];
	}
	 
	
   
 
	

 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
 //Modulo ttp
?>
