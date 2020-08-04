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
  
  var codCorrNormal      =  '00001111';// Corrida normal (1º Passo)
  
  
  var codBuscPasCorrNormal  = '00010000'; //busca em corrida Normaleta (2º Passo)
  var codEspPasCorrNormal   = '00010001';  //Esperando em local de embarque passageiro corrida direta (3º Passo)
  var codCorrNormalPasEmb   = '00010010'; //passageiro já está embarcado (4º Passo)
//  var codCorrNormalPas    = '00010011'; 
  var codCorrNormalNAceita  = '00010100';
  var codCorrNormalAceita   = '00010101';
  var codCorrNormalTerm     = '00010110'; //corrida normal  finalizada
  var codCorrNormalCancP    = '00010111';
  var codCorrNormalCancM    = '00011000';
  
  var codViagemNormalProb   = '00011001';// 
  
  /* Moto - chamda direta  */
 
  var codCorrDirMoto        = '00011010';
  
  var codBuscPasCorrDirMoto  = '00011011'; //busca em corrida direta (2º Passo)
  var codEspPasCorrDirMoto   = '00011100'  //Esperando em local de embarque passageiro corrida direta (3º Passo)
  var codCorrDirPasEmbMoto   = '00011101'; //passageiro já está embarcado (4º Passo)
 // var codCorrDirPasMoto      = '00011110'; //corrida direta com Moto (1º Passo)
  var codCorrDirNAceitaMoto  = '00011111';
  var codCorrDirAceitaMoto   = '00100000';
  var codCorrDirTermMoto     = '00100001'; //corrida direta de Moto finalizada
  var codCorrDirCancPMoto    = '00100010';
  var codCorrDirCancMMoto    = '00100011';
  
  var codViagemDirProbMoto   = '00110010';// 
  
  /* Moto - chamda Normal  */
 
   var codCorrNormalMoto     = '00100111';
  
  var codBuscPasCorrNormalMoto  = '00101000'; //busca em corrida Normaleta (2º Passo)
  var codEspPasCorrNormalMoto   = '00101001';  //Esperando em local de embarque passageiro corrida direta (3º Passo)
  var codCorrNormalPasEmbMoto   = '00101010'; //passageiro já está embarcado (4º Passo)
//  var codCorrNormalPasMoto    = '00101011'; 
  var codCorrNormalNAceitaMoto  = '00101100';
  var codCorrNormalAceitaMoto   = '00101101';
  var codCorrNormalTermMoto     = '00101110'; //corrida normal  finalizada
  var codCorrNormalCancPMoto    = '00101111';
  var codCorrNormalCancMMoto    = '00110000';
  
  var codViagemNormalProbMoto   = '00110001';// 
  
  
 

 

 
  /*********** CODIGO DE CAHAMADAS *********/
  /*         COMEÇA COM 1                 */
  
  var codChamCorrNormal    = '10001111';
  var codChamDirPas        = '10000111';         //corrida direta
  var codChamCorrNormalMoto     = '10100111';
  var codChamCorrDirMoto        = '10011010';
  
  
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
  
  /****** Funcoes Moto *******/  
  
  this.getCodChamDirMoto=function() {
	  return codChamCorrDirMoto;
  }; 
  this.setCodChamDirMoto=function(c) {
	  codChamCorrDirMoto=c;
  };

  this.getCodCorrDirMoto=function() {
	  return codCorrDirMoto;
  }; 
  this.setCodCorrDirMoto=function(c) {
	  codCorrDirMoto=c;
  }; 
  
  
  this.getCodBuscPasCorrDirMoto=function() {
	  return codBuscPasCorrDirMoto;
  }; 
  this.setCodBuscPasCorrDirMoto=function(c) {
	  codBuscPasCorrDirMoto=c;
  }; 
  
  this.getCodEspPasCorrDirMoto=function() {
	  return codEspPasCorrDirMoto;
  }; 
  this.setCodEspPasCorrDirMoto=function(c) {
	  codEspPasCorrDirMoto=c;
  }; 
  
  this.getCodCorrDirPasEmbMoto=function() {
	  return codCorrDirPasEmbMoto;
  }; 
  this.setCodCorrDirPasEmbMoto=function(c) {
	  codCorrDirPasEmbMoto=c;
  }; 
  
  this.getCodCorrDirNAceitaMoto=function() {
	  return codCorrDirNAceitaMoto;
  }; 
  this.setCodCorrDirNAceitaMoto=function(nc) {
	  codCorrDirNAceitaMoto=nc;
  }; 
  this.getCodCorrDirAceitaMoto=function() {
	  return codCorrDirAceitaMoto;
  }; 
  this.setCodCorrDirAceitaMoto=function(aceita) {
	  codCorrDirAceitaMoto=aceita;
  }; 
  this.getCodCorrDirTermMoto=function() {
	  return codCorrDirTermMoto;
  }; 
  this.setCodCorrDirTermMoto=function(cf) {
	  codCorrDirTermMoto=cf;
  }; 
  
  
  this.getCodViagemDirProbMoto=function() {
	  return codViagemDirProbMoto;
  }; 
  this.setCodViagemDirProb=function(ep) {
	  codViagemDirProbMoto=ep;
  }
  
  

  this.getCodCorrNormalMoto=function() {
	  return codCorrNormalMoto;
  }; 
  this.setCodCorrNormalMoto=function(c) {
	  codCorrNormalMoto=c;
  }; 
  
  
   this.getCodChamCorrNormalMoto=function() {
	  return codChamCorrNormalMoto;
  }; 
  this.setCodChamCorrOnLine=function(c) {
	  codChamCorrNormalMoto=c;
  };
  
  this.getCodBuscPasCorrNormalMoto=function() {
	  return codBuscPasCorrNormalMoto;
  }; 
  this.setCodBuscPasCorrNormalMoto=function(c) {
	  codBuscPasCorrNormalMoto=c;
  }; 
  
  this.getCodEspPasCorrNormalMoto=function() {
	  return codEspPasCorrNormalMoto;
  }; 
  this.setCodEspPasCorrNormalMoto=function(c) {
	  codEspPasCorrNormalMoto=c;
  }; 
  
  this.getCodCorrNormalPasEmbMoto=function() {
	  return codCorrNormalPasEmbMoto;
  }; 
  this.setCodCorrNormalPasEmbMoto=function(c) {
	  codCorrNormalPasEmbMoto=c;
  }; 
  
  this.getCodCorrNormalNAceitaMoto=function() {
	  return codCorrNormalNAceitaMoto;
  }; 
  this.setCodCorrNormalNAceitaMoto=function(nc) {
	  codCorrNormalNAceitaMoto=nc;
  }; 
  this.getCodCorrNormalAceitaMoto=function() {
	  return codCorrNormalAceita;
  }; 
  this.setCodCorrNormalAceitaMoto=function(aceita) {
	  codCorrNormalAceitaMoto=aceita;
  }; 
  this.getCodCorrNormalTermMoto=function() {
	  return codCorrNormalTermMoto;
  }; 
  this.setCodCorrNormalTermMoto=function(cf) {
	  codCorrNormalTermMoto=cf;
  }; 
}