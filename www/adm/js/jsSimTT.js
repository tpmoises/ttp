 /*Objeto passageiro. Escopo global. Nas funcoes é acessada por window.passageiro */

 var app= new App(); // App.js

 var passageiro= new Passageiro();

 var corrida= new Corrida(); 

 var motoristas = [];

 var STATUS = new Status();//Defini os Status que o motorista pode está no arquivo status.js



 //var motorista = new Motoristas();

 var myIcon = L.icon({

    iconUrl: 'imgs/markerMot.png',

    iconSize: [30, 48],

    iconAnchor: [15, 48],

    popupAnchor: [8,-40], 

});

window.onload=function (){  // Esta parte carrega depois que toda página html carrega



 //fazer objetos aplicativo, passageiro, motorista e viagem aqui



 try{ 



  //Carrega menu do site de acordo com o idioma



  //alert(document.getElementById("inicio").textContent);



 //carregaMenus("pt-br");   //Implementando lá embaixo app.getIdioma()



  //alert(document.getElementById("miniBtAcheme"));



  document.getElementById("miniBtAcheme").onclick=acheme;

  document.getElementById("visualizarTodosMotoristas").onclick=visMotoristas;

  document.getElementById("visualizarSoMotoristasOnLine").onclick=visMotoristasOnLine;

  document.getElementById("visualizarSoMotoristasOffLine").onclick=visMotoristasOffLine;

  document.getElementById("visualizarSoMotoristasCorridaDireta").onclick=visMotoristasEmCorrDireta;

  document.getElementById("areas").onclick=fDefineAreas;

  

  

  

 // document.getElementById("fazerViagem").onclick=showFazerViagem; 

 // document.getElementById("fazerViagem2").onclick=showFazerViagem; 



  /* Voce e a gente*/



//  document.getElementById("suaQualificacao").onclick=showFazerViagem;

 // document.getElementById("viagensFeitas").onclick=showFazerViagem;



  /* Configuracoes */



//  document.getElementById("formasDePagamento").onclick=showFazerViagem;

 // document.getElementById("teletransporte").onclick=showFazerViagem;

 // document.getElementById("compartilharViagem").onclick=showFazerViagem; 

 // document.getElementById("notificações").onclick=showFazerViagem;

 // document.getElementById("idioma").onclick=showIdioma;



  /* Ajuda */



 // document.getElementById("faleConosco").onclick=showFazerViagem;

 // document.getElementById("politica").onclick=showFazerViagem;

  //document.getElementById("termosLegais").onclick=showFazerViagem;



  var mapa = L.map('map',{ closePopupOnClick:false, zoomControl:false,zoom:12}).fitWorld(),  



      geocoder= L.Control.Geocoder.nominatim(formatRetorno),



     // controlProcurar = L.Control.geocoder({geocoder: geocoder, placeholder:"Procurar..."}).addTo(mapa);	  



	  controlZoom=L.control.zoom({ zoomInTitle:'Aumentar', zoomOutTitle:'Diminuir'}).addTo(mapa);



	  mapa.on("locationfound",achouLocalAutomatico);	



      mapa.locate({ setView: true,maxZoom:12 });

	  

	  



	  var imgMapa = L.tileLayer('https://api.mapbox.com/styles/v1/moisestp/cjjsr7g3n21lo2sqqah05gjzm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2thcTA2bzNuMGM0MTJwbzNldzR2aG9jaSJ9.lwjUKjDMue39HX3kb7duPA', {

		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',

		maxZoom: 19

	}).addTo(mapa);



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



function visMotoristasOnLine(){

	visMotoristas(STATUS.getCodOnLine());

}

function visMotoristasEmCorrDireta(){

	visMotoristas(STATUS.getCodCorrDirPas());

}

function visMotoristasOffLine(){

	visMotoristas(STATUS.getCodOffLine());

}



function formatRetorno(){

	return result[0];

	

}

function enquadra(bordas,lat,lng){

	

	

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

	//achouLocalAutomatico

	//Passageiro.setEndOrigem

}







function showFazerViagem(){

try {

	

	var jm=document.getElementById("janelaModal");	



	



	document.getElementById("tituloJanelaModal").innerHTML ="";



	document.getElementById("tituloJanelaModal").innerHTML ="Fazer viagem";



   // var menu=document.getElementById("fh5co-mobile-menu").style.visibility = "hidden"; 



	$(jm).modal('show');

	



	constroiContModal();

	

	

}catch(e){

	 alert("erro na function showFazerViagem :  "+e.message);

}

	



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

       s1+= "<input type='text' class='form-control' id='fViagem' placeholder='Destino da viagem aqui'></div>";  

       s1+= "<div id='btBuscarMotorista'><button type='button' class='btn btn-primary'>Buscar motorista</button>";

	   s1+="<button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>	  </form>";



   



	document.getElementById("conteudoModal").innerHTML ="";



	document.getElementById("conteudoModal").innerHTML =s1;

		

	

	



}





function constroiContModal(pJm){

  try {

	var iniViagem=passageiro.getEndOrigem();

 

	if (iniViagem=="") { 



	  iniViagem=" placeholder='Início da viagem aqui' ";



	} else {



		iniViagem="value='"+iniViagem+"'";



	}



	



	var s1="<form><div class='form-group'><label for='iViagem'>Endereço do início da viagem:</label>";



       s1+="<input type='text' class='form-control' id='iViagem' "+iniViagem+">";



       s1 +="</div> <div class='form-group'> <label for='fViagem'>Destino:</label>";



       s1+= "<input type='text' class='form-control' data-width='100%' id='fViagem' placeholder='Destino da viagem aqui'>";	   

       s1+="<div class='form-group'><select class='form-control' id='sugDest' size='3'></select></div>";	   



       s1+= "<div id='btBuscarMotorista'><br /><button type='button' class='btn btn-primary'>Buscar motorista</button>";



	   s1+="<button id='btFechar' type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";	  

	   s1+=" <div class='contClass' id='controls'></div> </form>";

    

	document.getElementById("conteudoModal").innerHTML ="";



	document.getElementById("conteudoModal").innerHTML =s1;

    document.getElementById("iViagem").onfocus=showEndInicial;

	//document.getElementById("iViagem").onchange=pegaSugestaoEndIViagem;

	document.getElementById("fViagem").onkeyup=pegaSugestaoEndFViagem;

	document.getElementById("sugDest").onclick =atualEndFViagem;

	document.getElementById("btBuscarMotorista").onclick =buscarMotorista;

	

	

     }catch(e){alert("erro na function constroiContModal :  "+e.message);}

}



function buscarMotorista(){ // defineRota()

     

     //motoristas moises 01 e mm2 sssillva2

     // dist_max_emb e dist_viavel 2 e 3 kms	

     //posicoes dieferentes	 

	

	  

	  

	  

      var latLngI=passageiro.getLatLngI();

	  

	  var sCenter=document.getElementById("hLatLngFinal").value.split(",");

	  var center = L.latLng(sCenter);	  

	  passageiro.setEndFinal(document.getElementById("fViagem").value);

	 // var latLngI=passageiro.getLatLngI();

	  var endFinal=passageiro.getEndFinal();

	  app.markerI.removeFrom(app.map);

	//  marker = L.marker(center).bindPopup(endFinal).addTo(app.map).openPopup(); 

      if (app.rota!=null){

		  Routing=app.rota

	  } else {

		   var Routing =L.Routing.control({      

           routeWhileDragging: false,

	       language:'pt'

	 

      });

	    Routing.addTo(app.map);

		  

	  }

	

      Routing.getPlan().setWaypoints([]);

	 // alert(latLngI.lat);

	 // alert(latLngI.lng);

	  

	  Routing.getPlan().setWaypoints([

          L.latLng(latLngI.lat,latLngI.lng),

          L.latLng(center.lat,center.lng)

      ]);	

	  app.rota=Routing;

	  var jm=document.getElementById("janelaModal");	

	  $(jm).modal('hide');

	 

	  

	 // document.getElementById("btFechar").onclick();

     //passageiro.setEndFinal(r);

	 //	app.markerI.bindPopup(r).openPopup();	//marker"i" e não marker"1" (um) 

	 

	 

	//buscarMotorista();

	

	

}





function atualEndFViagem(){

try{

	if (document.getElementById("sugDest").selectedIndex>=0){

			var x = document.getElementById("sugDest").selectedIndex;

			var y = document.getElementById("sugDest").options;

			document.getElementById("fViagem").value=y[x].text;

			document.getElementById("hLatLngFinal").value=y[x].value;//pega lat/lng joga em input hidden

			//alert(document.getElementById("hLatLngFinal").value);

			document.getElementById("sugDest").options.length = 0;//zera list

			document.getElementById("fViagem").focus(); 

			document.getElementById("sugDest").style.visibility='hidden';                   

										  		

			

	}



}catch(e)	{

	  alert("erro na function atualEndFViagem :  "+e.message);

	

}



}





function pesqEndAjax(urlArq){

  

}



function OnEnter(evt)

{

    var key_code = evt.keyCode  ? evt.keyCode  :

                       evt.charCode ? evt.charCode :

                       evt.which    ? evt.which    : void 0; 

    if (key_code == 13)

    {

        return true;

    }

}



function pegaSugestaoEndFViagem(evento){

try {

	document.getElementById("sugDest").options.length = 0;//zera list						 

	if(OnEnter(evento)){

		var txtPesq=document.getElementById("fViagem").value;	

		try{

			var cidade=passageiro.getCidadeRef();

			

		}catch(e){

			alert("Erro depois function "+e.message);

		}

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

				//vLatLng[i-1]=L.latLng(results[i-1].lat, results[i-1].lon);//centro do endereço retornado

									 // passageiro.setLatLngF()aqui não da certo prq temos aqui todos os cemtros de todas as escolhas

									i++;

								}	

								

								if (sug.trim()==""){

									    document.getElementById("sugDest").options.length = 0;//zera list

			                            document.getElementById("fViagem").focus(); 											

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

											    

											  	document.getElementById("sugDest").innerHTML  +="<option value="+vLatLng[ix]+">"+matSug[ix]+"</option>";

										  }

				

										console.log("Mat=> Enderco "+ix+" - "+matSug[ix]);

									}

		

						

                   //alert(resultado);				   

				   //return resultado;

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

    

            

             

     



} catch(e)	{alert("erro na function pegaSugestaoEndFViagem :  "+e.message);}

	

}

function showEndInicial(){

	var iniViagem=passageiro.getEndOrigem();

	document.getElementById("iViagem").innerHTML=iniViagem;

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

				

			setMotoristas(e.bounds);



		}	catch(e){



			alert(e.message);



		}			



}



