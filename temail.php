<?php
//Import the PHPMailer class into the global namespace
require("PHPMailer/PHPMailer.php");
require("PHPMailer/SMTP.php");
require("PHPMailer/Exception.php");

$mail = new PHPMailer();

// Define que a mensagem será SMTP
$mail->IsSMTP();

// Host do servidor SMTP externo, como o SendGrid.
$mail->Host = "smtp.umbler.com";

// Autenticação | True
$mail->SMTPAuth = true;

// Usuário do servidor SMTP
$mail->Username = 'falecomigo@@teletransporte.net';

// Senha da caixa postal utilizada
$mail->Password = 'xyz200502';

$mail->From = "msscelular@gmail.com";
$mail->FromName = "Moises G Mail ";
$mail->AddAddress('falecomigo@@teletransporte.net', 'Suporte Falecomigo');

// Define que o e-mail será enviado como HTML | True
$mail->IsHTML(true);

// Charset da mensagem (opcional)
$mail->CharSet = 'iso-8859-1';

// Assunto da mensagem
$mail->Subject = "Mensagem Teste";

// Conteúdo no corpo da mensagem
$mail->Body = 'Conteudo da mensagem';

// Conteúdo no corpo da mensagem(texto plano)
$mail->AltBody = 'Conteudo da mensagem em texto plano';

//Envio da Mensagem
$enviado = $mail->Send();

$mail->ClearAllRecipients();

if ($enviado) {
  echo "E-mail enviado com sucesso!";
} else {
  echo "Não foi possível enviar o e-mail.";
  echo "Motivo do erro: " . $mail->ErrorInfo;
}
?>