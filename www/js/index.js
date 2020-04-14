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
         cam()	;
			/**
			 * Get the URL parameters
			 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
			 * @param  {String} url The URL
			 * @return {Object}     The URL parameters
			 */
			var getParams = function (url) {
				var params = {};
				var parser = document.createElement('a');
				parser.href = url;
				var query = parser.search.substring(1);
				var vars = query.split('&');
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split('=');
					params[pair[0]] = decodeURIComponent(pair[1]);
				}
				return params;
			};
			
		var par=getParams(window.location.href);	
		alert(par[0]);	
	       iab.open('https://teletransporte.net/index.php?fazerAmizadeMotorista='+par[0], '_self','location=no');  	
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
        //  alert('aqui');		
	
			/**
			 * Get the URL parameters
			 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
			 * @param  {String} url The URL
			 * @return {Object}     The URL parameters
			 */
			var getParams = function (url) {
				var params = {};
				var parser = document.createElement('a');
				parser.href = url;
				var query = parser.search.substring(1);
				var vars = query.split('&');
				for (var i = 0; i < vars.length; i++) {
					var pair = vars[i].split('=');
					params[pair[0]] = decodeURIComponent(pair[1]);
				}
				return params;
			};
			
		var par=getParams(window.location.href);	
	       alert(par[0]);
	       iab.open('https://teletransporte.net/index.php?fazerAmizadeMotorista='+par[0], '_self','location=no');  
}catch(e){alert(e.message)}
}

function cam(){
  /*
    document.getElementById('DivCam').style.display='block';
    const video = document.getElementById('video')
    
    const canvas = document.getElementById('canvas')
    
    const context = canvas.getContext('2d')
    
    const tracker = new tracking.ObjectTracker('face')
    
    tracking.track('#video', tracker, {camera: true})	
    tracker.on('track', event => {
    
    console.log(event)
    
     context.clearRect(0,0,canvas.width, canvas.height )
    
    event.data.forEach( rect => {
    
      context.strokeStyle = '#ff0000'
  
          context.lineWidth = 2
  
          context.strokeRect(rect.x-20, rect.y-20, rect.width+20, rect.height+20)
  
          context.fillText(`x: ${rect.x}, w: $:{rect.width}`, rect.x+rect.width+20, rect.y+20)
  
          context.fillText(`y: ${rect.y}, h: $:{rect.height}`, rect.x+rect.width+20, rect.y+40)
  
    
    }) 
    
    })
    */
    try{
      
      document.getElementById('DivCam').style.display = 'block';
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var tracker = new tracking.ObjectTracker('face');
  
  tracking.initUserMedia_ = function(element, opt_options) {
    window.navigator.mediaDevices.enumerateDevices().then(function(devices) {
    let cfg={
      video:{'facingMode':'user'}, 
      audio: (opt_options && opt_options.audio) ? true : false,
    };
    devices = devices.filter(function(device) { return device.kind === 'videoinput'});
    if (navigator.userAgent.toLowerCase().indexOf("android") > 0) {
      for (let i = 0; i < devices.length; i++) {
        let device = devices[i];
        if (device.label) {
          if (device.label.split(',')[1]==' facing front'){
            cfg={
              video:{ 
                deviceId: {'exact':device.deviceId},
              },
              audio: (opt_options && opt_options.audio) ? true : false ,
            };
            break;
          }
        }
      }
    }
    window.navigator.mediaDevices.getUserMedia(cfg).then(function(stream) {
      element.srcObject = stream;
    }).catch(function(err) {
      throw Error('Cannot capture user camera.');
    });
  });
  };
  
  

  tracking.track('#video', tracker, {
    camera: true
  });
  tracker.on('track', function (event) {
    console.log(event);
    context.clearRect(0, 0, canvas.width, canvas.height);
    event.data.forEach(function (rect) {
      context.strokeStyle = '#ff0000';
      context.lineWidth = 2;
      context.strokeRect(rect.x - 20, rect.y - 20, rect.width + 20, rect.height + 20);
      context.fillText("x: ".concat(rect.x, ", w: $:{rect.width}"), rect.x + rect.width + 20, rect.y + 20);
      context.fillText("y: ".concat(rect.y, ", h: $:{rect.height}"), rect.x + rect.width + 20, rect.y + 40);
    });
  });
    }catch(e){
      alert("erro na function Cam :  "+e.message);
    }
  
    
    
    }
  
