window.onload=function (){  // Esta parte carrega depois que toda página html carrega
 //fazer objetos aplicativo, passageiro, motorista e viagem aqui
 try{ 
  var iab = cordova.InAppBrowser;
	  iab.open('https://teletransporte.net', '_self');  
 } catch (e){

	 alert("erro na function OnLoad :  "+e.message);

 } 
}// fim do onload
