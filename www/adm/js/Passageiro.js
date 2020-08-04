 var Passageiro = function (){ // Construtor de Passageiro
	  this.codigo=0;
	  this.nome="";
	  this.endOrigem="";
	  this.endFinal="";
	  this.cidadeRef="";
	  this.estadoRef="";
	  this.latLngI=null; // informacao dinâmica. Refere-se ao local detectado num início de uma possível viagem
	  this.latLngF=null;  // não consta na tabela passageiro
 }
Passageiro.prototype={	 
	  getLatLngI:function (){
		   try {  return this.latLngI;		  
		   } catch(err){
			   alert("erro em getLatLngI:"+err.message);
		   }
	  },  
      setLatLngI:function (ltlg){
		  try {
			  this.latLngI=ltlg;			
			  return true;	  
		  } catch(err) {
			  alert("erro em setLatLng:"+err.message);
			  return false;
		  } ;
	  }, 	  
	  
	   getLatLngF:function (){
		  return this.latLngF;		  
	  },  
      setLatLngF:function (ltlg){
		  try {
			  this.latLngF=ltlg;			
			  return true;	  
		  } catch(err) {
			  alert("erro em setLatLngFinal:"+err.message);
			  return false;
		  } ;
	  }, 	  
	  
	  setEndOrigem:function(endOr){

		  this.endOrigem=endOr;

	  },

      getEndOrigem:function(){

		  return this.endOrigem;

	  },
	  setEndFinal:function(endOr){

		  this.endOrigem=endOr;

	  },

      getEndFinal:function(){

		  return this.endOrigem;

	  },
	  setCidadeRef:function(){
		   var str = this.endOrigem; 
		  // alert(str);
           var res = str.match(/Natal|Parnamirim/i);		   
		   if (!res){res="Nossos serviços ainda não estão disponíveis em sua cidade. Aguarde!"};
		  this.cidadeRef=res;
	  },
	  getCidadeRef:function(){
		  this.setCidadeRef();
		  return this.cidadeRef;		  
	  },
	  
	  setEstadoRef:function(){
		   var str = this.endOrigem; 
		  // alert(str);
           var res = str.match(/Rio Grande do Norte|RN/i);	
              if (res=="Rio Grande do Norte"){res="RN"}		   
		   if (!res){res="Nossos serviços ainda não estão disponíveis em seu Estado. Aguarde!"};
		  this.estadoRef=res;
	  },
	  getEstadoRef:function(){
		  this.setEstadoRef();
		  return this.estadoRef;		  
	  }
  }//fim Classe Passageiro 