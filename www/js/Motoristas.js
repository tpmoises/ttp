 // online, ocupado, pausado, tele, destino
//  0         0        0       0      0    - desligado  00000
//  0         x        x       1      x    - off-tele - muito mais caro  10 ou 11
//  1         1        x       x      x    - com passageiro - pode pegar passageiro destino -conf->11000 
//  1         0        1       x      x    - online, mas pausado - >10100 ou 10101 ou 10110 ou 10111
//  1         0        0       0      0    - normal = 10000
//  1         0        0       1      0    - online, tele SEM destino =10010 
//  1         0        0       1      1    - online, tele COM destino =10011

 var Motoristas = function (){// Construtor da corrida	  this.codig=0;	  this.setagemInicial=false; // usada para indicar que a coodenada inicial é a detectada pelo equipamento	  var LatLngInicial=null;
	  this.codigo="";
	  this.nome="";
	  this.sobrenome="";
	  this.apelido="";
	  this.posicao=null;
	  this.posicaoAnt=null;
	  this.marca=null;
	  this.lat=null;
	  this.lng=null;	   
	  this.latLngF=null;  // posicao inicial do passageiro e final da corrida
	  this.STATUS=10000;//com letra maiúscula
	  this.ficticio=1;
	  this.qUnidade=0;
	  this.valorUnidade=0;
	  this.valorMinuto=0;
	  this.margemLucro=0;
	  this.cat_cnh=null;
	  this.url_avatar=null;
 }	  

 Motoristas.prototype={	 
       getCodigo:function (){
		  return this.codigo;
	  },
	  setCodigo:function (id){
		  try { 
               this.codigo=id			 
		  } catch(err) {
			  alert(err.message +"em Motoristas.setCodigo()")			 
		  };
	  }, 
	  getNome:function (){
		  return this.nome;
	  },
	  setNome:function (nm){
		  try { 
               this.nome=nm;		 
		  } catch(err) {
			  alert(err.message +"em Motoristas.setNome()")			 
		  };
	  }, 
	   getSobrenome:function (){
		  return this.sobrenome;
	  },
	  setSobrenome:function (nm){
		  try { 
               this.sobrenome=nm;		 
		  } catch(err) {
			  alert(err.message +"em Motoristas.setSobrenome()")			 
		  };
	  },
      getApelido:function (){
		  return this.apelido;
	  },
	  setApelido:function (a){
		  try { 
               this.apelido=a			 
		  } catch(err) {
			  alert(err.message +"em Motoristas.setApelido()")			 
		  };
	  },
	  
	  getPosicao:function (){
		  return this.posicao;
	  },

	  setPosicao:function (p){
		  try { 
               this.posicao=p			 
		  } catch(err) {
			  alert(err.message +"em Motoristas.setPosicao()")			 
		  };
	  },
	   getPosicaoAnt:function (){
		  return this.posicaoAnt;
	  },

	  setPosicaoAnt:function (p){
		  try { 
               this.posicaoAnt=p			 
		  } catch(err) {
			  alert(err.message +"em Motoristas.setPosicaoAnt()")			 
		  };
	  },
	  getMarca:function (){
		  return this.marca;
	  },

	  setMarca:function (m){
		  try { 
               this.marca=m;			 
		  } catch(err) {
			  alert(err.message +"em Motoristas.setMarca()")			 
		  };
	  },
	  getLatLngF:function (){
		  return this.latLngF;		  
	  },  
      setLatLngF:function (ltlg){
		  try {
			  this.latLngF=ltlg;			
			  return true;	  
		  } catch(err) {
			  alert("erro em setLatLngFinal de Motoristas:"+err.message);
			  return false;
		  } ;
	  },
	  getLat:function (){
		  return this.lat;		  
	  },  
      setLat:function (lt){
		  try {
			  this.lat=lt;			
			  return true;	  
		  } catch(err) {
			  alert("erro em setLatLngFinal de Motoristas:"+err.message);
			  return false;
		  } ;
	  },
	  getLng:function (){
		  return this.lng;		  
	  },  
      setLng:function (lg){
		  try {
			  this.lng=lg;			
			  return true;	  
		  } catch(err) {
			  alert("erro em setLatLngFinal de Motoristas:"+err.message);
			  return false;
		  } ;
	  },
	  getStatus:function (){
		  return this.STATUS;
	  },
	  setStatus:function (s){
		   this.STATUS=s;
	  },
	  getFicticio:function (){
		  return this.ficticio;
	  },
	  setFicticio:function (f){
		   this.ficticio=f;
	  }, 	  
	  
	  getCat_cnh:function (){
		  return this.cat_cnh;
	  },
	  setCat_cnh:function (s){
		   this.cat_cnh=s;
	  },
	  getUrl_avatar:function (){
		  return this.url_avatar;
	  },
	  setUrl_avatar:function (f){
		   this.url_avatar=f;
	  }
	  
  }//fim Classe 

  
  //lab eletronica CSE:-5.842319, -35.197341 Cid: -5.842466, -35.197258 