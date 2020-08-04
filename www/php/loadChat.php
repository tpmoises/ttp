<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");     

session_start();


   //echo $_SESSION['chat'];
   if (isset($_GET["codigoCorrida"])){
        $codCorrida=$_GET["codigoCorrida"];
   }else{
       $codCorrida=$_SESSION["codigoCorrida"];
   }
  
    if (((trim(isset($_SESSION['chat'])=='')))||(trim($codCorrida)!='')) {// $_SESSION['chat']='' em setaValorMinutosKmCorrida.php
        //inicia sessao em motorista
        require_once "funcoes.php";
        $pdoConnection = require_once "conexaoPDO.php";
       if (isset($_GET["codigoCorrida"])){// sem vem de ttm
            if ($_GET["codigoCorrida"]!=''){
                  $sql = "select chat FROM corridas WHERE (codigo=".$_GET["codigoCorrida"].") limit 1";
            }
            
        }else{
              $sql           = "select chat FROM corridas WHERE (codigo=".$_SESSION["codigoCorrida"].") limit 1";
        }
      
            
            $resultados    = getConsultas($pdoConnection, $sql);
            foreach ($resultados as $resultado):
                $_SESSION['chat'] =$resultado['chat']; //nome do arquivo de log formato html
            endforeach;
        $pdoConnection=null;     

    }
         if(file_exists($_SESSION["chat"]) && filesize( $_SESSION["chat"]) > 0){
            $handle = fopen( $_SESSION["chat"], "r");
            $contents = fread($handle, filesize( $_SESSION["chat"]));
            fclose($handle);        
            echo htmlspecialchars_decode($contents);
        }else{
            echo 'Inicie conversa 1';   
        }


?>