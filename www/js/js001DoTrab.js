 /*Objeto passageiro. Escopo global. Nas funcoes é acessada por window.passageiro */
 //js001.js do App PASSAGEIRO
 var app= new App(); // App.js
 var passageiro= new Passageiro();
 var corrida= new Corrida(); 
 var motoristas = [];
 var STATUS = new Status();//Defini os Status que o motorista pode está no arquivo status.js
 //var motorista = new Motoristas();
 //&emsp;    quatro espacos em branco
 var myIcon = L.icon({
    iconUrl: 'imgs/markerMot.png',
    iconSize: [30, 48],
    iconAnchor: [15, 48],
    popupAnchor: [8,-40], 
});
window.onload=function (){  // Esta parte carrega depois que toda página html carrega
 //fazer objetos aplicativo, passageiro, motorista e viagem aqui
 try{ 
  if (document.getElementById("login")){
	  passageiro.setLogin(document.getElementById("login").value);
  }
  //Carrega menu do site de acordo com o idioma

  //alert(document.getElementById("inicio").textContent);

 //carregaMenus("pt-br");   //Implementando lá embaixo app.getIdioma()

  //alert(document.getElementById("miniBtAcheme"));

  document.getElementById("miniBtAcheme").onclick=acheme;
  document.getElementById("fazerViagem").onclick=showFazerViagem; 
  if (document.getElementById("fazerViagem2")){
	  document.getElementById("fazerViagem2").onclick=showFazerViagem; 
  }
  

  /* Voce e a gente*/

 // document.getElementById("suaQualificacao").onclick=showFazerViagem;
  //document.getElementById("viagensFeitas").onclick=showFazerViagem;

  /* Configuracoes */

 // document.getElementById("formasDePagamento").onclick=showFazerViagem;
 // document.getElementById("teletransporte").onclick=showFazerViagem;
//  document.getElementById("compartilharViagem").onclick=showFazerViagem; 
 // document.getElementById("notificações").onclick=showFazerViagem;
 // document.getElementById("idioma").onclick=showIdioma;

  /* Ajuda */

 // document.getElementById("faleConosco").onclick=showFazerViagem;
 // document.getElementById("politica").onclick=showFazerViagem;
 // document.getElementById("termosLegais").onclick=showFazerViagem;
  if (document.getElementById("cadastrar")){
	  document.getElementById("cadastrar").onclick=cadastrar;
  }
  if  (document.getElementById("entrar")) {
	  document.getElementById("entrar").onclick=login;
  }
  

  var mapa = L.map('map',{ closePopupOnClick:false, zoomControl:false}).fitWorld(),  

      geocoder= L.Control.Geocoder.nominatim(),

     // controlProcurar = L.Control.geocoder({geocoder: geocoder, placeholder:"Procurar..."}).addTo(mapa);	  

	  controlZoom=L.control.zoom({ zoomInTitle:'Aumentar', zoomOutTitle:'Diminuir'}).addTo(mapa);

	  mapa.on("locationfound",achouLocalAutomatico);
      mapa.on("locationerror",onLocationError);

      mapa.locate({ setView: true});
	  mapa.setZoom(10);
	  

  var imgMapa=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' , {

      attribution: '© OpenStreetMap contributors',

      maxZoom: 19 

    }).addTo(mapa);   
	
	imgMapa.on("loading",carregandoMapa);
	imgMapa.on("tileload",mapasCarregados);
	mapa.on("click",escondeMenu);

  //var myButton = new L.Control.Button(myButtonOptions).addTo(mapa);	

  /**************************************************************************************/ 

   app.map= mapa;  

   app.geocoder=geocoder;

   //app.controlProcurar=controlProcurar; 

   app.controlZoom=controlZoom;

   app.imgMapa=imgMapa;  

   app.icon=myIcon;   

  /**************************************************************************************/   
	
 } catch (e){

	 alert("erro na function OnLoad :  "+e.message);

 } 
}// fim do onload
function escondeMenu(){
   if (document.getElementById("myNavbar")){
	 //  document.getElementById("myNavbar").style.visibility="hidden";	
   }	
	
}
function cadastrar(){
	//mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)
	//<form class='form-horizontal'>
	var conteudo,s1;
	s1="<!-- Cadastro --><div id='divCadastro'><fieldset><!-- Form Name -->";
	s1+="<legend>Cadastro de passageiros TT/TP</legend>";
	
	s1+="<!-- Text input--><div class='form-group'>";
	s1+="<label class='col-md-4 control-label' for='nomeCad'>Nome*</label><div class='col-md-6'>";
	s1+="<input id='nomeCad' name='nomeCad' type='text' placeholder='Nome' class='form-control input-md' required>";
	s1+="<span class='help-block'>Seu primeiro nome</span></div></div>";
	
	s1+="<!-- Text input--><div class='form-group'>";
	s1+="<label class='col-md-4 control-label' for='sobreNomeCad'>Sobrenome*</label><div class='col-md-6'>";
	s1+="<input id='sobreNomeCad' name='sobreNomeCad' type='text' placeholder='Sobrenome' class='form-control input-md' required>";
	s1+="<span class='help-block'>Restante do seu nome</span></div></div>";
	
	s1+="<!-- Text input--><div class='form-group'>";
    s1+="<label class='col-md-4 control-label' for='cpfCad'>CPF*</label> <div class='col-md-6'>";
    s1+="<input id='cpfCad' name='cpfCad' type='text' placeholder='000.000.000.-00' class='form-control input-md' required>";
    s1+="<span class='help-block'>Seu CPF. Sua conta é pessoal e única.</span> </div> </div> ";
	 
    s1+="<!-- Text input-->";
    s1+="<div class='form-group'> <label class='col-md-4 control-label' for='emailCad'>Email*</label> <div class='col-md-6'>";
    s1+="<input id='emailCad' name='emailCad' type='text' placeholder='Seu email' class='form-control input-md' required>";
    s1+="<span class='help-block'>Email que você usa. Ficara vinculado a sua conta.</span>  </div> </div> ";
  
    s1+="<!-- Text input-->";
    s1+="<div class='form-group'> <label class='col-md-4 control-label' for='reEmailCad'>Redigite Email</label>";
    s1+="<div class='col-md-6'> <input id='reEmailCad' name='reEmailCad' type='text' placeholder='Redigite seu email*' class='form-control input-md'>";
    s1+="<span class='help-block'>Redigitação para confirmação do email</span> </div> </div>"; 
  
    s1+="<!-- Text input Numero de celular-->";
    s1+="<div class='form-group'>  <label class='col-md-4 control-label' for='celCad'>Numero de celular*</label>";
    s1+="<div class='col-md-6'> <input id='celCad' name='celCad' type='text' placeholder='( 000 ) 00000-0000' class='form-control input-md' required>";
	s1+="<span class='help-block'>Número de celular que ficará vinculada a sua conta</span> </div> </div> ";
	
	s1+="<!-- Password input  Senha-->";
    s1+="<div class='form-group'> <label class='col-md-4 control-label' for='senhaCad'>Senha*</label>  <div class='col-md-6'>";
    s1+="<input id='senhaCad' name='senhaCad' type='password' placeholder='Senha' class='form-control input-md' required>";
    s1+="<span class='help-block'>Senha com no mínimo 06 caracteres</span></div></div>";
	
	s1+="<!-- Password input ReSenha-->";
    s1+="<div class='form-group'> <label class='col-md-4 control-label' for='reSenhaCad'>Redigite a senha*</label>";
    s1+=" <div class='col-md-6'> <input id='reSenhaCad' name='reSenhaCad' type='password' placeholder='Redigite a senha' class='form-control input-md' required>";
    s1+="<span class='help-block'>Redigitação para confirmação da senha</span> </div></div>";
	
	s1+="<!-- Button (Double) -->";
    s1+="<div class='form-group'> <label class='col-md-4 control-label' for='btCadastrar'></label> <div class='col-md-8'>";
    s1+="<button id='btCadastrar' name='btCadastrar' class='btn btn-info'>Cadastrar</button> <button id='BtFechar' name='BtFechar' class='btn btn-secondary' data-dismiss='modal'>Fechar</button>";
    s1+="</div> </div> </fieldset>  </div> <!-- -->";
//</form>
	conteudo=s1;
	//conteudo="conteudo aqui";
	//alert(s1);
	mostraModal("",conteudo,false,false,false,"Em fase inicial de teste.Aguardem!");
}
function login(){
 document.getElementById('id01').style.display='block';
}
function carregandoMapa(){
	espereCarregandoRequisicao(true,"Carregando mapas...")
}
function mapasCarregados(){
	espereCarregandoRequisicao(false)
}
function achouLocalAutomatico(evento){ 
//latlng 	LatLng - bounds 	LatLngBounds - accuracy 	Number 	- altitude 	Number 	- 
//altitudeAccuracy - Number - heading 	Number 	-speed 	Number -
// -timestamp 	Number 	
try{

	passageiro.setLatLngI(evento.latlng);// seta/atualiza ObjetoJS Passageiro com a possível cood de embarque

	    var radius = evento.accuracy / 2;

	    var marker= L.marker(evento.latlng,{ draggable:true, autoclose:false}).addTo(this) // this reprsenta o map - não tem ";" aqui

            .bindPopup("Você! </br> Certo? ").openPopup(); 	

         if (!corrida.setagemInicial){

			corrida.setagemInicial=true;	 

			L.circle(evento.latlng, radius).addTo(this); // this reprsenta o map	 

		 }

	     marker.on("mouseup",achouLocalArrastando);//Vai servir tambem para os casos onde só se clica no mapa

		 app.markerI=marker;       //marker"i" e não marker"1" (um)  
         		 
         achouLocalArrastando(evento);
		 
		 
	     //console.log(passageiro);

} catch(e){

	alert(e.message);

}
}
function achouLocalArrastando(e) {		
		try{
			
             passageiro.setLatLngI(e.latlng);
				if  (corrida.setagemInicial) {			     

					app.geocoder.reverse(e.latlng, app.map.options.crs.scale(app.map.getZoom()), function(results) {

						var r = results[0];
                        var matEnd=r.name.split(",");	

						r="";	
                      					
						var p="";
						var x=0;
						for (var i=0;i<matEnd.length;i++){
							var p =matEnd[i].match(/Região|Mesorregião|Microrregião|Brasil/gi);
							   
							if (!(p)){
								r+=matEnd[i]+",";	//faz ultimo elemento ter uma virgula ao final							
							}
						}
						
                        var matEnd=r.split(",");//Ultimo elemento é "" por causa da virgula ao final
                         r=""; //reseta r						
						for (var i=0;i<matEnd.length-1;i++){//conta menos um prq ultimo elemento é ""
							if (i==matEnd.length-2){ 
								r+=matEnd[i]+".";
							} else {r+=matEnd[i]+",";}					  
							
						}	
						// marker = L.marker(r.center).bindPopup(r.name).addTo(map).openPopup(); 
						//console.log("->"+r);
						passageiro.setEndOrigem(r);

						app.markerI.bindPopup(r).openPopup();	//marker"i" e não marker"1" (um)   
                      						

					})

		    }// fim if  (window.corrida.setagemInicial) 
			var getDezMotProximos=true;	
			setMotoristas(getDezMotProximos);//setMotoristas(getDezMotProximos,motoristaEscolhidoDiretamente);

		}	catch(e){

			alert(e.message);

		}			

}
function mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel){//se txtBtOk não for passado o botão ok não aparece.
	//mostraModal("Seu motorista",conteudo,"Fechar esta janela","Contato","Cancelar viagem*","+Custo proporcional ao deslocamento feito até você.");
	try {
	var jm=document.getElementById("janelaModal");	
	document.getElementById("tituloJanelaModal").innerHTML =titulo;	
	
	var s1="<form class='form-horizontal'>";	   
	s1+=conteudo+"</br>";
     if (txtBtOk){
		  s1+= "<button id='btOkModal1' type='button' class='btn btn-primary'>"+txtBtOk+"</button>";		  
	 }
	 if (txtBtCancel){
		  s1+= "<button id='btCancelarModal1' type='button' class='btn btn-danger'>"+txtBtCancel+"</button>";
		   if (CallBackCancel){ document.getElementById("btCancelarModal1").onclick=CallBackCancel;}
	 }
       
	   if (txtBtExit){
	    s1+="<button id='btFecharModal1' type='button' class='btn btn-secondary' data-dismiss='modal'>"+txtBtExit+"</button>";	  
	   }
	   if (txtObs){
		  s1+= "</br><p>"+txtObs+"</p>";
	 }
	   s1+="</form>";
	document.getElementById("conteudoModal").innerHTML =s1;
	if (CallBackOk){ document.getElementById("btOkModal1").onclick=CallBackOk;}
	$(jm).modal('show');
    	
}catch(e){
	 alert("erro na function mostrarModal :  "+e.message);
}
}
function showFazerViagem(){
try {
	var jm=document.getElementById("janelaModal");	
	document.getElementById("tituloJanelaModal").innerHTML ="";
	document.getElementById("tituloJanelaModal").innerHTML ="Fazer viagem";   
	$(jm).modal('show');
	constroiContModal();
}catch(e){
	 alert("erro na function showFazerViagem :  "+e.message);
}
	

}
function constroiContModal(pJm){
  try {
	var iniViagem=passageiro.getEndOrigem();
 
	if (iniViagem=="") { 

	  iniViagem=" placeholder='Início da viagem aqui+ Enter' ";

	} else {

		iniViagem="value='"+iniViagem+"'";

	}

	
  //resolver problema autocompletar do chrome
	var s1="<form><div class='form-group'><label for='iViagem'>Endereço do início da viagem:</label>";

       s1+="<input type='text' class='form-control' id='iViagem' "+iniViagem+">";
       
       s1 +="</div> <div class='form-group'> <label for='fViagem'>Destino:</label>";
       
	   s1+= "<input name='finalVigae' type='text' class='form-control' data-width='100%'  placeholder='Destino da viagem aqui' style='display: none;'´ >";	   
       s1+= "<input name='finalVigaem' type='text' class='form-control' data-width='100%' id='fViagem' placeholder='Destino da viagem aqui'>";	   
	   
       s1+="<div class='form-group'><select class='form-control' id='sugDest' size='3'></select></div>";	   

       s1+= "<div ><br /><button id='btBuscarMotorista' type='button' class='btn btn-primary'>Buscar motorista</button>";

	   s1+="<button id='btFechar' type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";	  
	   s1+="<div id='msgErro'></div><br/></form>";
    
	document.getElementById("conteudoModal").innerHTML ="";

	document.getElementById("conteudoModal").innerHTML =s1;
   // document.getElementById("iViagem").onfocus=showEndInicial;
    jQuery('iViagem').attr('autocomplete','off');
	jQuery('fViagem').attr('autocomplete','off');
	document.getElementById("iViagem").onkeyup=pegaSugestaoEndViagem;
	document.getElementById("fViagem").onkeyup=pegaSugestaoEndViagem;
	document.getElementById("sugDest").onclick =atualEndViagem;
	document.getElementById("btBuscarMotorista").onclick =buscarMotorista;
	
	
     }catch(e){alert("erro na function constroiContModal :  "+e.message);}
}
function pegaSugestaoEndViagem(evento){
try {
	//alert(evento);
	document.getElementById("sugDest").options.length = 0;//zera list						 
	if(OnEnter(evento)){
		var aux=this; //preserva a refencia ao objeto Select que fica em aux
		var txtPesq=this.value;	
		try{
			var cidade=passageiro.getCidadeRef();
			
		}catch(e){
			alert("Erro depois function "+e.message);
		}
		//alert(evento);
		var cidade=passageiro.getCidadeRef();
		var estado=passageiro.getEstadoRef();
        var url="https://nominatim.openstreetmap.org/search?"
				url+="q="+txtPesq+","+estado+",Brasil&format=json&limit=5&email=falecomigo@ttp.drmoisessantos.com"			
		try {   ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");  }  
			catch(e) {   try {  ajaxObj = new ActiveXObject("Msxml2.XMLHTTP"); } 
			  catch(ex) { try  {     ajaxObj = new XMLHttpRequest();  
		 /************************************************************/
					ajaxObj.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var results=ajaxObj.response;
                            results=JSON.parse(results);
							
							var sug="";
							var vLatLng=[];
							const QMAXRESULT=5;	
							var i=1;
								while ((i<=QMAXRESULT) && (results[i-1]!=undefined)) {
									sug+=results[i-1].display_name+" ";
								    vLatLng.push([results[i-1].lat, results[i-1].lon]);	  
									i++;
								}	
								
								if (sug.trim()==""){
									    document.getElementById("sugDest").options.length = 0;//zera list
			                            aux.focus(); //aux represta this (Select)											
										document.getElementById("sugDest").innerHTML  ="<option value=0>Me ajude! Passe mais informações...</option>";
								}
								document.getElementById("sugDest").style.visibility='visible';											
								//console.log("=>"+sug); Com todas as sugestoes de endereço
								var matSug=sug.split("Brasil");//Matriz em cada endeco termina com ,
								
								for (var ix=0;ix<matSug.length-1;ix++){
													/*******************************************/			
												var matEnde=matSug[ix].split(",");		
												var r="";	                     		
												var p="";
												var x=0;
												for (var i=0;i<matEnde.length-1;i++){
												   matEnde[i]=matEnde[i].replace(/Rio Grande do Norte/i, "RN");
								    				 var p =matEnde[i].match(/Região|Mesorregião|Microrregião|Brasil/gi);
													    
														
													if (!(p)){
														r+=matEnde[i]+",";	
													}
												}
												
												var matEnde=r.split(",");//Ultimo elemento é "" por causa da virgula ao final
												var rX="";					
												for (var i=0;i<matEnde.length-2;i++){//conta menos um prq ultimo elemento é ""
												   
													if (i==matEnde.length-3){ 
														rX+=matEnde[i]+".";
													} else {rX+=matEnde[i]+",";}					  
													
												}	
												
											/*******************************************/
									r=rX;// Depois olha essas variaveis		
									matSug[ix]=r;
									//var iSelect = document.getElementById("sugDest").selectedIndex;
			                           var tSelect = document.getElementById("sugDest").options.length;
									var oSelect = document.getElementById("sugDest").options;
									var presente=false;
										for (var x=0;x<tSelect;x++){
											if (matSug[ix].trim()==oSelect[x].text.trim()){
												presente=true;
												break;
											}											
                                         }
										  if (!presente){
											 // alert(aux.id);
											   if (aux.id=="fViagem") {//faz marcacao no Select de onde vem a pesquisa
												   document.getElementById("sugDest").innerHTML  +="<option value='"+vLatLng[ix]+";F'>"+matSug[ix]+"</option>";
											   } else {
												   document.getElementById("sugDest").innerHTML  +="<option value='"+vLatLng[ix]+";I'>"+matSug[ix]+"</option>"; 
											   }
											  	
										  }
				
									//	console.log("Mat=> Enderco "+ix+" - "+matSug[ix]);
									}
				   }
			  if (this.readyState == 1){
				  
			  }
			  };
		  /************************************************************/
		  ajaxObj.open("GET", url, true);
		  ajaxObj.send();
		  /************************************************************/
		  } 
		  /************************************************************/
			   catch(exc) {   alert("Esse browser não tem recursos para uso do Ajax"); 
						   ajaxObj = null; 
						  } 
					} 
			   }
   /*********************************************************************/
						
						// marker = L.marker(r.center).bindPopup(r.name).addTo(map).openPopup(); 
					//	passageiro.setEndOrigem(r);

					//	app.markerI.bindPopup(r).openPopup();	//marker"i" e não marker"1" (um)  
						
             /*				Parte que usa banco de dados corrreios e completa
			              //via ajax input endFinal
							if (txtPesq.length>3){
				
								try {xhttp = new ActiveXObject("Microsoft.XMLHTTP");} catch(e)         
								{ try{xhttp = new ActiveXObject("Msxml2.XMLHTTP");} catch(ex)              
								 {try{xhttp = new XMLHttpRequest();} catch(exc)			    
								  {alert("Erro: Esse browser não tem recursos para uso do Ajax");				
									xhttp = null;}}} 
				
								  xhttp.onreadystatechange = function() {
									if (this.readyState == 4 && this.status == 200) {
				
									   document.getElementById("sugDest").style.visibility='visible';			   
									   document.getElementById("sugDest").innerHTML =xhttp.responseText;			   
									  console.log(xhttp.responseText);
									   }
									};
								xhttp.open("GET", "php/sugEnd.php?txtPesq="+txtPesq+"&cidade="+cidade+"&estado="+estado, true);
								xhttp.send();	
								
					}	
								   
			   
			   */
    }
    
            
             
     

} catch(e)	{alert("erro na function pegaSugestaoEndViagem :  "+e.message);}
	
}
function atualEndViagem(){
try{
	if (document.getElementById("sugDest").selectedIndex>=0){
			var x = document.getElementById("sugDest").selectedIndex;
			var y = document.getElementById("sugDest").options;
			var mat=y[x].value.split(";");//Ex.:-5.842864,-35.20993 ; F
		    if (mat[1]=="F") {
			  document.getElementById("fViagem").value=y[x].text;
			  passageiro.setEndFinal(y[x].text);
			  //alert(mat[0]);
			 // passageiro.setLatLngI( passageiro.getLatLngI());
			  passageiro.setLatLngF(mat[0]);//string ex.:"-5.842864,-35.20993"
			} else{
			  document.getElementById("iViagem").value=y[x].text;
			  passageiro.setEndOrigem(y[x].text);
			 // passageiro.setLatLngF(passageiro.getLatLngF());
			  passageiro.setLatLngI(mat[0]);
			}

			document.getElementById("sugDest").options.length = 0;//zera list
			
			if (mat[1]=="F") {
			    document.getElementById("fViagem").focus(); 	
			} else {
				document.getElementById("iViagem").focus(); 
			}
			
			document.getElementById("sugDest").style.visibility='hidden';                   
										  		
			
	}

}catch(e)	{
	  alert("erro na function atualEndViagem :  "+e.message);
	
}

}
function buscarMotorista(){ // chama defineRotaCorrida()
var getDezMotProximos=false;//deve pegar apenas O mais proximo, apenas UM
try {
      if (defineRotaCorrida()){
		setMotoristas(getDezMotProximos);//setMotoristas(getDezMotProximos,motoristaEscolhidoDiretamente)
	  document.getElementById("painelMotoristaEscolhido").style.visibility="visible";
	  document.getElementById("btDestino").style.visibility="hidden";	 
	  document.getElementById("nomeMotoristaEscolhido").innerHTML=motoristas[0].getNome(); 
	  if (!passageiro.getLogin()){
		document.getElementById("avisoSimulacao").style.visibility="visible";    
	  }
	  
	  }   
	  
	  
	
} catch(e){alert("Erro na funcao buscarMotorista "+e.message)}
}
function setMotoristas(getDezMotProximos,motoristaEscolhidoDiretamente){ //chamada em achouLocalArrastando(). Aqui já tem o preferencial baseado na distancia
	var latLng=passageiro.getLatLngI();  
	if (latLng!=null){
		 var url="../php/buscarMotoristas.php";
			 url+="?lat="+latLng.lat+"&lng="+latLng.lng;	
		try {   ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");  }  
			catch(e) {   try {  ajaxObj = new ActiveXObject("Msxml2.XMLHTTP"); } 
			  catch(ex) { try  {     ajaxObj = new XMLHttpRequest();  
		       /************************************************************/
					ajaxObj.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							try{
							var ObjMotoristas=JSON.parse(ajaxObj.response);
							if (motoristas.length>0){
									for (var x=0;x<motoristas.length;x++){
										motoristas[x].marca.remove();
																			
									}								
								}
							if (motoristas.length>0){
									for (var x=0;x<motoristas.length;x++){
										motoristas.pop(); 									 									
									}								
							}
								
							if (ObjMotoristas.motoristas.length>0){
								
							   if (getDezMotProximos){//se SIM
									var markerArray = [];//lista 10 motoristas mais proximos
									markerArray.push(app.markerI);//classificado por conceito e distancia
									
									for (var i=0;i<ObjMotoristas.motoristas.length;i++){
																											
									   var marca=L.marker([ObjMotoristas.motoristas[i].lat_posicao,ObjMotoristas.motoristas[i].lng_posicao], {icon: app.icon}).addTo(app.map).bindPopup(ObjMotoristas.motoristas[i].nome).openPopup();
									   marca.on('dblclick', onDbClickMarcaMotorista);
									  
									   markerArray.push(marca);
									   motoristas.push();//acrsecenta elemento em matriz motoristas definida logo inicio do script
									   motoristas[i] = new Motoristas();
									   motoristas[i].setCodigo(ObjMotoristas.motoristas[i].codigo);
									   motoristas[i].setNome(ObjMotoristas.motoristas[i].nome);
									   motoristas[i].setApelido(ObjMotoristas.motoristas[i].apelido);
									   motoristas[i].setMarca(marca);
									   motoristas[i].setPosicao(ObjMotoristas.motoristas[i].posicao);
									   motoristas[i].setLat(ObjMotoristas.motoristas[i].lat_posicao);
									   motoristas[i].setLng(ObjMotoristas.motoristas[i].lng_posicao);
									   if (i==ObjMotoristas.motoristas.length-1){
										   var group = L.featureGroup(markerArray); //add markers array to featureGroup
										   app.map.fitBounds(group.getBounds()); 
									   }							   
									}
									//Nesta funcao abaixo latLng.lat,latLng.lng indica posicao de embarque(PemB)
																	
							   }else{
								//motoristas.push();//acrsecenta elemento em matriz motoristas definida logo inicio do script
							    //motoristas[0] = new Motoristas();
								//Matriz com dados do motorista escolhido, inclusive a marca
								if (motoristaEscolhidoDiretamente){
									if (ObjMotoristas.motoristas.length>0){
										var achou=false;
									    var markerArray = [];//lista somente o motorista escolhido se ainda tiver disponível
									    markerArray.push(app.markerI);//marca do passageiro
										  for (var i=0;i<ObjMotoristas.motoristas.length;i++){
											  if (motoristas[i]){
												  motoristas[i].marca.removeFrom(app.map);
											  }
											  
											  if(motoristaEscolhidoDiretamente.getCodigo()==ObjMotoristas.motoristas[i].codigo){
												  //atualiza o dados do motorista escolhido
												   var marca=L.marker([ObjMotoristas.motoristas[i].lat_posicao,ObjMotoristas.motoristas[i].lng_posicao], {icon: app.icon}).addTo(app.map).bindPopup(ObjMotoristas.motoristas[i].nome).openPopup();
										   		   marca.on('mouseover', onMouseOverMarcaMotorista);	
												   marca.on('mouseout', onMouseOutMarcaMotorista);												   
									               markerArray.push(marca);
													motoristas.push();//acrsecenta elemento em matriz motoristas definida logo inicio do script
													motoristas[0] = new Motoristas();//necessário prq motoristas[] é zerada quando entra nesta funcao
													motoristas[0].setCodigo(ObjMotoristas.motoristas[0].codigo);
													motoristas[0].setNome(ObjMotoristas.motoristas[0].nome);
													motoristas[0].setApelido(ObjMotoristas.motoristas[0].apelido);
													motoristas[0].setMarca(marca);
													motoristas[0].setPosicao(ObjMotoristas.motoristas[0].posicao);
													motoristas[0].setLat(ObjMotoristas.motoristas[0].lat_posicao);
													motoristas[0].setLng(ObjMotoristas.motoristas[0].lng_posicao);
													app.setMotorista(motoristas[0]);
												  achou=true;
												  
											  }                                          
                                             if (i==ObjMotoristas.motoristas.length-1){
										        var group = L.featureGroup(markerArray); //add markers array to featureGroup
										         app.map.fitBounds(group.getBounds()); 
									            }											  
										  }
										  if(!achou){//se não achou
											  alert("Motorista não está mais disponível");
										  }
									}else{
										alert("Motorista parece não está mais disponível");
									}
								}else{//Zero prq é o primeiro de acordo com criterios de buscaMotoristas.php
								  //  var markerArray = [];//lista somente o motorista escolhido se ainda tiver disponível
								//	markerArray.push(app.markerI);//marca do passageiro
									//atualiza o dados do motorista escolhido pelo conceito e distancia
									var marca=L.marker([ObjMotoristas.motoristas[0].lat_posicao,ObjMotoristas.motoristas[0].lng_posicao], {icon: app.icon}).addTo(app.map).bindPopup(ObjMotoristas.motoristas[0].nome).openPopup();
									marca.on('mouseover', onMouseOverMarcaMotorista);	
									marca.on('mouseout', onMouseOutMarcaMotorista);												   
									//markerArray.push(marca);
												   
									motoristas.push();//acrsecenta elemento em matriz motoristas definida logo inicio do script
							        motoristas[0] = new Motoristas();//necessário prq motoristas[] é zerada quando entra nesta funcao
									motoristas[0].setCodigo(ObjMotoristas.motoristas[0].codigo);
									motoristas[0].setNome(ObjMotoristas.motoristas[0].nome);
									motoristas[0].setApelido(ObjMotoristas.motoristas[0].apelido);
									motoristas[0].setMarca(marca);
									motoristas[0].setPosicao(ObjMotoristas.motoristas[0].posicao);
									motoristas[0].setLat(ObjMotoristas.motoristas[0].lat_posicao);
									motoristas[0].setLng(ObjMotoristas.motoristas[0].lng_posicao);
									app.setMotorista(motoristas[0]);
									//remove restantes dos motoristas, por isso conta de 1(i=1)
									for (var i=1;i<ObjMotoristas.motoristas.length;i++){
										if (motoristas[i]){
												  motoristas[i].marca.removeFrom(app.map);
											  }
									}
									//chamaMotoristaEscolhido(motoristas[0]);
									}
							   }
							 espereCarregandoRequisicao(false);//funcao espereCarregandoRequisicao(carregando,txt)
							 //return motoristas[0];//retorna primeiro motorista escolhido
                              								
								
							} else {
								espereCarregandoRequisicao(false);
								//mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)
								mostraModal("Sem motorista","Não temos motoristas na área","Fechar esta janela","Configurações*",false,"*Tente o TeleTransporte.");
								//alert ("Sem motoristas disponíveis na área")
							}
							
							
							} catch(eD){alert(eD.message+" na função setMotoristas")}
                         
                        }//fim se readyState== 200 e readyState==4
					    if (this.readyState == 1){							
				          espereCarregandoRequisicao(true,"Verificando motoristas nas proximidades...",ajaxObj);
			             }
					   }
						
						/************************************************************/
						try{
							ajaxObj.open("GET", url, true);
							ajaxObj.send();
						}catch (e){
							alert("Erro:"+e.message+"\n Veja com o adrministrador se tem acesso ao BD. \n falecomigo@ttp.drmoisessantos.com")
						}
							
						/************************************************************/
					   }
					     /************************************************************/
			            catch(exc) {   alert("Esse browser não tem recursos para uso do Ajax"); 
						   ajaxObj = null; 
						  } 
					   }}
	  
		
		
		
	}else{
		console.log(passageiro);
	}
}
function espereCarregandoRequisicao(carregando,txt,requisicao){
	   if (carregando){
		   var elemento=document.getElementById("carregando");
		    if (!elemento){
				  $('<div></div>').attr("id","carregando").appendTo("body");	
				   $("<h2>").attr("id","txt").appendTo("div#carregando");
				   $("#txt").append("<p>"+txt+"</p></br><img src='imgs/espere.gif'/><br/><button type='button' id='btPararRequisicao'>Parar</button>");	
				   document.getElementById("btPararRequisicao").onclick=function(){
					   requisicao.abort();
	                   espereCarregandoRequisicao(false);
				   }
				   
				    
			}
	   }else{
		    $("div").remove("#txt");
			$("div").remove("#carregando");
			
		 
	   }	      
	                    
                        }
