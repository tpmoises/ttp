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
  var codOffLine         = '00000000'; 
  var codOnLine          = '00000011';  //OnLine
  
  var codBuscPasCorrDir  = '00000100'; //busca em corrida direta (2º Passo)
  var codEspPasCorrDir   = '00000101'  //Esperando em local de embarque passageiro corrida direta (3º Passo)
  var codCorrDirPasEmb   = '00000110'; //passageiro já está embarcado (4º Passo)
  var codCorrDirPas      = '00000111'; //corrida direta (1º Passo)
  var codCorrDirNAceita  = '00001000';
  var codCorrDirAceita   = '00001001';
  var codCorrDirTerm     = '00001010'; //corrida direta finalizada
  var codCorrDirCancP    = '00001011';
  var codCorrDirCancM    = '00001100';
  
  var codEmPausa         = '00001101';// em pausa Se mudar aqui lembra de mudar em BackgroundGeolocation.startTask
  
  var codViagemDirProb   = '00001110';//
  
  var codCorrNormal      = '00001111';// Corrida normal (1º Passo)
  
  
  var codBuscPasCorrNormal  = '00010000'; //busca em corrida Normaleta (2º Passo)
  var codEspPasCorrNormal   = '00010001';  //Esperando em local de embarque passageiro corrida direta (3º Passo)
  var codCorrNormalPasEmb   = '00010010'; //passageiro já está embarcado (4º Passo)
//  var codCorrNormalPas      = '00010011'; 
  var codCorrNormalNAceita  = '00010100';
  var codCorrNormalAceita   = '00010101';
  var codCorrNormalTerm     = '00010110'; //corrida direta finalizada
  var codCorrNormalCancP    = '00010111';
  var codCorrNormalCancM    = '00011000';
  
  
  /*********** CODIGO DE CAHAMADAS *********/
  /*         COMEÇA COM 1                 */
  
  var codChamCorrNormal    = '10001111';
  var codChamDirPas        = '10000111';         //corrida direta
  
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

  
  this.getCodCorrDirCancM=function() {
	  return codCorrDirCancM;
  }; 
  this.setCodCorrDirCancM=function(c) {
	  codCorrDirCancM=c;
  };
  //codCorrDirCancM
  
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
  
  this.getCodCorrDirNAceita=function() {
	  return codCorrDirNAceita;
  }; 
  this.setCodCorrDirNAceita=function(nc) {
	  codCorrDirNAceita=nc;
  }; 
  this.getCodCorrDirAceita=function() {
	  return codCorrDirAceita;
  }; 
  this.setCodCorrDirAceita=function(aceita) {
	  codCorrDirAceita=aceita;
  }; 
  this.getCodCorrDirTerm=function() {
	  return codCorrDirTerm;
  }; 
  this.setCodCorrDirTerm=function(cf) {
	  codCorrDirTerm=cf;
  }; 
  this.getCodCorrDirCancP=function() {
	  return codCorrDirCancP;
  }; 
  this.setCodCorrDirCancP=function(cf) {
	  codCorrDirCancP=cf;
  }; 
  
  this.getCodEmPausa=function() {
	  return codEmPausa;
  }; 
  this.setCodEmPausa=function(ep) {
	  codEmPausa=ep;
  };
  
  
  
  this.getCodViagemDirProb=function() {
	  return codViagemDirProb;
  }; 
  this.setCodViagemDirProb=function(ep) {
	  codViagemDirProb=ep;
  }
  
  

  this.getCodCorrNormal=function() {
	  return codCorrNormal;
  }; 
  this.setCodCorrNormal=function(c) {
	  codCorrNormal=c;
  }; 
  
  
   this.getCodChamCorrNormal=function() {
	  return codChamCorrNormal;
  }; 
  this.setCodChamCorrOnLine=function(c) {
	  codChamCorrNormal=c;
  };
  
  this.getCodBuscPasCorrNormal=function() {
	  return codBuscPasCorrNormal;
  }; 
  this.setCodBuscPasCorrNormal=function(c) {
	  codBuscPasCorrNormal=c;
  }; 
  
  this.getCodEspPasCorrNormal=function() {
	  return codEspPasCorrNormal;
  }; 
  this.setCodEspPasCorrNormal=function(c) {
	  codEspPasCorrNormal=c;
  }; 
  
  this.getCodCorrNormalPasEmb=function() {
	  return codCorrNormalPasEmb;
  }; 
  this.setCodCorrNormalPasEmb=function(c) {
	  codCorrNormalPasEmb=c;
  }; 
  
  this.getCodCorrNormalNAceita=function() {
	  return codCorrNormalNAceita;
  }; 
  this.setCodCorrNormalNAceita=function(nc) {
	  codCorrNormalNAceita=nc;
  }; 
  this.getCodCorrNormalAceita=function() {
	  return codCorrNormalAceita;
  }; 
  this.setCodCorrNormalAceita=function(aceita) {
	  codCorrNormalAceita=aceita;
  }; 
  this.getCodCorrNormalTerm=function() {
	  return codCorrNormalTerm;
  }; 
  this.setCodCorrNormalTerm=function(cf) {
	  codCorrNormalTerm=cf;
  }; 
    
}