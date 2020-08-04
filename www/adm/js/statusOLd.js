//status possiveis
////jsttm.js de motorista 
 //Novas definicoes - dia 12/06/2018
 // chamada? tele   |  destino(ou filtro)| pausado ocupado continua online 
//     0      0     |   0                |   0        0       0       0     - desligado  00000
//     0      0     |   0                |   0        0       1       1     - online normal
//     1      0     |   0                |   0        0       1       1     - chamada de corrida normal 
//     1      0     |   0                |   1        1       0       1     - Chamada direta
//     0      0     |   0                |   1        1       0       1     - Corrida direta
 
var Status=function (){
//Chamada?TeleFiltroPausadoOcupadoContinuaOnline 	
//CtFpOCO 
  var codOffLine         = '0000000'; 
  var codOnLine          = '0000011';  //corida tradicional
  
  var codBuscPasCorrDir  = '0000100'; //busca em corrida direta (2º Passo)
  var codEspPasCorrDir   = '0000101'  //Esperando em local de embarque passageiro corrida direta (3º Passo)
  var codCorrDirPasEmb   = '0000110'; //passageiro já está embarcado (4º Passo)
  var codCorrDirPas      = '0000111'; //corrida direta (1º Passo)
  
  /*********** CODIGO DE CAHAMADAS *********/
  /*         COMEÇA COM 1                 */
  
  var codChamCorrOnLine    = '1000011';
  var codChamDirPas        = '1000111';         //corrida direta
  
  /***********   Funcoes  ***********/  
 
  this.getCodOffLine=function() {
	  return codOffLine;
  }; 
  this.setCodOffLine=function(c) {
	  codOffLine=c;
  } 
   this.getCodOnLine=function() {
	  return codOnLine;
  }; 
  this.setCodOnLine=function(c) {
	  codOnLine=c;
  };
     this.getCodChamCorrOnLine=function() {
	  return codChamCorrOnLine;
  }; 
  this.setCodChamCorrOnLine=function(c) {
	  codChamCorrOnLine=c;
  };

  this.getCodChamDirPas=function() {
	  return codChamDirPas;
  }; 
  this.setCodChamDirPas=function(c) {
	  codChamDirPas=c;
  };

  this.getCodCorrDirPas=function() {
	  return codCorrDirPas;
  }; 
  this.setCodCorrDirPas=function(c) {
	  codCorrDirPas=c;
  }; 
  
  
  this.getCodBuscPasCorrDir=function() {
	  return codBuscPasCorrDir;
  }; 
  this.setCodBuscPasCorrDir=function(c) {
	  codBuscPasCorrDir=c;
  }; 
  
  this.getCodEspPasCorrDir=function() {
	  return codEspPasCorrDir;
  }; 
  this.setCodEspPasCorrDir=function(c) {
	  codEspPasCorrDir=c;
  }; 
  
  this.getCodCorrDirPasEmb=function() {
	  return codCorrDirPasEmb;
  }; 
  this.setCodCorrDirPasEmb=function(c) {
	  codCorrDirPasEmb=c;
  }; 
  
  
  
  
}