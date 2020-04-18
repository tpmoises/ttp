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
		document.addEventListener("resume", onResume, false);	
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
  
   BackgroundGeolocation.start();
			
        //  alert('aqui');	
         
//         navigator.camera;
  
			/**
			 * Get the URL parameters
			 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
			 * @param  {String} url The URL
			 * @return {Object}     The URL parameters
			 */
	       iab.open('https://teletransporte.net/index.php, '_blank','location=no');  	
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
        //window.location.replace("https://teletransporte.net");
       // console.log('Received Event: ' + id);
    }
	 
};
function onResume() {
try{	
   var iab = cordova.InAppBrowser;	
        
	       iab.open('https://teletransporte.net/index.php, '_blank','location=no');  
}catch(e){alert(e.message)}
}


  
