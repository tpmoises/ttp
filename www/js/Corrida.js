 var Corrida = function (){// Construtor da corrida	  this.codig=0;	  this.setagemInicial=false; // usada para indicar que a coodenada inicial é a detectada pelo equipamento	  var LatLngInicial=null;
	  this.codigo=null;
	  this.latLngFinal=null;// ==latLngF do passageiro
	  this.latLngInicial=null;//Onde o motorista se enconra
	  this.latLngBusca=null;//==latLngI do passageiro
	  this.end_embarque=null;	  
	  this.passageiro=null;
	  this.nomePassageiro=null;
	  this.end_embarque=null;
	  this.end_final_declarado=null;
	  this.motorista=null;
	  this.setagemInicial=null;	//latLog Detectada 
      this.hora_final=null;
      this.hora_inicial=null; 
      this.contato_pas=null;	  
	  this.contato_mot=null;
      this.ctEstimado=null;	  
	  this.STATUS=null; 
 }
 
Corrida.prototype={
	  getCodigo:function (){
		  return this.codigo;
	  },
	  setCodigo:function (c){
		  try { 
			  this.codigo=c;
			  
		  } catch(err) { alert("Erro funcao setCodigo de Passageiro.js: "+err.message) };
	  },
	  getLatLngFinal:function (){
		  return this.latLngFinal;
	  },
	  setLatLngFinal:function (f){
		  try { 
			  this.latLngFinal=f;
			  
		  } catch(err) { alert("Erro funcao setLatLngFinal de Passageiro.js: "+err.message) };
	  }, 	  
	  getLatLngInicial:function (){
		  return this.latLngInicial;
	  },
	  setLatLngInicial:function (i){
		  try { 
			  this.latLngInicial=i;
			  
		  } catch(err) { alert("Erro funcao setLatLngInicial de Passageiro.js: "+err.message) };
	  }, 
	  getLatLngBusca:function (){
		  return this.latLngBusca;
	  },
	  setLatLngBusca:function (b){
		  try { 
			  this.latLngBusca=b;
			  
		  } catch(err) { alert("Erro funcao setLatLngBusca de Passageiro.js: "+err.message) };
	  }, 	  
	  getPassageiro:function (){
		  return this.passageiro;
	  },
	  setPassageiro:function (p){
		  try { 
			  this.passageiro=p;
			  
		  } catch(err) { alert("Erro funcao setPassageiro de Passageiro.js: "+err.message) };
	  },
	  getMotorista:function (){
		  return this.motorista;
	  },
	  setMotorista:function (mt){
		  try { 
			  this.motorista=mt;
			  
		  } catch(err) { alert("Erro funcao setMotorista de Passageiro.js: "+err.message) };
	  }, 	  
	  getSetagemInicial:function (){
		  return this.setagemInicial;
	  },
	  setSetagemInicial:function (si){
		  try { 
			  this.setagemInicial=si;
			  
		  } catch(err) { alert("Erro funcao setSetagemInicial de Passageiro.js: "+err.message) };
	  },
 	  getStatus:function (){
		  return this.STATUS;
	  },
	  setStatus:function (S){
		  try { 
			  this.STATUS=S;
			  
		  } catch(err) { alert("Erro funcao setSTATUS de corrida.js: "+err.message) };
	  },
	  getHora_final:function (){
		  return this.hora_final;
	  },
	  setHora_final:function (hf){
		  try { 
			  this.hora_final=hf;
			  
		  } catch(err) { alert("Erro funcao Hora_final de corrida.js: "+err.message) };
	  },
	  getHora_inicial:function (){
		  return this.hora_inicial;
	  },
	  setHora_inicial:function (hi){
		  try { 
			  this.hora_inicial=hi;
			  
		  } catch(err) { alert("Erro funcao hora_inicial de corrida.js: "+err.message) };
	  },
	  
	  getCtEstimado:function (){
		  return this.ctEstimado;
	  },
	  setCtEstimado:function (ct){
		  try { 
			  this.ctEstimado=ct;
			  
		  } catch(err) { alert("Erro funcao setCtEstimado de corrida.js: "+err.message) };
	  }
      
	  
 }//fim Classe Corrida (no singular)
