<?php 
$servidor=$_SERVER['SERVER_NAME'];
if ($servidor=="localhost"){
//Dados do banco de dados
define("DB_HOST", "localhost");
define("DB_NAME", "bd001");
define("DB_USER", "root");
define("DB_PASS", "xyz2005");
	
}else{
//Dados do banco de dados
define("DB_HOST", "mysql524.umbler.com:41890");//Usando servidor do dominio principal - acesso externo
define("DB_NAME", "bd001");
define("DB_USER", "moises");
define("DB_PASS", "xyz200502");
	
	
}

//Conexao com Banco de Dados
return new PDO(sprintf("mysql:host=%s;dbname=%s", DB_HOST, DB_NAME), DB_USER, DB_PASS);
?>