function visMotoristas(STATUSpar){	

         var url="../adm/php/visallmotoristas.php";     

          

         

		 if (typeof(STATUSpar)!='object'){

			 url="../adm/php/visMotorista.php?status="+STATUSpar;

		 }

		 

		

			 

		// var url="../php/visallmotoristas.php";

			 

		try {   ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");  }  

			catch(e) {   try {  ajaxObj = new ActiveXObject("Msxml2.XMLHTTP"); } 

			  catch(ex) { try  {     ajaxObj = new XMLHttpRequest();  

		 /************************************************************/

					ajaxObj.onreadystatechange = function() {

						if (this.readyState == 4 && this.status == 200) {

							try{

							var ObjMotoristas=JSON.parse(ajaxObj.response);

							var nomeApelido="";

							

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

							var markerArray = [];

							markerArray.push(app.markerI);

							

							for (var i=0;i<ObjMotoristas.motoristas.length;i++){

                              if ((ObjMotoristas.motoristas[i].apelido.trim())==""){

							     nomeApelido=ObjMotoristas.motoristas[i].nome	  

							  }else{

								  nomeApelido=ObjMotoristas.motoristas[i].apelido;

							  }							  							 					

							   var marca=L.marker([ObjMotoristas.motoristas[i].lat_posicao,ObjMotoristas.motoristas[i].lng_posicao], {icon: app.icon}).addTo(app.map).bindPopup(nomeApelido).openPopup();

							    

								 marca.on('dblclick', onDbClickMarcaMotorista);

							  

							   markerArray.push(marca);

							   motoristas.push();//acrsecenta elemento em matriz motoristas definida logo inicio do script

							   motoristas[i] = new Motoristas();

							   motoristas[i].nome=ObjMotoristas.motoristas[i].nome;

							   motoristas[i].codigo=ObjMotoristas.motoristas[i].codigo;

							   motoristas[i].apelido=ObjMotoristas.motoristas[i].apelido;

							   motoristas[i].marca=marca;

							   motoristas[i].posicao=ObjMotoristas.motoristas[i].posicao;

							   motoristas[i].lat=ObjMotoristas.motoristas[i].lat_posicao;

							   motoristas[i].lng=ObjMotoristas.motoristas[i].lng_posicao;

							   

							   if (i==ObjMotoristas.motoristas.length-1){

								   var group = L.featureGroup(markerArray); //add markers array to featureGroup

                                   app.map.fitBounds(group.getBounds()); 

							   }

							   

							}

							//Nesta funcao abaixo latLng.lat,latLng.lng indica posicao de embarque(PemB)

							//enquadra(bounds,latLng.lat,latLng.lng);//enquadra a PemB com os motoristas disponiveis  na visualização

							

							} catch(eD){alert(eD.message+"\n  "+i+" falecomigo@ttp.drmoisessantos.com")}

                  

                       }}

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

	  

		

		

		

	

}



function onDbClickMarcaMotorista(e) {

try {

var motoristaEscolhido, nomeMotorista, apelidoMotorista;	

	 for (var x=0;x<motoristas.length;x++){

		 var errolat=Math.abs(e.latlng.lat*1852 *60-(motoristas[x].lat*1852 *60));//<0,001

	     var errolng=Math.abs(e.latlng.lng*1852 *60-(motoristas[x].lng*1852 *60));

		// alert(errolat);

	    //   alert(errolng);



		if (( errolat<=0.001) && (errolng<=0.001)){

		    app.setMotorista(motoristas[x]);// importante lembra de jogar os dados no App

			nomeMotorista=motoristas[x].getNome();

		    apelidoMotorista=motoristas[x].getApelido();

			codigoMotorista=motoristas[x].getCodigo();

	  }

	 }

	// alert(codigoMotorista);

	 

	 var url="../php/getDadosMotorista.php?codigo="

     s1="<label for='Nome'>Nome:</label>"+nomeMotorista+"</br> ";

	 if (apelidoMotorista){

		s1+=" <label for='apelido'>Pode chamar de: </label>"+apelidoMotorista+"</br> ";

	 }

	 s1+="<label for='foto'>Foto do motorista: </label>";

     s1+="<img class='fotoMotorista' src='imgs/sf.png'>";

     s1 +="</br><label for='viagensRealizadas'>Viagens realizadas:</label>";

     s1+="</br><label for='MudarStatus'>Mudar Status:</label><select id='MudarStatus'>";

	 s1+="<option value='"+STATUS.getCodOffLine()+"'>"+STATUS.getCodOffLine()+"</option>";

	 s1+="<option value='"+STATUS.getCodOnLine()+"'>"+STATUS.getCodOnLine()+"</option>";	 

	 s1+"</select>";

	 s1+="</br><label for='ficticio'>Está FICTÍCIO:</label>";

     s1+="<select id='ficticio'>";

	 s1+="<option value='1'>Sim</option>";

	 s1+="<option value='0'>Não</option>";	 

	 s1+"</select>";

   //titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.

   mostraModal("Dados do motorista",s1,"Fechar","OK",false,"*Chame quem você conhece.");//se txtBtOk não for passado o botão ok não aparece.

	

}catch(e){alert("Erro na funcao onDbClickMarcaMotorista "+e.message)}	

  

}



//titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.

function mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.

	//mostraModal("Seu motorista",conteudo,"Fechar esta janela","Contato","Cancelar viagem*","+Custo proporcional ao deslocamento feito até você.");

	try {

	var jm=document.getElementById("janelaModal");	

	document.getElementById("tituloJanelaModal").innerHTML =titulo;	

	if (urlFormPost){

		var s1="<form method='POST' id='fModal1' action='"+urlFormPost+"' class='form-horizontal'>";

	}else{

		var s1="<form id='fModal1' class='form-horizontal'>";

	}

	

		   

	s1+=conteudo+"<br><div class='centraliza'>";

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

	   

	   s1+="</div>";

	   

	   if (txtObs){

		  s1+= "<br><div class='centraliza'><p>"+txtObs+"</p></div>";

	 }

	   s1+="</form>";

	document.getElementById("conteudoModal").innerHTML =s1;

	

	if (CallBackOk){ document.getElementById("btOkModal1").onclick=CallBackOk;}

	$(jm).modal('show');

    	

}catch(e){

	 alert("erro na function mostrarModal :  "+e.message);

}

}









function setMotoristas(bounds){

	var latLng=passageiro.getLatLngI();

  //  alert(bounds.getNorthWest().lat+","+bounds.getNorthWest().lng);

	//alert(bounds.getSouthEast().lat+","+bounds.getSouthEast().lng);

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

							var nomeApelido="";

							

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

							var markerArray = [];

							markerArray.push(app.markerI);

							//var markers = L.markerClusterGroup();

							for (var i=0;i<ObjMotoristas.motoristas.length;i++){

                              if ((ObjMotoristas.motoristas[i].apelido.trim())==""){

							     nomeApelido=ObjMotoristas.motoristas[i].nome	  

							  }else{

								  nomeApelido=ObjMotoristas.motoristas[i].apelido;

							  }							  							 					

							   var marca=L.marker([ObjMotoristas.motoristas[i].lat_posicao,ObjMotoristas.motoristas[i].lng_posicao], {icon: app.icon}).addTo(app.map).bindPopup(nomeApelido).openPopup();

							    

								 marca.on('mouseover', onClick);

							  // markers.addLayer(marca);

							   markerArray.push(marca);

							   motoristas.push();//acrsecenta elemento em matriz motoristas definida logo inicio do script

							   motoristas[i] = new Motoristas();

							   motoristas[i].nome=ObjMotoristas.motoristas[i].nome;

							   motoristas[i].codigo=ObjMotoristas.motoristas[i].codigo;

							   

							   motoristas[i].apelido=ObjMotoristas.motoristas[i].apledido;

							   motoristas[i].marca=marca;

							   motoristas[i].posicao=ObjMotoristas.motoristas[i].posicao;

							   motoristas[i].lat=ObjMotoristas.motoristas[i].lat_posicao;

							   motoristas[i].lng=ObjMotoristas.motoristas[i].lng_posicao;

							   if (i==ObjMotoristas.motoristas.length-1){

								   var group = L.featureGroup(markerArray); //add markers array to featureGroup

                                   app.map.fitBounds(group.getBounds()); 

							   }

							   

							}

							//Nesta funcao abaixo latLng.lat,latLng.lng indica posicao de embarque(PemB)

							enquadra(bounds,latLng.lat,latLng.lng);//enquadra a PemB com os motoristas disponiveis  na visualização

							

							} catch(eD){alert(eD.message+"\n  "+i+" falecomigo@ttp.drmoisessantos.com")}

                  

                       }}

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



function onClick(e) {

     s1="<form><div class='form-group'><label for='foto'>Foto do motorista:</label>";

     s1+="<img id='fotoMotorista' src='imgs/sf.png'>";

     s1 +="</div> <div class='form-group'> <label for='viagensRealizadas'>Viagens realizadas:</label>";

     s1+= "<div id='btChamar'><br /><button type='button' class='btn btn-primary'>Chamar este motorista</button>";

	 s1+="<button id='btFechar' type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";	  

	 s1+=" <div class='contClass' id='controls'></div> </form>";

	document.getElementById("conteudoModal").innerHTML =s1;

}		



function onLocationError(evento) {



   



}







function my_button_onClick() {



 try {



	 //alert("Sera quE  cLicou em mim? Minha ESPOSA? ERICA Veia. Moisés Satos.");

	 document.getElementById("popDest").style.display="block";

	 /*  var i;

	   var bts=document.getElementsByClassName("leaflet-buttons-control-img");



      for (i=0;i<bts.length;i++){



		  if  (bts[i].src=="imgs/btTudoOkA.png"){



			   bts[i].setAttribute("id","btOkFindDest");



			   bts[i].setAttribute("data-toggle","modal"); 



			   bts[i].setAttribute("data-target","#myModal");			    



		  }



		  



		  



	  } */



	 



 }	catch(e){alert("Erro em function my_button_onClick"+ e.message)}



 

}







function setAltImgs(){





}



function fDefineAreas(){

    var titulo="Configurações - Área de abragência ";

    var conteudo='<select><option selected value="RN">RN</option><option value="Natal">Natal</option></select>';



    mostraModal(titulo,conteudo,'Fechar','OK',setConfiguracoes,'Escolha área de abragência',false,false,false)

}

function setConfiguracoes(){

    

}