function stopRequisicao(requisicao){
	requisicao.abort();
	espereCarregandoRequisicao(false);
}
function defineRotaCorrida(){ //chamado por buscarMotorista().Define a rota e volta se deu certo
	  var latLngI=passageiro.getLatLngI();
	  var latLngF=passageiro.getLatLngF();
	  if (latLngF!=null){
		 	  var endFinal=passageiro.getEndFinal();
	  app.markerI.remove();
      if (app.rota!=null){
		  Routing=app.rota
	  } else {
		   var Routing =L.Routing.control({      
           routeWhileDragging: true,
	       language:'pt',
	       show:false,
		   lineOptions: {
		   styles: [{color: '#206B39', opacity: 1, weight: 10}]}
      });
	    Routing.addTo(app.map);
		  
	  }
	  Routing.on('routeselected', function(e) {
        var r = e.route;
        var line = L.Routing.line(r);
         var bounds = line.getBounds();
        app.map.fitBounds(bounds);
     });

	
      Routing.getPlan().setWaypoints([]);
	  
	  Routing.getPlan().setWaypoints([
          L.latLng(latLngI.lat,latLngI.lng),
          L.latLng(latLngF.lat,latLngF.lng)
      ]);      
	  app.rota=Routing;
	  var jm=document.getElementById("janelaModal");	
	  $(jm).modal('hide');	 
	  return true;
		  
	  }else{
		  
    
  
		  var s1="";
            s1+="<div class='alert alert-danger alert-dismissible fade in'>"
			s1+="<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
            s1+="<strong>Atenção!</strong> Preencha os campos selecionando as sugestões apresentadas!";
            s1+=" </div>"
		  document.getElementById("msgErro").innerHTML=s1;// em mostraModal	
          return false;		  
	  }

}
function carregaMenus(idioma){
	//app.setArqXml();//Seta o arquio XML na variavel que representa a app
	var arqXML;
         var xhttp  = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			   // Typical action to be performed when the document is ready:
			   arqXML = xhttp.responseXML;
			   traduz("nSite",idioma,arqXML);			   
	  		   }
			};
		xhttp.open("GET", "xml/menus.xml", true);
		xhttp.send();	
}
function traduz(id,ling,arqXML){	
	/* Sempre obedecer o esquema ling/oque/nomeitem	   
	   ling: pt-br, en 
	   oque: menu
	   nomeitem: nSite, etc...
	   
	*/
	var iMenu, x, y, i, xlen,txt;
    var menu=[];
			  
    x = arqXML.getElementsByTagName(ling)[0];
    xlen = x.childNodes.length;
	//alert(xlen);
    y = x.firstChild;
    txt = "";
	iMenu=0;
    for (i = 0; i < xlen; i++) {
        if (y.nodeType == 1) {
             // alert(y.firstChild.nodeValue);
			menu[iMenu]=y.firstChild.nodeValue;
			iMenu++;
			
    //        txt = i + "        " + y.nodeName +"     "+y.firstChild.nodeValue+ "<br>";
		//	alert(txt);
        }
        y = y.nextSibling;
    }
 
	document.getElementById("nSite").textContent=menu[0];
	document.getElementById("inicio").textContent=menu[1];
	document.getElementById("fazerViagem").textContent=menu[2];
	document.getElementById("voceeagente").innerHTML=menu[3]+"<span class='caret'></span>";
	document.getElementById("suaQualificacao").textContent=menu[4]; /*Perigo seguranca:uso do innerHTML*/
	document.getElementById("viagensFeitas").textContent=menu[5];
	document.getElementById("configuracoes").innerHTML=menu[6]+"<span class='caret'></span>";
	document.getElementById("formasDePagamento").textContent=menu[7];
	document.getElementById("teletransporte").textContent=menu[8];
	document.getElementById("compartilharViagem").textContent=menu[9];
	document.getElementById("notificações").textContent=menu[10];
	document.getElementById("idioma").textContent=menu[11];
}
function acheme()  {
  if (app.markerI){	app.markerI.remove();}
	app.map.locate({ setView: true });
	mapa.setZoom(10);
}
function OnEnter(evt){
    var key_code = evt.keyCode  ? evt.keyCode  :
                       evt.charCode ? evt.charCode :
                       evt.which    ? evt.which    : void 0; 
    if (key_code == 13)
    {
        return true;
    }
}
function showEndInicial(){
	var iniViagem=passageiro.getEndOrigem();
	document.getElementById("iViagem").innerHTML=iniViagem;
}
function onDbClickMarcaMotorista(e) {
try {
var motoristaEscolhido, nomeMotorista, apelidoMotorista;	
	 for (var x=0;x<motoristas.length;x++){
		 var errolat=Math.abs(e.latlng.lat*1852 *60-(motoristas[x].lat*1852 *60));//<0,001
	     var errolng=Math.abs(e.latlng.lng*1852 *60-(motoristas[x].lng*1852 *60));
		

		if (( errolat<=0.001) && (errolng<=0.001)){
		    app.setMotorista(motoristas[x]);// importante lembra de jogar os dados no App
			nomeMotorista=motoristas[x].getNome();
		    apelidoMotorista=motoristas[x].getApelido();	
	  }
	 }
     s1="<spam class='col-md-4' for='Nome'>Nome:</spam>"+nomeMotorista+"</br> ";
	 if (apelidoMotorista){
		s1+=" <spam class='col-md-4 ' for='apelido'>Pode chamar de: </spam>"+apelidoMotorista+"</br> ";
	 }
	 s1+="<spam class='col-md-4 ' for='foto'>Foto do motorista: </spam>";
     s1+="<img class='fotoMotorista' src='imgs/sf.png'>";
     s1 +="</br><spam class='col-md-4 ' for='viagensRealizadas'>Viagens realizadas:</spam>";
	 

     s1+="</br></br></br><label class='col-md-4 control-label' for='fViagem'>Destino:</label>"
	   s1+="<div class='form-group col-md-8'> ";       
	   s1+= "<input name='finalVigaem' type='text' oninput='associa()' class='form-control input-md' data-width='70%'  placeholder='Destino da viagem aqui' style='display: none;'´ >";	   
       s1+= "<input name='finalVigaem' type='text' oninput='associa()' class='form-control input-md' data-width='70%' id='fViagem' placeholder='Destino da viagem aqui + Enter'>";	   
	   
       s1+="</div></br><div class='form-group col-md-4'><select  id='sugDest' size='3'></select></div>";
       s1+="<div id='msgErro'></div>";	   
    
   mostraModal("Dados do motorista",s1,"Fechar","Chamar este motorista*",escolheMotoristaEspecfico,"</br>*Chame quem você conhece.");//se txtBtOk não for passado o botão ok não aparece.
	
}catch(e){alert("Erro na funcao onDbClickMarcaMotorista "+e.message)}	
  
}
function associa(){
	document.getElementById("fViagem").onkeyup=pegaSugestaoEndViagem;
	document.getElementById("sugDest").onclick =atualEndViagem;
}
function escolheMotoristaEspecfico(){	
 var jm=document.getElementById("janelaModal");	 
 var motoristaEscolhidoDiretamente=app.getMotorista();//motorista setado em onDbClickMarcaMotorista
 var  url="../php/setaStatusComoChamando.php?codigo="+motoristaEscolhidoDiretamente.codigo;
  $(jm).modal('hide');
  if (passageiro.getLogin()){//so seta se estive logado
    $.get(url, function(resultado){});//Não faz nada Ainda somente setaBd.Tem que etornar ainda...
  }
  
  		setMotoristas(false,motoristaEscolhidoDiretamente);//setMotoristas(getDezMotProximos,motoristaEscolhidoDiretamente). Necessario consulda BD
	 // buscarMotorista();//Para traçar a rota da viagem
	  if (passageiro.getLatLngF()){
		  defineRotaCorrida();
	  }	   
	  document.getElementById("painelMotoristaEscolhido").style.visibility="visible";
	  document.getElementById("btDestino").style.visibility="hidden";	 
	  document.getElementById("nomeMotoristaEscolhido").innerHTML=motoristaEscolhidoDiretamente.getNome(); 
	  if (!passageiro.getLogin()){
		document.getElementById("avisoSimulacao").style.visibility="visible";    
	  }
}		
function onMouseOverMarcaMotorista(){
	//
}
function onMouseOutMarcaMotorista(){
	//
}
function onLocationError(erro) {
 var titulo,conteudo;
     titulo="Erro ao localizar!";
	 if (erro.code==1){
		 conteudo="Localização só é possível com protocolo https.<br/> Digite na frente do endereco da página <em>https://</em> e <br/> permita a localização quando for perguntado."
	 }else
	 {
	     conteudo=erro.message+" "+ erro.code ;	 
	 }
	 
	//mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)
	 mostraModal(titulo,conteudo,"Fechar");
}
function showIdioma(){
	var jm=document.getElementById("janelaModal");	
	document.getElementById("tituloJanelaModal").innerHTML ="";
	document.getElementById("tituloJanelaModal").innerHTML ="Idioma";
	$(jm).modal('show');
	constroiIdiomaModal();
}
function constroiIdiomaModal(pJm){
	
		
		var s1="<form><div class='form-group'><label for='iViagem'>Endereço do início da viagem:</label>";
       s1+="<input type='text' class='form-control' id='iViagem' "+iniViagem+">";
       s1 +="</div> <div class='form-group'> <label for='fViagem'>Destino:</label>";
       s1+= "<input type='text' class='form-control' id='fViagem' placeholder='Destino da viagem aqui + Enter'></div>";  
       s1+= "<div id='btBuscarMotorista'><button type='button' class='btn btn-primary'>Buscar motorista</button>";
	   s1+="<button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>	  </form>";

   

	document.getElementById("conteudoModal").innerHTML ="";

	document.getElementById("conteudoModal").innerHTML =s1;
		
	
	

}
function setAltImgs(){


}
