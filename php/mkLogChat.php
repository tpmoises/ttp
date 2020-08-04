<?
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");     
try {
  require_once "funcoes.php";
  $pdoConnection = require_once "conexaoPDO.php";

    $codigo_corrida = $_POST['codigo'];
    $text           = $_POST['msg'];
    
    //insereCorrida.php é inserido no BD
    if (!(isset($_SESSION['chat']))) {
        //$sql           = "select chat FROM corridas WHERE (codigo=.$codigo_corrida.) limit 1";
         if ($_GET["codigoCorrida"]){// sem vem de ttm
              $sql           = "select chat FROM corridas WHERE (codigo=".$_GET["codigoCorrida"].") limit 1";
        }else{
              $sql           = "select chat FROM corridas WHERE (codigo=".$codigo_corrida.") limit 1";
        }
        
        $resultados    = getConsultas($pdoConnection, $sql);
        foreach ($resultados as $resultado):
            $_SESSION['chat'] =$resultado['chat']; //nome do arquivo de log formato html
        endforeach;
        if (!(isset($_SESSION['chat']))) {
          if(file_exists('logChatTemp.html') && filesize('logChatTemp.html') > 0){
            unlink('logChatTemp.html');// apagar arquivo
          }
            $_SESSION['chat'] = 'logChatTemp.html';
            
           $text = $text . '</ b>#Temporario</ br>';
            
        }
    }
    // Escrita e leitura para o proprietario, leitura para todos os outros
   // chmod ($_SESSION['chat'], 0644);//em octal
    $fp = fopen($_SESSION['chat'], 'a');
    fwrite($fp, stripslashes(htmlspecialchars($text))); // escreve texto no arquivo de log
    fclose($fp);
    echo $fp;
    
}
catch (Exception $e) {
    echo "Erro: {$e->getMessage()}";
}

?>
