 var Passageiro = function (){ // Construtor de Passageiro
	  this.login=null; // do passageiro
	  this.codigo=0;
	  this.nome="";
	  this.endOrigem="";
	  this.endFinal="";
	  this.cidadeRef="";
	  this.estadoRef="";
	  this.latLngI=null; // informacao dinâmica. Refere-se ao local detectado num início de uma possível viagem
	  this.latLngF=null;  // não consta na tabela passageiro
      this.fone=null;//=corrida.contato_pas
	  this.STATUS=null;
 }
Passageiro.prototype={	 
	  getLogin:function(){
		 return this.login;
	  },	
      setLogin:function(lg){
		 this.login=lg;
	  },
	  getCodigo:function(){
		 return this.codigo;
	  },	
      setCodigo:function(cd){
		 this.codigo=cd;
	  },
	  getNome:function(){
		 return this.nome;
	  },	
      setNome:function(n){
		 this.codigo=n;
	  },
	  getLatLngI:function (){
		   try {  return this.latLngI;		  
		   } catch(err){
			   alert("erro em getLatLngI:"+err.message);
		   }
	  },  
      setLatLngI:function (ltlg){
		  try {
			   if (typeof(ltlg)!="object"){		
                  ltlg=ltlg.split(",");//pega string transforma em matriz			   
				  ltlg=L.latLng(ltlg);
			  }		 	

			  this.latLngI=ltlg;
             // alert(this.latLngI) 			  ;
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
			   if (typeof(ltlg)!="object"){		
                  ltlg=ltlg.split(",");//pega string transforma em matriz			   
				  ltlg=L.latLng(ltlg);
			  }
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

		  this.endFinal=endOr;

	  },

      getEndFinal:function(){

		  return this.endFinal;

	  },
	  setCidadeRef:function(){
		   var str = this.endOrigem; 
		  // alert(str);
           var res = str.match(/João Pessoa|Joao Pessoa|Natal|Parnamirim/i);		   
		   if (!res){res="Natal"};
		  this.cidadeRef=res;
	  },
	  getCidadeRef:function(){
		  this.setCidadeRef();
		  return this.cidadeRef;		  
	  },
	  
	  setEstadoRef:function(){
		   var str = this.endOrigem; 
		  // alert(str);
           var res = str.match(/Paraiba|PB|Rio Grande do Norte|RN/i);	
              if (res=="Rio Grande do Norte"){res="RN"}		   
		   if (!res){res="RN"};
		  this.estadoRef=res;
	  },
	  getEstadoRef:function(){
		  this.setEstadoRef();
		  return this.estadoRef;		  
	  },
	  getStatus:function (){
		  return this.STATUS;
	  },
	  setStatus:function (s){
		   this.STATUS=s;
	  }
	  
  }//fim Classe Passageiro 