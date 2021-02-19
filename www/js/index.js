
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		try{
		var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
                var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;	 
                const recognition = new SpeechRecognition();
			
		 window.plugins.insomnia.keepAwake(); //plugun que faz app não apagar tela
                 //window.plugins.insomnia.allowSleepAgain() funçao apar autorizar voltar ao modo ocioso
			
	//	document.addEventListener("resume", onResume, false);	
		//app.receivedEvent('deviceready');
	  
		var iab = cordova.InAppBrowser;	
	        try{
        	 BackgroundGeolocation.configure({
             locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
             desiredAccuracy: 0,
             stationaryRadius: 10,
             distanceFilter: 0,
             notificationTitle: 'TeleTransporte.net',
             notificationText: 'em segundo plano',
             debug: false,	
             interval: 5000,
        	 fastestInterval:2500,
        	 notificationEnabled:true,
        	 startForeground:true,
        	 noticationIconColor:'#5cb85c',
             maximumAge:0 //esta opcao ou
            // enableHighAccuracy:true 
             //maxAge:0	// esta opcao  ? depois que coloque esta paerece que travou.Observar
  }); 
  }	catch (eConf) {{alert("Erro na função configuracoes  de onDeviceReady: "+eConf.message)}}
		 try{
  BackgroundGeolocation.on('authorization', function(status) {
    console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
    if (status !== BackgroundGeolocation.AUTHORIZED) {
      // we need to set delay or otherwise alert may not be shown
      setTimeout(function() {
        var showSettings = confirm('App requires location tracking permission. Would you like to open app settings?');
        if (showSetting) {
          return BackgroundGeolocation.showAppSettings();
        }
      }, 1000);
    }
  });
  }catch(estop){alert("authorization")}
			 BackgroundGeolocation.on('location', function(location) {    	 	 
       BackgroundGeolocation.startTask(function(taskKey) {
		try{
			// execute long running task
		  // eg. ajax post location
		  // IMPORTANT: task has to be ended by endTask
		  //enviar coodenadas para o BD daqui		  	
		  BackgroundGeolocation.endTask(taskKey);					
		}catch(e){alert("eero em startTask dentro de onlocation ",e.message);}
      
    });
  });
  
   BackgroundGeolocation.start();//aqui há primeira geolocalização com o uso do plugin cordova
       //  cam()	;
	   //,'mediaPlaybackRequiresUserAction=yes','shouldPauseOnSuspend=yes','useWideViewPort=yes'
	   if (verificaExistenciaSessao("p1")){		    
		   document.getElementById("deviceready").style.display='none';
		   // alert(navigator.device.capture);	
		//navigator.camera.cleanup(onSuccessClear, onFailClear);
             
			   cordova.plugins.barcodeScanner.scan(
      function (result) {
        //  alert("We got a barcode\n" +
          //      "Result: " + result.text + "\n" +
           //     "Format: " + result.format + "\n" +
            //    "Cancelled: " + result.cancelled);			
				removeSessao("p1");
				iab.open('https://teletransporte.net?qrcode='+result.text, '_blank','location=no'); 
      },
      function (error) {
          alert("Scanning failed: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : false, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: true, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Centralize  barcode inside the scan area", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
						  
                              
			setTimeout(function(){
			//	removeSessao("p1");
				 location.reload();		
			},10000);
	   }else{
		   var ref= iab.open('https://teletransporte.net', '_blank','location=no'); 
           // attach listener to loadstart
			ref.addEventListener('loadstart', function(event) { 
				var urlSuccessPage = "https://teletransporte.net/success/";
				if (event.url == urlSuccessPage) {
				 //verificaExistenciaSessao(id)   criaAtualizaSessao(id,sessao)  recuperaSessao(id) removeSessao(id)
				 criaAtualizaSessao("p1","le_qrcode");
				//window.p1 = 'le_qrcode'; 	
				 ref.close();  
                 location.reload();				
				//alert(window.p1);
                				
				}
			});	 
	   }
	   
			
	   /* 
	   var url=get_par_url();//parametro vindo do reload ao se querer le qrcode
	   if (url.p1){
		   var url.p1;
			   if (p1=="le_qrcode"){
				   //fica locamelnte e faz oprecaoes com plugin cordova, por exemplo, lê a camera
				   
			   }   
	   }else{
		   //joga para url https no servidor, necessário para o login via Face
		  	   
	   }
	   */
	      
		}catch(e){alert(e.message)}
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        //var parentElement = document.getElementById(id);
        //var listeningElement = parentElement.querySelector('.listening');
        //var receivedElement = parentElement.querySelector('.received');
      
	   //window.open = cordova.InAppBrowser.open();
       // listeningElement.setAttribute('style', 'display:none;');
       // receivedElement.setAttribute('style', 'display:block;');
        //window.location.replace("https://ttp-sandbox.drmoisessantos.com");
       // console.log('Received Event: ' + id);
    }
	 
};
function onResume() {
try{	
   //var iab = cordova.InAppBrowser;	
	       //iab.open('https://teletransporte.net', '_self','location=no');  
}catch(e){alert(e.message)}
}

function get_par_url (){
	var query = location.search.slice(1);
	var partes = query.split('&');
	var data = {};
	partes.forEach(function (parte) {
		var chaveValor = parte.split('=');
		var chave = chaveValor[0];
		var valor = chaveValor[1];
		data[chave] = valor;
	});
	console.log(data); 
  return data;
 
}
	
	

  function criaAtualizaSessao(id, informacao) {

      var Storage = window.localStorage;

      if (typeof(Storage) !== "undefined") {

          if (informacao) {

              Storage.setItem(id, informacao);

              console.log("Em criaAtualizaSessao: Sessao " + id + " valor: " + informacao + " criada!")

          } else {

              console.log("Em criaAtualizaSessao: Sessao " + id + " valor: " + informacao + " Nao criada!")

          }



      } else {

          alert("Desculpe! No Web Storage support..em criaAtualizaSessao");

      }

  }



  function verificaExistenciaSessao(id) {

      var Storage = window.localStorage;

      if ((Storage.getItem(id)) && (Storage.getItem(id) != undefined)) {

          console.log("Em verificaExistenciaSessao: Sessao " + id + " existe! Vale:" + Storage.getItem(id));

          return true;

      } else {

          console.log("Em verificaExistenciaSessao:Sessao " + id + " NAO existe ou indefinido!");

          return false;

      }



  }



  function recuperaSessao(id) {

      var Storage = window.localStorage;

      if (typeof(Storage) !== "undefined") {

          if ((Storage.getItem(id)) && (Storage.getItem(id) != undefined)) {

              //  console.log("Em recuperaSessao: Sessao " + id + " recuperada: " + Storage.getItem(id))

              return Storage.getItem(id);

          }

      } else {

          alert("Desculpe! No Web Storage support.. em recuperaSessao");

      }

  }



  function removeSessao(id) {

      var Storage = window.localStorage;

      if (typeof(Storage) !== "undefined") {

          if (Storage.getItem(id)) {

              console.log("Em removeSessao: Sessao de ID " + id + " será apagada: " + Storage.getItem(id))

              Storage.removeItem(id);

          }

      } else {

          alert("Desculpe! No Web Storage support.. emremoveSessao");

      }

  }


