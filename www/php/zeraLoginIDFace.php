<?php
session_start();
 try { 



 session_unset($_SESSION["login"]);
 session_unset($_SESSION["id_facebook"]);
 session_destroy();

    
 } catch(Exception $e) {        echo "Erro: {$e->getMessage()}";    }   
?>