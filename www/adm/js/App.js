var App = function (){
	 var login=""; // do passageiro
	 this.idioma="pt-br";
	 this.xmlArq="";
	 this.tempoEmSegundosVerificaStatusCorrida=5*1000;//tempo padrão 5s. Se quiser modificar é aqui
	 this.map=null;
	 this.controlProcurar=null;
	 this.controlZoom=null;
	 this.geocoder=null;
	 this.markerI=null;
	 this.markerF=null;
	 this.imgMapa=null;
	 this.rota=null;
	 this.rotaBuscaPassageiro=null;
	 this.icon=null;
	 this.passageiro=null;
	 this.motorista=null;
	 this.corrida=null; 
     this.getLogin=function(){
		 return login;
	 }	
     this.setLogin=function(lg){
		 login=lg;
	 }		 
 }
 
App.prototype={	
	 setIdioma: function (idi){
		  this.idioma=idi;
	  },
	 getIdioma: function (){
		  return this.idioma;
	  },
	 getArqXmldeFato:function (){
         var arqXML;
         var xhttp  = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			   // Typical action to be performed when the document is ready:
			   arqXML = xhttp.responseXML;
			   return arqXML;
	  		   }
			};
		xhttp.open("GET", "xml/menus.xml", true);
		xhttp.send();		
       },	   
	 setArqXml:function(){
		   this.xmlArq=getArqXmldeFato();
	   },
	 getArqXml:function(){
		   return this.xmlArq;
	   },
	  setMotorista:function(m) {
		  this.motorista=m;
	  },
	  getMotorista:function() {
		  return this.motorista;
	  },
	  setTempoEmSegundosVerificaStatusCorrida:function(t){
		   this.tempoEmSegundosVerificaStatusCorrida=t*1000;
	   },
	  getTempoEmSegundosVerificaStatusCorrida:function(){
		   return this.tempoEmSegundosVerificaStatusCorrida;
	   }  
	
} 