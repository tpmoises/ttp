 var Corrida = function (){// Construtor da corrida	  this.codig=0;	  this.setagemInicial=false; // usada para indicar que a coodenada inicial é a detectada pelo equipamento	  var LatLngInicial=null;
	  var LatLngFinal=null;
	  this.geocoder=null;	  
 }
 
Corrida.prototype={
	  getLatLng:function (){
		  return latLng;
	  },
	  setLatLng:function (LatLng,inicial){

		  try { //usa true para coordenadas inicias. False para coordenadas finais.

			  if (inicial){
			  this.LatLngInicial=LatLng;
				  
			  } else{
				  this.LatLngFinal=LatLng;
				 			  
			  }
		  } catch(err) {
			  alert(err.message)
			 
		  };
	  } 	  

  }//fim Classe Corrida (no singular)
