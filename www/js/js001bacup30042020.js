//js001.jvarIHrChamDirs do App PASSAGEIRO
/* comuns */

//https://www.norio.be/android-feature-graphic-generator/   gerador recurso grafico
var app = new App(); // App.js
var passageiro = new Passageiro();
var corrida = new Corrida();
var motoristas = [];
var STATUS = new Status(); //Defini os Status que o motorista pode está no arquivo status.js
var bufferCoords = new CircularBuffer(4);
var confirmandoLocalPartida;
var qMsgMotoristaLidas=0;
 var qMsgMotoristaNaoLidas=0;
 var qMsgMotoristaTotal=0;

var me = {}; 
var you = {};


//var motorista = new Motoristas();
//&emsp;    quatro espacos em branco
var myIcon = L.icon({
    iconUrl: 'imgs/markerMot.png',
    iconSize: [30, 48],
    iconAnchor: [15, 48],
    popupAnchor: [8, -40],
});

function cam() {
    try {
        document.getElementById('DivCam').style.display = 'block';
        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');

        var context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        var player = document.getElementById('video');
        var snapshotCanvas = document.getElementById('canvas');
        var captureButton = document.getElementById('capture');
        var videoTracks;

        var handleSuccess = function(stream) {
            // Attach the video stream to the video element and autoplay.
            player.srcObject = stream;
            videoTracks = stream.getVideoTracks();
        };

        captureButton.addEventListener('click', function() {
            var context = snapshotCanvas.getContext('2d');
            // Draw the video frame to the canvas.
            context.drawImage(player, 0, 0, player.width,
                player.height);
            // Stop all video streams.
            videoTracks.forEach(function(track) {
                track.stop()
            });
            setTimeout()
        });

        navigator.mediaDevices.getUserMedia({
                video: true
            })
            .then(handleSuccess);
        //try{
        //var tracker = new tracking.ObjectTracker('face');
        //tracking.track('#video', tracker, {
        // camera: true
        //	});
        //}catch(ee){
        //	alert("erro em tracker :  "+ee.message);
        //}

        //tracker.on('track', function (event) {
        //alert(event);
        //context.clearRect(0, 0, canvas.width, canvas.height);
        //event.data.forEach(function (rect) {
        //context.strokeStyle = '#ff1133';
        //context.lineWidth = 2;
        // context.strokeRect(rect.x , rect.y , rect.width, rect.height);
        //context.fillText("x: ".concat(rect.x, ", w: $:{rect.width}"), rect.x + rect.width + 20, rect.y + 20);
        //context.fillText("y: ".concat(rect.y, ", h: $:{rect.height}"), rect.x + rect.width + 20, rect.y + 40);
        //}); 
        //});
    } catch (e) {
        alert("erro na function Cam :  " + e.message);
    }



}

//rotina para varias plataformas
window.animationFrame = function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
}();

function funcaoOnOffline() {
    var titulo, conteudo;
    titulo = "Erro de conexao!";
    conteudo = "Verifique a conexao com internet"
    //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)
    mostraModal(titulo, conteudo, "Fechar", "Tentar novamente", reloadPorErro);

}

function reloadPorErro() {
    location.reload();
}

function atualizaGraphMotoristas() {
    var intervalo = setInterval(function() {
        if (corrida.getCodigo()) {
            clearInterval(intervalo);
        }
        if (passageiro.getStatus() == STATUS.getCodOnLine()) {

            //clearInterval(intervalo); 

            var latLng = passageiro.getLatLngI();
            var varRaioIHrChamDir = document.getElementById("IHraioChamDir").value;
            var varIHidFiltroSoAmigos = document.getElementById("IHidFiltroSoAmigos").value;
            if (!corrida.getCodigo()) {
                if (latLng) {

                    var url = "../php/buscarMotoristas.php";
                    url += "?codPassageiro=" + passageiro.getCodigo() + "&condAmizade=" + varIHidFiltroSoAmigos + "&raioChamDir=" + varRaioIHrChamDir + "&lat=" + latLng.lat + "&lng=" + latLng.lng + "&status=" + STATUS.getCodOnLine();
                    $.get(url, function(r) {
                        var ObjMotoristas = JSON.parse(r);
                        if (motoristas.length > 0) {
                            for (var x = 0; x < motoristas.length; x++) {
                                motoristas[x].marca.remove();

                            }
                        }
                        if (motoristas.length > 0) {
                            for (var y = 0; y < motoristas.length; y++) {
                                motoristas.pop();
                            }
                        }
                        var markerArray = []; //lista 10 motoristas mais proximos
                        markerArray.push(app.markerI); //classificado por conceito e distancia

                        for (var i = 0; i < ObjMotoristas.motoristas.length; i++) {

                            var marca = L.marker([ObjMotoristas.motoristas[i].lat_posicao, ObjMotoristas.motoristas[i].lng_posicao], {
                                icon: app.icon
                            }).addTo(app.map).bindPopup(ObjMotoristas.motoristas[i].nome).openPopup();
                            marca.on('dblclick', onDbClickMarcaMotorista);
                            marca.on('mouseover', function(e) {
                                this.openPopup();
                            });
                            marca.on('mouseout', function(e) {
                                this.closePopup();
                            });

                            markerArray.push(marca);
                            motoristas.push(); //acrsecenta elemento em matriz motoristas definida logo inicio do script
                            motoristas[i] = new Motoristas();
                            motoristas[i].setCodigo(ObjMotoristas.motoristas[i].codigo);
                            motoristas[i].setNome(ObjMotoristas.motoristas[i].nome);
                            motoristas[i].setSobrenome(ObjMotoristas.motoristas[i].sobrenome);
                            motoristas[i].setApelido(ObjMotoristas.motoristas[i].apelido);
                            motoristas[i].setMarca(marca);
                            motoristas[i].setPosicao(ObjMotoristas.motoristas[i].posicao);
                            motoristas[i].setLat(ObjMotoristas.motoristas[i].lat_posicao);
                            motoristas[i].setLng(ObjMotoristas.motoristas[i].lng_posicao);
                            motoristas[i].setFicticio(ObjMotoristas.motoristas[i].ficticio);
                            motoristas[i].qUnidade = ObjMotoristas.motoristas[i].qUnidade;
                            motoristas[i].valorUnidade = ObjMotoristas.motoristas[i].valorUnidade;
                            motoristas[i].valorMinuto = ObjMotoristas.motoristas[i].valorMinuto;
                            motoristas[i].margemLucro = ObjMotoristas.motoristas[i].margemLucro;
                            motoristas[i].cat_cnh = ObjMotoristas.motoristas[i].cat_cnh;
                            motoristas[i].url_avatar = ObjMotoristas.motoristas[i].url_avatar;
                            motoristas[i].id_facebook = ObjMotoristas.motoristas[i].id_facebook;
                        }
                        //Nesta funcao abaixo latLng.lat,latLng.lng indica posicao de embarque(PemB)


                    });
                }
            }
        }

        if (passageiro.getStatus() != STATUS.getCodOnLine()) {
            clearInterval(intervalo);
        }

    }, (1000 * 15)); //15 segundos
}

function fRecSenha() {
    faleConosco();
}



window.onload = function() { // Esta parte carrega depois que toda página html carrega
    //fazer objetos aplicativo, passageiro, motorista e viagem aqui
    try {
        document.addEventListener("offline", funcaoOnOffline, false);
        document.addEventListener("securitypolicyviolation", (e) => {
          alert('Errp CSP em'+e.blockedURI);
        });
        
        //tipos:primary,secondary,success,danger,warning,info,light e dark
        //Ex de uso:
        var mensagem = "<strong>Escolha um motorista!</strong><br>Basta dá um duplo-clique no motorista.<br>Ou ainda, LOGADO, use o botão RAPIDO.";
        mostraDialogo(mensagem, "warning", 11500);
        document.getElementById("escolhaMotorista").onclick = fEscolhaMotorista;
        document.getElementById("distParaChamadasDiretas").onclick = confDistChamDireta;
        document.getElementById("distParaChamadasDiretas2").onclick = confDistChamDireta;
        document.getElementById("recSenha").onclick = fRecSenha;
        if (document.getElementById("login")) { //pega com a variavel de sessaoPHP	
       
            passageiro.setCodigo(document.getElementById("IHcodigo").value); //em index.php
            //	  pegaStatusPassageiroNoBD(passageiro.getCodigo());
            //seta na memroria status
            var url = '../php/pegaStatusPassBD.php?cod_passageiro=' + passageiro.getCodigo();
            $.get(url, function(r) {
                document.getElementById("IHStatusPassageiro").value = r.trim();
                passageiro.setStatus(r.trim());
                passageiro.setLogin(document.getElementById("login").value);
                if (passageiro.getStatus() == STATUS.getCodOffLine()) {
                    passageiro.setStatus(STATUS.getCodOnLine());
                    setaStatusPassageiroNoBD(passageiro.getCodigo(), passageiro.getStatus())
                };
                if (passageiro.getStatus() != STATUS.getCodOffLine() &&
                    (passageiro.getStatus() != STATUS.getCodOnLine())) {
                    var url = '../php/getCodCorrCorrentePassageiro.php?cod_passageiro=' + passageiro.getCodigo();
                    $.get(url, function(r1) { //Se o status é de que o passgaeiro tá em corrida entao pega codigo da corrida
                        corrida.setCodigo(r1.trim());
                        //se o status do passgeiro for de corrida 
                        //o codigo do mesmo está numa variável de sessaoPHP	
                        url = '../php/pegaDadosSessaoBD.php'; //pega todos os dados da corrida
                        url += "?cod_corrida=" + corrida.getCodigo();
                        $.get(url, function(r) {
                            r = JSON.parse(r);
                            if (r) {
                                corrida.setCodigo(r.corrida[0].codigo);
                                corrida.setMotorista(r.corrida[0].cod_motorista);
                                corrida.setLatLngFinal(r.corrida[0].lat_lng_final);
                                passageiro.setLatLngF(r.corrida[0].lat_lng_final);
                                corrida.setLatLngInicial(r.corrida[0].lat_lng_inicial);
                                corrida.setLatLngBusca(r.corrida[0].lat_lng_busca);
                                passageiro.setCodigo(r.corrida[0].cod_passageiro);
                                corrida.setPassageiro(r.corrida[0].cod_passageiro);

                                url = '../php/getUmObjMotorista.php';
                                url += "?codigo=" + corrida.getMotorista();
                                $.get(url, function(propObjMotViagem) {



                                    motoristas[0] = new Motoristas();
                                    propObjMotViagem = JSON.parse(propObjMotViagem);
                                    propObjMotViagem = propObjMotViagem.motorista[0];
                                    motoristas[0].setCodigo(propObjMotViagem.codigo);
                                    motoristas[0].setStatus(propObjMotViagem.status);
                                    motoristas[0].setNome(propObjMotViagem.nome);
                                    motoristas[0].setSobrenome(propObjMotViagem.sobrenome);
                                    motoristas[0].setApelido(propObjMotViagem.apelido);
                                    //	motoristas[0].setMarca(marca);
                                    motoristas[0].setPosicao(propObjMotViagem.posicao);
                                    motoristas[0].setLat(propObjMotViagem.lat_posicao);
                                    motoristas[0].setLng(propObjMotViagem.lng_posicao);
                                    motoristas[0].setFicticio(propObjMotViagem.ficticio);
                                    motoristas[0].setqUnidade = propObjMotViagem.qUnidade;;
                                    motoristas[0].valorUnidade = propObjMotViagem.valorUnidade;;
                                    motoristas[0].valorMinuto = propObjMotViagem.valorMinuto;
                                    motoristas[0].margemLucro = propObjMotViagem.margemLucro;
                                    motoristas[0].setCat_cnh(propObjMotViagem.cat_cnh);
                                    motoristas[0].setUrl_avatar(propObjMotViagem.url_avatar);

                                    var marca = L.marker([motoristas[0].lat, motoristas[0].lng], {
                                        icon: app.icon
                                    }).addTo(app.map).bindPopup(motoristas[0].nome).openPopup();



                                    marca.on('dblclick', onDbClickMarcaMotorista);
                                    marca.on('mouseover', function(e) {
                                        this.openPopup();
                                    });
                                    marca.on('mouseout', function(e) {
                                        this.closePopup();
                                    });

                                    motoristas[0].setMarca(marca);

                                    if (propObjMotViagem) {
                                        app.setMotorista(motoristas[0]);
                                        if (corrida.getCodigo() != null) {
                                            corridaGetStatus(3); //so entra aqui se tiver sessao  
                                        }
                                    }
                                });
                            }


                        });
                        //if (cordova){
                        //	 alert("Cordova pronto")
                        //}

                    });

                }

            });




            document.getElementById("formasDePagamento").onclick = confFormasDePagamento;
            document.getElementById("faleConosco").onclick = faleConosco;
            document.getElementById("excluirContaEDados").onclick = excluirContaEDados;


        }

        document.getElementById("politica").onclick = politica;
        document.getElementById("termosLegais").onclick = termosLegais;

        window.onresize = modTamMapa;


        document.getElementById("miniBtAcheme").onclick = acheme;
        document.getElementById("fazerViagem").onclick = showFazerViagem;
        if (document.getElementById("fazerViagem2")) {
            document.getElementById("fazerViagem2").onclick = showFazerViagem;
        }
        modTamMapa();

        /* Voce e a gente*/


        document.getElementById("validacoes").onclick = showValidacoes;

        if (document.getElementById("cadastrar")) {
            document.getElementById("cadastrar").onclick = cadastrar;
        }
        if (document.getElementById("entrar")) {
            document.getElementById("entrar").onclick = verTelaLogin;
        }




        var mapa = L.map('map', {
                closePopupOnClick: false,
                zoomControl: false
            }).fitWorld(),

            geocoder = L.Control.Geocoder.nominatim(), //mapbox



            controlZoom = L.control.zoom({
                zoomInTitle: 'Aumentar',
                zoomOutTitle: 'Diminuir'
            }).addTo(mapa);

        mapa.on("locationfound", achouLocalAutomatico);
        mapa.on("locationerror", onLocationError);


        document.getElementById("btm").onclick = myFunction3;
        window.onclick = escondeMenu;

        mapa.on('move', function() {
            if (confirmandoLocalPartida) {
                if (app.markerI) {
                    app.markerI.setLatLng(mapa.getCenter());
                    //console.log(map.getCenter());	 
                }
            }

        });

        mapa.on('dragend', function(e) {
            if (confirmandoLocalPartida) {
                if (app.markerI) {
                    var cnt;
                    var position = app.markerI.getLatLng();
                    lat = Number(position['lat']).toFixed(5);
                    lng = Number(position['lng']).toFixed(5);
                    //console.log(position);
                    cnt = [lat, lng];
                    cnt = L.latLng(cnt);
                    app.markerI.setLatLng(cnt);
                    var evento = {
                        latlng: cnt
                    }
                    achouLocalArrastando(evento);
                }

            }

        });

        //  document.getElementById('dxy').addEventListener('mousedown', mouseDown, false);
        // window.addEventListener('mouseup', mouseUp, false);

        //mapa.on("mouseup",achouLocalArrastando);
        mapa.locate({
            setView: false,
            enableHighAccuracy: true,
            maximumAge: 18000000
        });
        mapa.setZoom(15);
        

        var imgMapa = L.tileLayer('https://api.mapbox.com/styles/v1/moisestp/cjjsr7g3n21lo2sqqah05gjzm/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 19
        }).addTo(mapa);

        imgMapa.on("loading", carregandoMapa);
        imgMapa.on("tileload", mapasCarregados);



        


        /**************************************************************************************/

        app.map = mapa;

        app.geocoder = geocoder;

        //app.controlProcurar=controlProcurar; 

        app.controlZoom = controlZoom;

        app.imgMapa = imgMapa;

        app.icon = myIcon;
       // var url_atual =document.URL;
         //alert(url_atual);
        /**************************************************************************************/
        if (!corrida.getCodigo()) {
            //atualizaGraphMotoristas();	  
        }
        
        if (document.getElementById("login"))  {
            me.avatar =  document.getElementById("ImgFotoPas").src;            
        }
          
        


    } catch (e) {

        alert("erro na function OnLoad :  " + e.message);

    }
} // fim do onload

function escondeMenu(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdownRapido-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function myFunction3() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
    var div = document.getElementById('dxy');
    div.style.position = 'relative';
    div.style.top = e.clientY + 'px';
    div.style.left = e.clientX + 'px';
};


function pegaStatusPassageiroNoBD(codigo) {
    var url = '../php/pegaStatusPassBD.php?cod_passageiro=' + codigo;
    $.get(url, function(r) {
        document.getElementById("IHStatusPassageiro").value = r.trim();
        passageiro.setStatus(r.trim());
    });
}

function setaStatusPassageiroNoBD(codigo, Status) {
    var url = '../php/setaStatusPassBD.php?cod_passageiro=' + codigo + "&status=" + Status;
    $.get(url, function(r) {

    });

}

function formatAMPM(date) {

    var data = new Date();
    var dias = new Array(
        'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'
    );
    //data.getDay()= 0,1,2..6
    //dias[data.getDay()] <- reorna o dia

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = dias[data.getDay()] + ',' + data.getDay() + ' de  ' + data.getMonth() + 1 + ' de  ' + data.getFullYear() + ' ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

function fChatPassageiro() {
    document.getElementById("chat").style.display = 'block';
    qMsgMotoristaNaoLidas=0;
     qMsgMotoristaLidas=$( ".msgMotorista" ).length;      
    loadChatEmUll();//carrega chat salvo servidor
    //insertChat("me", "Converse com seu motorista");
    $(".mytext").on("keydown", function(e) {
        if (e.which == 13) {
            var texto = $(this).val();
            if (texto !== "") {
                insertChat("me", texto);
                $(this).val('');
            }
        }
    });
    document.getElementById("spSeta").onclick = function() {
        $(".mytext").trigger({
            type: 'keydown',
            which: 13,
            keyCode: 13
        });
    };

    //-- Clear Cha3t
    //resetChat();
    var jm = document.getElementById("janelaModalChat");
    $(jm).modal('show');

}




function loadChatEmUll(){
    url = "../php/loadChat.php";
    var oldscrollHeight = $("#chat").attr("scrollHeight") - 20; //Scroll height before the request
        $.get(url, function(r){            
           resetChat();
            $("#ull").append(r);	
            if ((qMsgMotoristaTotal-qMsgMotoristaLidas)>0){
                qMsgMotoristaNaoLidas=qMsgMotoristaTotal-qMsgMotoristaLidas;           
           }
           document.getElementById("contadorMsgs").innerHTML=qMsgMotoristaNaoLidas;
          
            $("#chat").scrollTop($("#chat").prop('scrollHeight'));
           //Auto-scroll			
        var newscrollHeight = $("#chat").attr("scrollHeight") - 20; //Scroll height after the request
        if(newscrollHeight > oldscrollHeight){
            $("#chat").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
        }	
    }); 
}

//-- No use time. It is a javaScript effect.
function insertChat(who, texto, time) {
    //Deve está no registro da corrida
    // Esse nome de arquivo DEVE ser inserido no BD no momento da insercao da corrida
    //o nome desse arquivo é aleatorio no formato HTML
    //cada corrida tem um arquivo associado
    //{mot:nome pas:nome, hora:"00:00:00"}

    //	var url = "../php/updatChat.php?texto=" + texto + "?codigo=" + corrida.getCodigo();

    if (time === undefined) {
        time = 0;
    }
    var control = "";
    var date = new Date();

    //abre/cria arquivo relacionado ao chat do servidor
    url = '../php/mkLogChat.php';
    if (who == "me") {
        control = '<li class="msgPass" style="width:100%">' +
            '<div class="msj macro">' +
            '<div class="avatar"><img  class="img-circle" style="width:100%;" src="' + me.avatar + '" /></div>' +
            '<div class="text text-l">' +
            '<p>' + texto + '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '</div>' +
            '</li>';
        

    } else {
        control = '<li style="width:100%;">' +
            '<div class="msj-rta macro">' +
            '<div class="text text-r">' +
            '<p>' + texto + '</p>' +
            '<p><small>' + date + '</small></p>' +
            '</div>' +
            '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="' + you.avatar + '" /></div>' +
            '</li>';

    }
    $.post(url, {
            "msg": control,            
            "codigo": corrida.getCodigo()
        },
        function(r) {
                      loadChatEmUll();
        });
            
          
}//Par da abertura funcao



function resetChat() {
    $("#ull").empty();
}

/* adaptar no chat
The jQuery.ajax request
The ajax request is the core of everything we are doing. This request not only allows us to send and receive data throught the form without refreshing the page, but it also allows us to handle the data requested.

//Load the file containing the chat log
	function loadLog(){		

		$.ajax({
			url: "log.html",
			cache: false,
			success: function(html){		
				$("#chatbox").html(html); //Insert chat log into the #chatbox div				
		  	},
		});
	}
	
Auto-scrolling
As you may have seen in other chat applications, the content automatically scrolls down if the chat log container (#chatbox) overflows. We are going to implement a simple and similar feature, that will compare the container's scroll height before and after we do the ajax request. If the scroll height is greater after the request, we will use jQuery's animate effect to scroll the #chatbox div.

	//Load the file containing the chat log
	function loadLog(){		->Minha 
		var oldscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height before the request
		$.ajax({
			url: "log.html",
			cache: false,
			success: function(html){		
				$("#chatbox").html(html); //Insert chat log into the #chatbox div	
				
				//Auto-scroll			
				var newscrollHeight = $("#chatbox").attr("scrollHeight") - 20; //Scroll height after the request
				if(newscrollHeight > oldscrollHeight){
					$("#chatbox").animate({ scrollTop: newscrollHeight }, 'normal'); //Autoscroll to bottom of div
				}				
		  	},
		});
	}
	

	
Continuously Updating the Chat Log
Now one question may arise, how will we constantly update the new data being sent back and forth between users? Or to rephrase the question, how will we continuously keep sending requests to update the data?

setInterval (loadLog, 2500);	//Reload file every 2500 ms or x ms if you wish to change the second parameter
The answer to our question lies in the setInterval function. This function will run our loadLog() function every 2.5 seconds, and the loadLog function will request the updated file and autoscroll the div.

*/
function confFormasDePagamento() {
    s1 = "<p class='centraliza'><input  checked id='formaPagamento' value='dinheiro' type='checkbox' >  <label for='sma'> Dinheiro</label></p>";
    conteudo = s1;
    mostraModal("Configurações - Formas de pagamento", conteudo, "Fechar", false, false, "Receberemos também cartão em breve", false, false, false);
}

function faleConosco() {
    document.getElementById('id01').style.display = 'none';

    s1 = "<div class='centraliza'>";
    s1 += "<h4>Diga-nos o motivo de seu contato e seus dados do cadastro:</h4></br>";
    s1 += "<lbael for='emailRecSenha'>Email cadastrado:</label>";
    s1 += "<input type'text' id='emailRecSenha' placeholder=' email cadastrado aqui' autofocus><em id='errEmail' style='display: none;color:red;'> Erro!</em></span></br></br>"

    s1 += "<textarea wrap='hard' id='txtAreaFaleConosco' rows='14' style='border:solid 1px #428bca;' cols='20' placeholder='Digite aqui...'></textarea> </div>";
    conteudo = s1;
    //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.	
    mostraModal("Ajuda  - Fale conosco", conteudo, "Fechar", "Enviar", enviarFaleConosco, "Fale direto com a gente.", false, false, false);
}

function termosLegais() {
    var s1 = "<div class='centraliza'><p class='centraliza'>";
    s1 += "<iframe src='termosdoservico.html'></iframe>";
    s1 += "</p></div>";
    conteudo = s1;
    conteudo = s1;
    //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.	
    mostraModal("Ajuda  - Termos legais", conteudo, "Fechar", false, false, "Fale direto com a gente.", false, false, false);
}

function politica() {
    var s1 = "<div class='centraliza'><p class='centraliza'>";
    s1 += "<iframe src='pp.html'></iframe>";
    s1 += "</p></div>";
    conteudo = s1;
    //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.	
    mostraModal("Ajuda  - Politica de privacidade", conteudo, "Fechar", false, false, "Fale direto com a gente.", false, false, false);
}

function excluirContaEDados() {
    var s1 = "";
    s1 += "<div class='alert alert-danger alert-dismissible fade in'>"
    s1 += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
    s1 += "<strong>Atenção!</strong> Está ação não pode ser revertida!";
    s1 += " </div>"
    var conteudo = s1;
    mostraModal("Ajuda  - Excluir conta ", conteudo, "Fechar", "Confimar exclusão", excluirDefinitivamente, "Seu dados serão excluindos.", false, false, false);
    //document.getElementById("msgErro").innerHTML=s1;// 	
}

function excluirDefinitivamente() {
    var msg = 'Excluir conta e dados' + 'CodigoUsuarioPassageiro=' + passageiro.getCodigo();
    url = '../php/enviarEmailFaleComigo.php?codigo=' + passageiro.getCodigo() + '&msg=' + msg;
    $.get(url, function(resultado) {

        var jm = document.getElementById("janelaModal");
        if (jm) {
            $(jm).modal('hide');
        }
        alert('Em até 24 horas seus dados serão apagados automaticamente.Obg.');
    });
}

function verEmail() {
    if ($("input#emailRecSenha").val() == '') {
        $("em#errEmail").css('display', 'inline-block'); //style.display='inline;';
        $("input#emailRecSenha").focus();
        return false;
    } else {
        $("em#errEmail").css('display', 'none');
    }

    if ($("input#emailRecSenha").val() != '') {
        var str = $("input#emailRecSenha").val(); //RegExp validacao EMail	
        var res = str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i);
        if (!res) {
            $("em#errEmail").css('display', 'inline-block'); //style.display='inline;';
            $("input#emailRecSenha").focus();
            return false;
        } else {
            $("em#errEmail").css('display', 'none');
        }
    }
    return true;
}

function enviarFaleConosco() {

    var msg = encodeURI(document.getElementById("txtAreaFaleConosco").value);
    if (verEmail()) {
        if (passageiro.getCodigo()) {
            var url = '../php/enviarEmailFaleComigo.php?codigo=' + passageiro.getCodigo() + '&msg=' + msg;
        } else {
            var url = '../php/enviarEmailFaleComigo.php?email=' + document.getElementById("emailRecSenha").value + '&msg=' + msg;
        }

        $.get(url, function(resultado) {

            var jm = document.getElementById("janelaModal");
            if (jm) {
                $(jm).modal('hide');
            }
            var mensagem = "<strong>Obrigado por entrar em contato!</strong><br>" + resultado;
            mostraDialogo(mensagem, "warning", 11500);
            //alert(resultado);
        });
    }
}

function setaConfiguracoes() {
    //fazer crítica para aceitar apenas floats 	
    document.getElementById("IHraioChamDir").value = document.getElementById("newRChamDir").value;
    if ($('#idFiltroSoAmigos').is(":checked")) {
        document.getElementById("IHidFiltroSoAmigos").value = 'soAmigos';
    } else {
        document.getElementById("IHidFiltroSoAmigos").value = 'todos';
    }

    // acheme();
    setGraphMotoristas(true, false, STATUS.getCodOnLine());
    var jm = document.getElementById("janelaModal");
    if (jm) {
        $(jm).modal('hide');
    }
}


//criaAtualizaSessao(id,informacao) verificaExistenciaSessao(id)
//recuperaSessao(id) removeSessao(id)


function showValidacoes() {
    try {
        if (document.getElementById("login")) {
            var codigoP = document.getElementById("IHcodigo").value;
            var celular = document.getElementById("IHcelular").value;
            var email = "";
            $.get('../php/getEmailPassageiro.php?codigo=' + codigoP, function(resultado) {
                email = resultado;
                var conteudo = "<p class='centraliza'>Ainda não estamos validado...<br>Validação não necessária para CHAMADAS DIRETAS.<br><br>" + celular + "<br>" + email + "</p>";
                mostraModal("Suas validações", conteudo, "Fechar", "Validar", fazValidacoesEmailCel, "Só é possível viagem com email e celular validado.  Aguardem!", false, false, false);
            });

        }
    } catch (e) {
        alert("Erro na funcao- showValidacoes :" + e.message)
    }
}

function fazValidacoesEmailCel() {
    try {
        var codigoP = document.getElementById("IHcodigo").value;
        /*
        $.get('../php/enviarEmail.php?codigo='+codigoP, function(resultado){
        var avisoPassgeiro=[];
        avisoPassgeiro.push(resultado);	
          var celular=soNumero(document.getElementById("IHcelular").value);
           $.get( '../php/enviaCodToCel.php?numero_destino='+celular,
           function(resultado){
        	  alert(resultado);
        	  avisoPassgeiro.push(resultado);	//id do codigo enviado: avisoPassgeiro[1]
        	  var conteudo=avisoPassgeiro[0]+"<br>Digite o código que enviamos para seu celular:<br>";
        		  conteudo+="<input id='codEnviado' name='codEnviado' type='text' placeholder='Código recebido' AUTOCOMPLETE='off' class='form-control input-md' required>";
        	  mostraModal("Validando...",conteudo,"Fechar","Enviar",function(id){confirmaVerificacao(id);},"Só é possível viagem com email e celular validado. Aguardem!",false,false,false);	
        	  
        	})			
        });  */

    } catch (e) {
        alert("Erro na funcao fazValidacoesEmailCel: " + e.message);
    }
}

function confirmaVerificacao(id) {
    var cod_digitado = document.getElementById("codEnviado").value;

    $.get("../php/confVerificacao.php?id=" + id + "&cod_digitado=" + cod_digitado, function(resultado) {
        alert(resultado);
    })
}

function cadastrar() {
    document.getElementById('id01').style.display = 'none';
    //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)
    //<form class='form-horizontal'>
    var conteudo, s1;
    s1 = "<!-- Cadastro --><div id='divCadastro'><fieldset><!-- Form Name -->";
    s1 += "<legend>Cadastro de passageiros TT/TP</legend>";

    s1 += "<!-- Text input NOME --><p class='centraliza'>Cadastro para MOTORISTAS no <a href='https://play.google.com/store/apps/details?id=net.teletransporte.ttm&hl=pt_BR' target='_blank'>App TT Motoristas</a></p>";

    s1 += "<div class='form-group'>";
    s1 += "<label class='col-md-4 control-label' for='nomeCad'>Nome*</label><div class='col-md-6'>";
    s1 += "<input id='nomeCad' name='nomeCad' type='text' placeholder='Nome' AUTOCOMPLETE='off' class='form-control input-md' required>";
    s1 += "<span class='help-block'>Seu primeiro nome<em id='er1' style='display: none;color:red;'> Erro!</em></span></div></div>";

    s1 += "<!-- Text inputSOBRENOME --><div class='form-group'>";
    s1 += "<label class='col-md-4 control-label' for='sobreNomeCad'>Sobrenome*</label><div class='col-md-6'>";
    s1 += "<input id='sobreNomeCad' name='sobreNomeCad' type='text' placeholder='Sobrenome' class='form-control input-md' required>";
    s1 += "<span class='help-block'>Restante do seu nome<em id='er2' style='display: none;color:red;'> Erro!</em></span></div></div>";

    s1 += "<!-- Text input CPF --><div class='form-group'>";
    s1 += "<label class='col-md-4 control-label' for='cpfCad'>CPF*</label> <div class='col-md-6'>";
    s1 += "<input id='cpfCad' name='cpfCad' type='text' placeholder='000.000.000.-00' class='form-control input-md' AUTOCOMPLETE='off' required>";
    s1 += "<span class='help-block'>Seu CPF. Sua conta é pessoal e única.<em id='er3' style='display: none;color:red;'> Erro!</em></span> </div> </div> ";

    s1 += "<!-- Text input EMAIL -->";
    s1 += "<div class='form-group'> <label class='col-md-4 control-label' for='emailCad'>Email*</label> <div class='col-md-6'>";
    s1 += "<input id='emailCad' name='emailCad' type='text' placeholder='Seu email' AUTOCOMPLETE='off'  class='form-control input-md' required>";
    s1 += "<span class='help-block'>Email que você usa. Ficará vinculado a sua conta. Haverá confirmação por esse email<em id='er4' style='display: none;color:red;'> Erro!</em></span>  </div> </div> ";

    s1 += "<!-- Text input-->";
    s1 += "<div class='form-group'> <label class='col-md-4 control-label' for='reEmailCad'>Redigite Email</label>";
    s1 += "<div class='col-md-6'> <input id='reEmailCad' name='reEmailCad' type='text' placeholder='Redigite seu email*' AUTOCOMPLETE='off' class='form-control input-md'>";
    s1 += "<span class='help-block'>Redigitação para confirmação do email<em id='er5' style='display: none;color:red;'> Erro!</em></span> </div> </div>";

    s1 += "<!-- Text input Numero de celular-->";
    s1 += "<div class='form-group'>  <label class='col-md-4 control-label' for='celCad'>Numero de celular*</label>";
    s1 += "<div class='col-md-6'> <input id='celCad' name='celCad' type='text' placeholder='(00) 00000-0000' AUTOCOMPLETE='off' class='form-control input-md' required>";
    s1 += "<span class='help-block'>Número de celular que ficará vinculado a sua conta. Não esqueça dos parênteses.<em id='er6' style='display: none;color:red;'> Erro!</em></span> </div> </div> ";

    s1 += "<!-- Password input  Senha-->";
    s1 += "<div class='form-group'> <label class='col-md-4 control-label' for='senhaCad'>Senha*</label>  <div class='col-md-6'>";
    s1 += "<input id='senhaCad' name='senhaCad' type='password' placeholder='Senha' AUTOCOMPLETE='off' class='form-control input-md' required>";
    s1 += "<span class='help-block'>Senha com no mínimo 06 e no máximo 20 caracteres. Difereciamos letras maiúsculas de minúsculas.<em id='er7' style='display: none;color:red;'> Erro!</em></span></div></div>";

    s1 += "<!-- Password input ReSenha-->";
    s1 += "<div class='form-group'> <label class='col-md-4 control-label' for='reSenhaCad'>Redigite a senha*</label>";
    s1 += " <div class='col-md-6'> <input id='reSenhaCad' name='reSenhaCad' type='password' AUTOCOMPLETE='off' placeholder='Redigite mesma senha' class='form-control input-md' required>";
    s1 += "<span class='help-block'>Redigitação para confirmação da senha. Difereciamos letras maiúsculas de minúsculas para senhas.<em id='er8' style='display: none;color:red;'> Erro!</em></span> </div></div>";

    //s1+="<!-- Button (Double) -->";
    //s1+="<div class='form-group'> <label class='col-md-4 control-label' for='btCadastrar'></label> <div class='col-md-8'>";
    //s1+="<button id='btCadastrar' name='btCadastrar' class='btn btn-info'>Cadastrar</button> <button id='BtFechar' name='BtFechar' class='btn btn-secondary' data-dismiss='modal'>Fechar</button>";
    //s1+="</div> </div>"; 
    s1 += "</fieldset> </div> <!-- -->";
    //</form>
    conteudo = s1;
    //Não precisa do botão saidae ok
    //- mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)// 
    mostraModal("", conteudo, "Fechar", "Cadastrar", fazCadastroPassageiro, "Operacão com chamadas diretas: você conhece o motorista!", false, false, "../php/cadastraPassageiro.php");
}

function fazCadastroPassageiro() {
    //do jeito que implmentei mostraModal atrapalhou a validacao. Por isso está funcao->formCadValidado
    //Isto é apenas demostracao via forca bruta - deixarei para os especialista refazerem tudo. 26/06/2018

    if (formCadValidado()) {
        $("#fModal1").submit();
    }
}

function verTelaLogin() {
    document.getElementById('id01').style.display = 'block';
}

function carregandoMapa() {
    espereCarregandoRequisicao(true, "Carregando mapas...")
}

function mapasCarregados() {
    espereCarregandoRequisicao(false)
}

function achouLocalAutomatico(evento) {
    //latlng 	LatLng - bounds 	LatLngBounds - accuracy 	Number 	- altitude 	Number 	- 
    //altitudeAccuracy - Number - heading 	Number 	-speed 	Number -
    // -timestamp 	Number 	
    try {

        passageiro.setLatLngI(evento.latlng); // seta/atualiza ObjetoJS Passageiro com a possível cood de embarque

        var radius = evento.accuracy / 2;
        //if (radius>10){radius=10;}

        var marker = L.marker(evento.latlng, {
                draggable: true,
                autoclose: false
            }).addTo(this) // this reprsenta o map - não tem ";" aqui

            .bindPopup("Você! </br> Certo? ").openPopup();

        if (!corrida.getSetagemInicial()) {

            corrida.setSetagemInicial(evento.latlng);

            L.circle(evento.latlng, radius).addTo(this); // this reprsenta o map	 

        }

        marker.on("mouseup", achouLocalArrastando); //Vai servir tambem para os casos onde só se clica no mapa

        app.markerI = marker; //marker"i" e não marker"1" (um)  

        achouLocalArrastando(evento);


        //console.log(passageiro);

    } catch (e) {

        alert(e.message);

    }
}

function achouLocalArrastando(e) {
    try {

        passageiro.setLatLngI(e.latlng);
        corrida.setLatLngBusca(e.latlng);
        if (corrida.getSetagemInicial()) {
            //app.map.getZoom() influencia no resultado
            app.geocoder.reverse(e.latlng, app.map.options.crs.scale(app.map.getZoom()), function(results) {

                var r = results[0];
                var matEnd = r.name.split(",");

                r = "";

                var p = "";
                var x = 0;
                for (var i = 0; i < matEnd.length; i++) {
                    var p = matEnd[i].match(/Região|Mesorregião|Microrregião|Bra[sz]il/gi);

                    if (!(p)) {
                        r += matEnd[i] + ","; //faz ultimo elemento ter uma virgula ao final							
                    }
                }

                var matEnd = r.split(","); //Ultimo elemento é "" por causa da virgula ao final
                r = ""; //reseta r						
                for (var i = 0; i < matEnd.length - 1; i++) { //conta menos um prq ultimo elemento é ""
                    if (i == matEnd.length - 2) {
                        r += matEnd[i] + ".";
                    } else {
                        r += matEnd[i] + ",";
                    }

                }
                // marker = L.marker(r.center).bindPopup(r.name).addTo(map).openPopup(); 
                //console.log("->"+r);
                passageiro.setEndOrigem(r);

                app.markerI.bindPopup(r).openPopup(); //marker"i" e não marker"1" (um)   
                app.map.panTo(e.latlng);

            })

        } // fim if 
        var getDezMotProximos = true;
        //	console.log(corrida.getCodigo());
        if (!corrida.getCodigo()) {
            setGraphMotoristas(getDezMotProximos, false, STATUS.getCodOnLine()); //(getDezMotProximos,motoristaEscolhidoDiretamente);
        } else {

            //corrida.getMotorista=	motoristaEscolhido.getCodigo()
            setGraphMotoristas(false, app.getMotorista(), corrida.getStatus());
            //(getDezMotProximos,motoristaEscolhidoDiretamente);
        }


    } catch (e) {

        alert(e.message);

    }

}

function mostraModal(titulo, conteudo, txtBtExit, txtBtOk, CallBackOk, txtObs, txtBtCancel, CallBackCancel, urlFormPost, btAmizade, motorista,figBlocoPaula) { //se txtBtOk não for passado o botão ok não aparece.
    try {

        var jm = document.getElementById("janelaModal");
        document.getElementById("tituloJanelaModal").innerHTML = titulo;
        if (urlFormPost) {
            var s1 = "<form method='POST' id='fModal1' action='" + urlFormPost + "' class='form-horizontal'>";
        } else {
            var s1 = "<form id='fModal1' class='form-horizontal'>";
        }


        s1 += conteudo + "<br><div class='centraliza'>";
        if (txtBtOk) {
            s1 += "<button id='btOkModal1' type='button' class='btn btn-primary'>" + txtBtOk + "</button>";
        }
        if (txtBtCancel) {
            s1 += "<button id='btCancelarModal1' type='button' class='btn btn-danger'>" + txtBtCancel + "</button>";
            if (CallBackCancel) {
                document.getElementById("btCancelarModal1").onclick = CallBackCancel;
            }
        }

        if (txtBtExit) {
            s1 += "<button id='btFecharModal1' type='button' class='btn btn-secondary' data-dismiss='modal'>" + txtBtExit + "</button>";
        }

        s1 += "</div>";

        if (txtObs) {
            s1 += "<br><div class='centraliza'><p>" + txtObs + "</p></div>";
        }
        if (btAmizade) {
            
            s1 += "<div class='centraliza'>";
            var codPassageiro = passageiro.getCodigo();
            var codMotorista = motorista.getCodigo();
            
                //valor padrão...é verificado assicronamente pela funcao situacaoAmizade
                s1 += "<button  id='btAmizade' type='button' class='btn btn-warning'>Fazer amizade</button>";
                // alert(amigos(codPassageiro,codMotorista);)		 
                s1 += "</div>";
                situacaoAmizade(codPassageiro, codMotorista); //verifica a amizade e seta botao acima    
            
            
        }

        s1 += "</form>";
        document.getElementById("conteudoModal").innerHTML = s1;

        if (CallBackOk) {
            document.getElementById("btOkModal1").onclick = CallBackOk;
        }
        if (figBlocoPaula) {
             s1 += "<div class='centraliza'><p>Com você no Bloco <br><img width='50%' src="+figBlocoPaula+"></p></div>";
             document.getElementById("conteudoModal").innerHTML = s1;
        }
        
        
        $(jm).modal('show');
        espereCarregandoRequisicao(false);
    } catch (e) {
        alert("erro na function mostrarModal :  " + e.message);
    }
}

function ajaxGetTT(url, txtEspera, functionCallBack) {
    try {
        ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (e) {
        try {
            ajaxObj = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (ex) {
            try {
                ajaxObj = new XMLHttpRequest();
                /************************************************************/
                ajaxObj.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        espereCarregandoRequisicao(false);
                        var resultado = ajaxObj.response; //objeto generico                     
                        functionCallBack(resultado); //funcao é que faz tratamento de tipo

                    }
                    if (this.readyState == 1) {
                        espereCarregandoRequisicao(true, txtEspera, ajaxObj);
                    }
                };
                /************************************************************/
                ajaxObj.open("GET", url, true);
                ajaxObj.send();
                /************************************************************/
            }
            /************************************************************/
            catch (exc) {
                alert("Esse browser não tem recursos para uso do Ajax");
                ajaxObj = null;
            }
        }
    }
    /*********************************************************************/

}



function pegaSugestaoEndViagem(evento) {
    try {
        //preenche select SugDest
        document.getElementById("sugDest").options.length = 0; //zera list						 	
        var aux = this; //preserva a refencia ao objeto Select que fica em aux
        var txtPesq = this.value;
        txtPesq = tiraAcentos(txtPesq);
        if (document.getElementById("IHsugDest").value != '') {
            //quando texto tem preposicao e a rotina é cahamada de novo
            //txtPesq neste ponto vem sem preposicões
            txtPesq = document.getElementById("IHsugDest").value;
        }
        document.getElementById("IHsugDest").value = '';
        
        if (txtPesq.length >= 4) {
           var cidade=cityAutoPassageiro();
            switch(cidade) {
              case 'Extremoz':
                var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + txtPesq + ".json?access_token=pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong&bbox=-35.34002255705863,-5.750457120511484,-35.18690060881599,-5.604919171657798&limit=10";
                break;
              case 'Parnamirim':
                 var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + txtPesq + ".json?access_token=pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong&bbox=-35.31892560601261,-6.0999156014594575,-35.08406632212791,-5.8671979468406334&limit=10";
                break;
              //case 'São Gonçalo do Amarante':
                 //var url = "";
                //break;
              case 'RN':
                 var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + txtPesq + ".json?access_token=pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong&bbox=-38.68507400197828,-6.75692320356886,-34.73467335542284,-4.739213481585281&limit=10";
                break;
                
                

              default:
                // RN
                var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + txtPesq + ".json?access_token=pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong&bbox=-38.68507400197828,-6.75692320356886,-34.73467335542284,-4.739213481585281&limit=10";
            }
           
            //RN: -38.68507400197828,-6.75692320356886,-34.73467335542284,-4.739213481585281
            //extremoz: -35.34002255705863,-5.750457120511484,-35.18690060881599,-5.604919171657798
            // Parnamirim: -35.31892560601261,-6.0999156014594575,-35.08406632212791,-5.8671979468406334
            
            try {
                ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {
                try {
                    ajaxObj = new ActiveXObject("Msxml2.XMLHTTP");
                } catch (ex) {
                    try {
                        ajaxObj = new XMLHttpRequest();
                        /************************************************************/
                        ajaxObj.onreadystatechange = function() {
                            if (this.readyState == 4 && this.status == 200) {
                                try {
                                    espereCarregandoRequisicao(false);
                                    var results = ajaxObj.response;
                                    results = JSON.parse(results);
                                    results = results.features;
                                    var sug = "";
                                    var vLatLng = [];
                                    const QMAXRESULT = 10;
                                    var i = 1;



                                    while ((i <= QMAXRESULT) && (results[i - 1] != undefined)) {
                                        sug += results[i - 1].place_name + " ";
                                        vLatLng.push([results[i - 1].geometry.coordinates[1], results[i - 1].geometry.coordinates[0]]);
                                        i++;
                                    }

                                    if (sug.trim() == "") {
                                        document.getElementById("sugDest").options.length = 0; //zera list
                                        aux.focus(); //aux represta this (Select)
                                        if (temPreposicoes(txtPesq)) {
                                            txtPesq = retiraPreposicoes(txtPesq);
                                            //usado para modificar valor original da pesquisa
                                            document.getElementById("IHsugDest").value = txtPesq;
                                            // aux.value=txtPesq;//aux==this inicial

                                            var e = jQuery.Event("keyup");
                                            e.which = 13; // # Some key code value
                                            $("#fViagem").trigger(e);

                                        } else {
                                            document.getElementById("sugDest").innerHTML = "<option value='0;C' selected>Me ajude! Passe mais informações...ou tente outros termos</option>";
                                        }




                                    }
                                    //				document.getElementById("sugDest").style.visibility='visible';											

                                    //console.log("=>"+sug); Com todas as sugestoes de endereço
                                    var separador = sug.match(/bra[sz]il/i)
                                    var matSug = sug.split(separador); //Matriz em cada endeco termina com ,

                                    for (var ix = 0; ix < matSug.length - 1; ix++) {
                                        /*******************************************/
                                        var matEnde = matSug[ix].split(",");
                                        var r = "";
                                        var p = "";
                                        var x = 0;
                                        for (var i = 0; i < matEnde.length - 1; i++) {
                                            matEnde[i] = matEnde[i].replace(/Rio Grande do Norte/i, "RN");
                                            var p = matEnde[i].match(/Região|Mesorregião|Microrregião|Bra[sz]il/gi);


                                            if (!(p)) {
                                                r += matEnde[i] + ",";
                                            }
                                        }

                                        var matEnde = r.split(","); //Ultimo elemento é "" por causa da virgula ao final
                                        var rX = "";
                                        for (var i = 0; i < matEnde.length - 1; i++) { //conta menos um prq ultimo elemento é ""

                                            if (i == matEnde.length - 2) {
                                                rX += matEnde[i] + ".";
                                            } else {
                                                rX += matEnde[i] + ",";
                                            }

                                        }

                                        /*******************************************/
                                        r = rX; // Depois olha essas variaveis		
                                        matSug[ix] = r;
                                        //var iSelect = document.getElementById("sugDest").selectedIndex;
                                        var tSelect = document.getElementById("sugDest").options.length;
                                        var oSelect = document.getElementById("sugDest").options;
                                        var presente = false;
                                        for (var x = 0; x < tSelect; x++) {
                                            if (matSug[ix].trim() == oSelect[x].text.trim()) {
                                                presente = true;
                                                break;
                                            }
                                        }
                                        if (!presente) {
                                            // alert(aux.id);
                                            if (matSug[ix].trim != "") {

                                                if (aux.id == "fViagem") { //faz marcacao no Select de onde vem a pesquisa												   
                                                    if (ix == 0) {
                                                        // document.getElementById("sugDest").innerHTML  +="<option value='0;C' selected>Escolha endereço mais próximo AQUI...</option>";
                                                        document.getElementById("sugDest").innerHTML += "<option value='" + vLatLng[ix] + ";F'>" + matSug[ix] + "</option>";
                                                    } else {
                                                        document.getElementById("sugDest").innerHTML += "<option value='" + vLatLng[ix] + ";F'>" + matSug[ix] + "</option>";
                                                    }

                                                } else {
                                                    if (ix == 0) {
                                                        //  document.getElementById("sugDest").innerHTML  +="<option value='0;C' selected>Escolha endereço mais próximo AQUI...</option>";
                                                        document.getElementById("sugDest").innerHTML += "<option value='" + vLatLng[ix] + ";I'>" + matSug[ix] + "</option>";
                                                    } else {
                                                        document.getElementById("sugDest").innerHTML += "<option value='" + vLatLng[ix] + ";I'>" + matSug[ix] + "</option>";
                                                    }

                                                }



                                            }


                                        }
                                        //kk*


                                        //	console.log("Mat=> Enderco "+ix+" - "+matSug[ix]);
                                    }
                                    //ate aqui	
                                    constroiListaDivsSugDest();

                                } catch (erroem200) {
                                    console.log(erroem200.message);
                                }

                            }
                            if (this.readyState == 1) {
                                espereCarregandoRequisicao(true, 'Buscando...', ajaxObj);
                            }
                        };
                        /************************************************************/
                        ajaxObj.open("GET", url, true);
                        ajaxObj.send();
                        /************************************************************/
                    }
                    /************************************************************/
                    catch (exc) {
                        alert("Esse browser não tem recursos para uso do Ajax");
                        ajaxObj = null;
                    }
                }
            }
            /*********************************************************************/


        }


    } catch (e) {
        alert("erro na function pegaSugestaoEndViagem :  " + e.message);
    }

}

function constroiListaDivsSugDest() {
    if (document.getElementById("sugDest")) {
        var tamLista = document.getElementById("sugDest").options.length;
        if (tamLista > 0) {

            if (document.getElementById("divSugEnd")) {
                $("#divSugEnd").remove();
            }
            $('<div></div>').attr("id", "divSugEnd").appendTo("#fModal1");
            $("#divSugEnd").attr("class", 'form-group col-md-6');
            // var div = document.getElementById('divSugEnd');
            // div.style.position = 'relative';
            // div.style.top = $("fViagem").top;
            //div.style.left = e.clientX + 'px';;

            document.getElementById('divSugEnd').style = 'border:solid 1px #428bca;cursor:pointer;';
            if (!(detectar_mobile())) {
                document.getElementById('divSugEnd').style.top = -document.getElementById('fViagem').style.bottom;
            }
            for (var x = 0; x < document.getElementById("sugDest").options.length; x++) {
                $("<div>").attr("id", "itemDivSugEnd" + x).appendTo("div#divSugEnd");
                $("#itemDivSugEnd" + x).append(document.getElementById("sugDest")[x].text + "</br><h5>________________________</h5>");
                //$("#itemDivSugEnd"+x).append(document.getElementById("sugDest")[x].text);


                $("#itemDivSugEnd" + x).attr("data-index", x);
                //pegar com this.getAttribute(data-cooredenada);
                $("#itemDivSugEnd" + x).attr("onclick", "showEscoha(this)");
                //$("#itemDivSugEnd"+x).attr("class",'form-group col-md-4');	
            }


        }
    }
}

function showEscoha(index) {
    var ind = index.getAttribute("data-index");
    document.getElementById("sugDest").selectedIndex = ind;
    document.getElementById("divSugEnd").style.display = 'none';

    atualEndViagem();
}

function atualEndViagem() {
    try {
        if (document.getElementById("sugDest")) {


            if (document.getElementById("sugDest").selectedIndex >= 0) {
                var x = document.getElementById("sugDest").selectedIndex;
                var y = document.getElementById("sugDest").options;
                var mat = y[x].value.split(";");
                if (mat[1] == "F") {
                    document.getElementById("fViagem").value = y[x].text;

                    passageiro.setEndFinal(y[x].text);
                    passageiro.setLatLngF(mat[0]);
                    corrida.setLatLngFinal(mat[0]);

                    calcDistancias(true); // distancia de busca Passageiro
                    calcDistancias(false); //trajeto
                    setTimeout(function() {
                        var dbm = Number(document.getElementById("IHDistBusca").value);
                        var dbk = dbm / 1000;
                        dbk = parseFloat(dbk.toFixed(2));
                        dbk = dbk + (dbk * 0.2); ////20% de margem de seguranaça
                        var dtm = Number(document.getElementById("IHDistTraj").value);
                        var dtk = dtm / 1000;
                        dtk = parseFloat(dtk.toFixed(2));
                        dtk = dtk + (dtk * 0.2) ////20% de margem de seguranaça
                        var totalkm = (dbk + dtk);
                        var totalkm = parseFloat(totalkm.toFixed(2));
                        // totalkm=totalkm+(totalkm*0.2);//20% de margem de seguranaça

                        document.getElementById("dist").innerHTML = "Dist(s): " + dbk.toFixed(2) + "Km + " + dtk.toFixed(2) + "Km = " + totalkm.toFixed(2) + "Km";

                        if (document.getElementById("IHTimeD1").value) {
                            var t1 = Math.round(Number(document.getElementById("IHTimeD1").value) / 60); //em minutos
                            //  alert(document.getElementById("IHTimeD1").value);

                        }
                        if (document.getElementById("IHTimeD2").value) {
                            var t2 = Math.round(Number(document.getElementById("IHTimeD2").value) / 60); //em minutos
                        }
                        totalmin = Math.round(t1 + t2);
                        t1 = parseFloat(t1.toFixed(2));
                        t2 = parseFloat(t2.toFixed(2));
                        totalmin = parseFloat(totalmin.toFixed(2));
                        document.getElementById("tempos").innerHTML = "Estimativa de tempos: " + t1.toFixed(0) + "minutos + " + t2.toFixed(0) + "minutos = " + totalmin.toFixed(0) + "minutos";

                        if (document.getElementById("IHqUnidade").value) {
                            var kmPorL = Number(document.getElementById("IHqUnidade").value)
                        }




                        if (document.getElementById("IHvalorUnidade").value) {
                            var vlUnidComb = Number(document.getElementById("IHvalorUnidade").value)
                        }
                        if (document.getElementById("IHvalorMinuto").value) {
                            var vlMinuto = Number(document.getElementById("IHvalorMinuto").value)
                        }
                        if (document.getElementById("IHmargemLucro").value) {
                            var margemLucro = Number(document.getElementById("IHmargemLucro").value)
                        }

                        var kmVl = (dbk + dtk) * (vlUnidComb / kmPorL);
                        var tVl = (vlMinuto * (t1 + t2));
                        var lucro = (kmVl + tVl) * margemLucro;
                        var txCoop = 0;
                        var txApp = 0.098;
                        var tributo01 = 0;
                        var tributo02 = 0;
                        var tributo03 = 0;
                        var tributo04 = 0;
                        var ct = kmVl + tVl + lucro + txCoop +  tributo01 + tributo02 + tributo03 + tributo04;
                        ct = parseFloat(ct.toFixed(2));
                        ct=ct+(ct*txApp);
                        if (ct < 8.00) {
                            ct = 8.00
                        }
                        corrida.setCtEstimado(ct);
                        if (kmVl > 0) {
                            document.getElementById("valorViagem").innerHTML = "Estimativa de Preço: R$ " + ct.toFixed(2) + "</p></div> </div>";

                        }

                    }, 4500);


                } else {
                    if (mat[1] == "C") {
                        document.getElementById("sugDest").focus();
                    } else {
                        document.getElementById("iViagem").value = y[x].text;
                        passageiro.setEndOrigem(y[x].text);
                        // passageiro.setLatLngF(passageiro.getLatLngF());
                        passageiro.setLatLngI(mat[0]);
                        corrida.setLatLngBusca(mat[0]); //vê isso. Pode gerar erro formato interno está como string  

                    }

                }
                if (mat[1] != "C") {
                    document.getElementById("sugDest").options.length = 0; //zera list
                    document.getElementById("sugDest").style.visibility = 'hidden';
                }


                if (mat[1] == "F") {
                    //  document.getElementById("fViagem").focus(); 	
                }
                if (mat[1] == "I") {
                    //	document.getElementById("iViagem").focus(); 
                }




            } else {
                calcDistancias(true); // distancia de busca Passageiro
                calcDistancias(false); //trajeto
                setTimeout(function() {
                    var dbm = Number(document.getElementById("IHDistBusca").value);
                    var dbk = dbm / 1000;
                    dbk = parseFloat(dbk.toFixed(2));
                    var dtm = Number(document.getElementById("IHDistTraj").value);
                    var dtk = dtm / 1000;
                    dtk = parseFloat(dtk.toFixed(2));
                    var totakm = (dbk + dtk);
                    var totakm = parseFloat(totakm.toFixed(2));

                    document.getElementById("dist").innerHTML = "Dist(s): " + dbk + "Km + " + dtk + "Km = " + totakm + "Km";

                    if (document.getElementById("IHTimeD1").value) {
                        var t1 = Math.round(Number(document.getElementById("IHTimeD1").value) / 60); //em minutos
                        //  alert(document.getElementById("IHTimeD1").value);

                    }
                    if (document.getElementById("IHTimeD2").value) {
                        var t2 = Math.round(Number(document.getElementById("IHTimeD2").value) / 60); //em minutos
                    }
                    totalmin = Math.round(t1 + t2);
                    t1 = parseFloat(t1.toFixed(2));
                    t2 = parseFloat(t2.toFixed(2));
                    totalmin = parseFloat(totalmin.toFixed(2));
                    document.getElementById("tempos").innerHTML = "Estimativa de tempos: " + t1.toFixed(0) + "minutos + " + t2.toFixed(0) + "minutos = " + totalmin.toFixed(0) + "minutos";

                    if (document.getElementById("IHqUnidade").value) {
                        var kmPorL = Number(document.getElementById("IHqUnidade").value)
                    }




                    if (document.getElementById("IHvalorUnidade").value) {
                        var vlUnidComb = Number(document.getElementById("IHvalorUnidade").value)
                    }
                    if (document.getElementById("IHvalorMinuto").value) {
                        var vlMinuto = Number(document.getElementById("IHvalorMinuto").value)
                    }
                    if (document.getElementById("IHmargemLucro").value) {
                        var margemLucro = Number(document.getElementById("IHmargemLucro").value)
                    }

                    var kmVl = (dbk + dtk) * (vlUnidComb / kmPorL);
                    var tVl = (vlMinuto * (t1 + t2));
                    var lucro = (kmVl + tVl) * margemLucro;
                    var txCoop = 0;
                    var txApp = 0.098;
                    var tributo01 = 0;
                    var tributo02 = 0;
                    var tributo03 = 0;
                    var tributo04 = 0;
                    var ct = kmVl + tVl + lucro + txCoop +  tributo01 + tributo02 + tributo03 + tributo04;
                    ct = parseFloat(ct.toFixed(2));
                    ct=ct+(ct*txApp);
                    if (kmVl > 0) {
                        document.getElementById("valorViagem").innerHTML = "Estimativa de Preço: R$ " + ct.toFixed(2) + "</p></div> </div>";

                    }

                }, 2500);

            }
        }
    } catch (e) {
        alert("erro na function atualEndViagem :  " + e.message);

    }

}

//criaAtualizaSessao(id,informacao) verificaExistenciaSessao(id)
//recuperaSessao(id) removeSessao(id)

function buscarMotorista() { // chama defi..RotaCorrida()
    //escolheMotoristaEspehcfico(evento,tipoCHAMADA,tipoCORRIDA)
    escolheMotoristaEspecfico(false, STATUS.getCodChamCorrNormal(), STATUS.getCodCorrNormal());

    //var getDezMotProximos=false;//deve pegar apenas O mais proximo, apenas UM
    //var rotaBuscarPassageiro=false;

}

function setGraphMotoristas(getDezMotProximos, motoristaEscolhidoDiretamente, STATUSmot) { //chamada em achouLocalArrastando(). Aqui já tem o preferencial baseado na distancia
    try {
        var latLng = passageiro.getLatLngI();
        var varRaioIHrChamDir = document.getElementById("IHraioChamDir").value;
        var varIHidFiltroSoAmigos = document.getElementById("IHidFiltroSoAmigos").value;
        if (!corrida.getCodigo()) {
            if (latLng != null) {
                var url = "../php/buscarMotoristas.php";
                if (STATUSmot == undefined) {
                    url += "?codPassageiro=" + passageiro.getCodigo() + "&condAmizade=" + varIHidFiltroSoAmigos + "&raioChamDir=" + varRaioIHrChamDir + "&lat=" + latLng.lat + "&lng=" + latLng.lng;
                } else {
                    url += "?codPassageiro=" + passageiro.getCodigo() + "&condAmizade=" + varIHidFiltroSoAmigos + "&raioChamDir=" + varRaioIHrChamDir + "&lat=" + latLng.lat + "&lng=" + latLng.lng + "&status=" + STATUSmot;
                }

                try {
                    ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    try {
                        ajaxObj = new ActiveXObject("Msxml2.XMLHTTP");
                    } catch (ex) {
                        try {
                            ajaxObj = new XMLHttpRequest();
                            /************************************************************/
                            ajaxObj.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    try {
                                        
                                        var ObjMotoristas = JSON.parse(ajaxObj.response);
                                        if (motoristas.length > 0) {
                                            for (var x = 0; x < motoristas.length; x++) {
                                                motoristas[x].marca.remove();

                                            }
                                        }
                                        if (motoristas.length > 0) {
                                            for (var x = 0; x < motoristas.length; x++) {
                                                motoristas.pop();
                                            }
                                        }

                                        if (ObjMotoristas.motoristas.length > 0) {

                                            if (getDezMotProximos) { //se SIM
                                                var markerArray = []; //lista 10 motoristas mais proximos
                                                markerArray.push(app.markerI); //classificado por conceito e distancia

                                                for (var i = 0; i < ObjMotoristas.motoristas.length; i++) {

                                                    var marca = L.marker([ObjMotoristas.motoristas[i].lat_posicao, ObjMotoristas.motoristas[i].lng_posicao], {
                                                        icon: app.icon
                                                    }).addTo(app.map).bindPopup(ObjMotoristas.motoristas[i].nome).openPopup();
                                                    marca.on('dblclick', onDbClickMarcaMotorista);
                                                    marca.on('mouseover', function(e) {
                                                        this.openPopup();
                                                    });
                                                    marca.on('mouseout', function(e) {
                                                        this.closePopup();
                                                    });

                                                    markerArray.push(marca);
                                                    motoristas.push(); //acrsecenta elemento em matriz motoristas definida logo inicio do script
                                                    motoristas[i] = new Motoristas();
                                                    motoristas[i].setCodigo(ObjMotoristas.motoristas[i].codigo);
                                                    motoristas[i].setNome(ObjMotoristas.motoristas[i].nome);
                                                    motoristas[i].setSobrenome(ObjMotoristas.motoristas[i].sobrenome);
                                                    motoristas[i].setApelido(ObjMotoristas.motoristas[i].apelido);
                                                    motoristas[i].setMarca(marca);
                                                    motoristas[i].setPosicao(ObjMotoristas.motoristas[i].posicao);
                                                    motoristas[i].setLat(ObjMotoristas.motoristas[i].lat_posicao);
                                                    motoristas[i].setLng(ObjMotoristas.motoristas[i].lng_posicao);
                                                    motoristas[i].setFicticio(ObjMotoristas.motoristas[i].ficticio);
                                                    motoristas[i].qUnidade = ObjMotoristas.motoristas[i].qUnidade;;
                                                    motoristas[i].valorUnidade = ObjMotoristas.motoristas[i].valorUnidade;;
                                                    motoristas[i].valorMinuto = ObjMotoristas.motoristas[i].valorMinuto;
                                                    motoristas[i].margemLucro = ObjMotoristas.motoristas[i].margemLucro;
                                                    motoristas[i].cat_cnh = ObjMotoristas.motoristas[i].cat_cnh;
                                                    motoristas[i].url_avatar = ObjMotoristas.motoristas[i].url_avatar;
                                              //      motoristas[i].id_facebook = ObjMotoristas.motoristas[i].id_facebook;
                                                    if (i == ObjMotoristas.motoristas.length - 1) {
                                                        // var group = L.featureGroup(markerArray); //add markers array to featureGroup
                                                        // app.map.fitBounds(group.getBounds()); 
                                                    }
                                                }
                                                //Nesta funcao abaixo latLng.lat,latLng.lng indica posicao de embarque(PemB)

                                            } else {
                                                //motoristas.push();//acrsecenta elemento em matriz motoristas definida logo inicio do script
                                                //motoristas[0] = new Motoristas();
                                                //Matriz com dados do motorista-s escolhido, inclusive a marca
                                                if (motoristaEscolhidoDiretamente) {
                                                    if (ObjMotoristas.motoristas.length > 0) {
                                                        var achou = false;
                                                        var markerArray = []; //lista somente o motorista escolhido se ainda tiver disponível
                                                        markerArray.push(app.markerI); //marca do passageiro
                                                        for (var i = 0; i < ObjMotoristas.motoristas.length; i++) {
                                                            if (motoristas[i]) {
                                                                motoristas[i].marca.removeFrom(app.map);
                                                            }

                                                            if (motoristaEscolhidoDiretamente.getCodigo() == ObjMotoristas.motoristas[i].codigo) {
                                                                //atualiza o dados do motorista escolhido
                                                                var marca = L.marker([ObjMotoristas.motoristas[i].lat_posicao, ObjMotoristas.motoristas[i].lng_posicao], {
                                                                    icon: app.icon
                                                                }).addTo(app.map).bindPopup(ObjMotoristas.motoristas[i].nome).openPopup();
                                                                marca.on('mouseover', function(e) {
                                                                    this.openPopup();
                                                                });
                                                                marca.on('mouseout', function(e) {
                                                                    this.closePopup();
                                                                });
                                                                markerArray.push(marca);
                                                                motoristas.push(); //acrsecenta elemento em matriz motoristas definida logo inicio do script
                                                                motoristas[0] = new Motoristas(); //necessário prq motoristas[] é zerada quando entra nesta funcao
                                                                motoristas[0].setCodigo(ObjMotoristas.motoristas[0].codigo);
                                                                motoristas[0].setNome(ObjMotoristas.motoristas[0].nome);
                                                                motoristas[0].setSobrenome(ObjMotoristas.motoristas[0].sobrenome);
                                                                motoristas[0].setApelido(ObjMotoristas.motoristas[0].apelido);
                                                                motoristas[0].setMarca(marca);
                                                                motoristas[0].setPosicao(ObjMotoristas.motoristas[0].posicao);
                                                                motoristas[0].setLat(ObjMotoristas.motoristas[0].lat_posicao);
                                                                motoristas[0].setLng(ObjMotoristas.motoristas[0].lng_posicao);
                                                                motoristas[0].qUnidade = ObjMotoristas.motoristas[0].qUnidade;;
                                                                motoristas[0].valorUnidade = ObjMotoristas.motoristas[0].valorUnidade;;
                                                                motoristas[0].valorMinuto = ObjMotoristas.motoristas[0].valorMinuto;
                                                                motoristas[0].margemLucro = ObjMotoristas.motoristas[0].margemLucro;
                                                                motoristas[0].cat_cnh = ObjMotoristas.motoristas[0].cat_cnh;
                                                                motoristas[0].url_avatar = ObjMotoristas.motoristas[0].url_avatar;
                                                                motoristas[0].id_facebook = ObjMotoristas.motoristas[i].id_facebook;


                                                                app.setMotorista(motoristas[0]);
                                                                achou = true;

                                                            }
                                                            if (i == ObjMotoristas.motoristas.length - 1) {
                                                                var group = L.featureGroup(markerArray); //add markers array to featureGroup
                                                                app.map.fitBounds(group.getBounds());
                                                            }
                                                        }
                                                        if (!achou) { //se não achou
                                                            var mensagem = "<strong>Motorista não está mais disponível!</strong>";
                                                            mostraDialogo(mensagem, "warning", 1500);
                                                        }
                                                    } else {
                                                        var mensagem = "<strong>Motorista parece não está mais disponível!</strong>";
                                                        mostraDialogo(mensagem, "warning", 1500);
                                                    }
                                                } else { //Zero prq é o primeiro de acordo com criterios de buuscaMotoristas.php
                                                    //  var markerArray = [];//lista somente o motorista escolhido se ainda tiver dissponível
                                                    //	markerArray.push(app .markerI);//marca do passageiro
                                                    //atualiza o dados do motorista escolhido pelo conceito e distancia
                                                    var marca = L.marker([ObjMotoristas.motoristas[0].lat_posicao, ObjMotoristas.motoristas[0].lng_posicao], {
                                                        icon: app.icon
                                                    }).addTo(app.map).bindPopup(ObjMotoristas.motoristas[0].nome).openPopup();
                                                    marca.on('mouseover', onMouseOverMarcaMotorista);
                                                    marca.on('mouseout', onMouseOutMarcaMotorista);
                                                    //markerArray.push(marca);

                                                    motoristas.push(); //acrsecenta elemento em matriz motoristas definida logo inicio do script
                                                    motoristas[0] = new Motoristas(); //necessário prq motoristas[] é zerada quando entra nesta funcao
                                                    motoristas[0].setCodigo(ObjMotoristas.motoristas[0].codigo);
                                                    motoristas[0].setNome(ObjMotoristas.motoristas[0].nome);
                                                    motoristas[0].setSobrenome(ObjMotoristas.motoristas[0].sobrenome);
                                                    motoristas[0].setApelido(ObjMotoristas.motoristas[0].apelido);
                                                    motoristas[0].setMarca(marca);
                                                    motoristas[0].setPosicao(ObjMotoristas.motoristas[0].posicao);
                                                    motoristas[0].setLat(ObjMotoristas.motoristas[0].lat_posicao);
                                                    motoristas[0].setLng(ObjMotoristas.motoristas[0].lng_posicao);

                                                    motoristas[0].qUnidade = ObjMotoristas.motoristas[0].qUnidade;;
                                                    motoristas[0].valorUnidade = ObjMotoristas.motoristas[0].valorUnidade;;
                                                    motoristas[0].valorMinuto = ObjMotoristas.motoristas[0].valorMinuto;
                                                    motoristas[0].margemLucro = ObjMotoristas.motoristas[0].margemLucro;

                                                    motoristas[0].cat_cnh = ObjMotoristas.motoristas[0].cat_cnh;
                                                    motoristas[0].url_avatar = ObjMotoristas.motoristas[0].url_avatar;
                                                    motoristas[0].id_facebook = ObjMotoristas.motoristas[i].id_facebook;

                                                    app.setMotorista(motoristas[0]);
                                                    //remove restantes dos motoristas, por isso conta de 1(i=1)
                                                    for (var i = 1; i < ObjMotoristas.motoristas.length; i++) {
                                                        if (motoristas[i]) {
                                                            motoristas[i].marca.removeFrom(app.map);
                                                        }
                                                    }
                                                    //chamaMotoristaEscolhido(motoristas[0]);
                                                }
                                            }
                                            espereCarregandoRequisicao(false); //funcao espereCarregandoRequisicao(carregando,txt)
                                            //return motoristas[0];//retorna primeiro motorista escolhido


                                        } else {
                                            espereCarregandoRequisicao(false);
                                            //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)
                                            var mensagem = "<strong>Não temos motoristas na área<br>!</strong>*Tente mudar os critérios em configurações ou  TeleTransporte*";
                                            mostraDialogo(mensagem, "warning", 2500);
                                            //mostraModal("Sem motorista","Não temos motoristas na área<br><br>","Fechar esta janela",false,false,"*Tente mudar os critérios em configurações ou  TeleTransporte*.*Ainda não disponível.");
                                            //alert ("Sem motoristas disponíveis na área")
                                        }


                                    } catch (eD) {
                                        alert(eD.message + " na função setGraphMotoristas")
                                    }

                                } //fim se readyState== 200 e readyState==4
                                if (this.readyState == 1) {
                                    espereCarregandoRequisicao(true, "Verificando motoristas nas proximidades...", ajaxObj);
                                }
                            }

                            /************************************************************/
                            try {
                                ajaxObj.open("GET", url, true);
                                ajaxObj.send();
                            } catch (e) {
                                alert("Erro:" + e.message + "\n Veja com o adrministrador se tem acesso ao BD. \n falecomigo@teletransporte.net")
                            }

                            /************************************************************/
                        }
                        /************************************************************/
                        catch (exc) {
                            alert("Esse browser não tem recursos para uso do Ajax");
                            ajaxObj = null;
                        }
                    }
                }




            }
        }

    } catch (e) {
        alert("Erro em setGraphMotoristas: " + e.message)
    }
}


//criaAtualizaSessao(id,informacao) verificaExistenciaSessao(id)
//recuperaSessao(id) removeSessao(id)

function espereCarregandoRequisicao(carregando, txt, requisicao) {
    if (carregando) {
        var elemento = document.getElementById("carregando");
        if (!elemento) {
            $('<div></div>').attr("id", "carregando").appendTo("body");
            $("<h2>").attr("id", "txt").appendTo("div#carregando");
            if (requisicao) {
                $("#txt").append("<p>" + txt + "</p></br><img src='imgs/espere.gif'/><br/><button type='button' id='btPararRequisicao' value='0'>Parar</button>");
                document.getElementById("btPararRequisicao").onclick = function() {
                    requisicao.abort();
                    document.getElementById("txt"), value = 'Parando';
                    espereCarregandoRequisicao(false);
                    //var global super gambiarra
                    pararBuscaPorMotorista = true;
                    return true; // VAI PARAR
                }
            } else {
                $("#txt").append("<p>" + txt + "</p></br><img src='imgs/espere.gif'/><br/>");
                return false; //NÃO vai PARAR
            }



        }
    } else {
        $("div").remove("#txt");
        $("div").remove("#carregando");
        return true; // VAI PARAR


    }

}

function stopRequisicao(requisicao) {
    requisicao.abort();
    espereCarregandoRequisicao(false);
}

function defineRotaCorrida(buscarPassageiro) { //chamado por ebufscarMotorista().Define a rota e volta se deu certo
    if (!buscarPassageiro) {
        //rota principal

        var latLngI = passageiro.getLatLngI();
        if (typeof(latLngI) != "object") {
            latLngI = latLngI.split(","); //pega string transforma em matriz			   
            latLngI = L.latLng(latLngI);
        }
        var latLngF = passageiro.getLatLngF();
        if (typeof(latLngF) != "object") {
            latLngF = latLngF.split(","); //pega string transforma em matriz			   
            latLngF = L.latLng(latLngF);
        }
        corrida.setLatLngBusca(latLngI); //precisa para tracar rota do motorista ate passageiro
        if (latLngF != null) {
            var endFinal = passageiro.getEndFinal();
            if (app.markerI) {
                app.markerI.remove();
            }
            if (app.rota != null) {
                Routing = app.rota
            } else {
                var Routing = L.Routing.control({
                    routeWhileDragging: true,
                    language: 'pt',
                    show: false,
                    lineOptions: {
                        styles: [{
                            color: '#206B39',
                            opacity: 0.75,
                            weight: 8
                        }]
                    },
                    altLineOptions: {
                        styles: [{
                            color: '#206B39',
                            opacity: 0.35,
                            weight: 8
                        }]
                    },
                    router: L.Routing.mapbox('pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong')
                });
                Routing.addTo(app.map);

            }
            Routing.on('routeselected', function(e) {
                var r = e.route;
                var line = L.Routing.line(r);
                var bounds = line.getBounds();
                app.map.fitBounds(bounds);
            });

            Routing.on('routesfound', function(e) {
                var routes = e.routes;
                var qRotas = routes.length;
                var minDist, x = 0;
                minDist = routes[0].summary.totalDistance;
                while (x < qRotas - 1) {
                    x++;
                    minDist = routes[x].summary.totalDistance;
                }
                minDist = minDist / 1000;

                console.log("Distancia entre passageiro e destino:" + minDist + "Km")

            });

            Routing.getPlan().setWaypoints([]);

            Routing.getPlan().setWaypoints([
                L.latLng(latLngI.lat, latLngI.lng),
                L.latLng(latLngF.lat, latLngF.lng)
            ]);
            app.rota = Routing;
            var jm = document.getElementById("janelaModal");
            if (jm) {
                $(jm).modal('hide');
            }

            return true; // tinha enderço final

        } else { // precisa enderço final

            var s1 = "";
            s1 += "<div class='alert alert-danger alert-dismissible fade in'>"
            s1 += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
            s1 += "<strong>Atenção!</strong> Preencha os campos selecionando as sugestões apresentadas!";
            s1 += " </div>"
            document.getElementById("msgErro").innerHTML = s1; // em mostraModal	
            return false;
        }
    } else {
        /***********************************/


        var latLngI = corrida.getLatLngInicial();
        if (typeof(latLngI) != "object") {
            latLngI = latLngI.split(","); //pega string transforma em matriz			   
            latLngI = L.latLng(latLngI);
        }
        var latLngF = corrida.getLatLngBusca(); //setado quando traca rota do destino de passageiro, lá em cima
        if (typeof(latLngF) != "object") {
            latLngF = latLngF.split(","); //pega string transforma em matriz			   
            latLngF = L.latLng(latLngF);
        }
        if (latLngF != null) {
            var endFinal = passageiro.getEndFinal();
            //if (app.markerI){
            //    app.markerI.remove();
            //}	 

            if (app.rotaBuscaPassageiro != null) {
                Routing = app.rotaBuscaPassageiro
            } else {
                var Routing = L.Routing.control({
                    routeWhileDragging: false,
                    dragging: false,
                    language: 'pt',
                    show: false,
                    draggableWaypoints: false,
                    addWaypoints: false,
                    lineOptions: {
                        styles: [{
                            color: 'red',
                            opacity: 0.35,
                            weight: 6
                        }]
                    },
                    altLineOptions: {
                        styles: [{
                            color: 'red',
                            opacity: 0.15,
                            weight: 6
                        }]
                    },
                    router: L.Routing.mapbox('pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong')
                });
                Routing.addTo(app.map);

            }
            Routing.on('routeselected', function(e) {
                var r = e.route;
                var line = L.Routing.line(r);
                var bounds = line.getBounds();
                app.map.fitBounds(bounds);
            });

            Routing.on('routesfound', function(e) {
                var routes = e.routes;
                var qRotas = routes.length;
                var minDist, x = 0;
                minDist = routes[0].summary.totalDistance;
                while (x < qRotas - 1) {
                    x++;
                    minDist = routes[x].summary.totalDistance;
                }
                minDist = minDist / 1000;

                console.log("Distancia entre o motorista e o passageiro:" + minDist + "Km")

            });

            Routing.getPlan().setWaypoints([]);

            Routing.getPlan().setWaypoints([
                L.latLng(latLngI.lat, latLngI.lng),
                L.latLng(latLngF.lat, latLngF.lng)
            ]);
            app.rotaBuscaPassageiro = Routing;
            var jm = document.getElementById("janelaModal");
            if (jm) {
                $(jm).modal('hide');
            }
            return true;

        } else {

            var s1 = "";
            s1 += "<div class='alert alert-danger alert-dismissible fade in'>"
            s1 += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
            s1 += "<strong>Atenção!</strong> Preencha os campos selecionando as sugestões apresentadas!";
            s1 += " </div>"
            document.getElementById("msgErro").innerHTML = s1; // em mostraModal	
            return false;
        }

    }
}

function calcDistancias(buscarPassageiro) {
    try {
        var latLngI = passageiro.getLatLngI();
        if (typeof(latLngI) != "object") {
            latLngI = latLngI.split(","); //pega string transforma em matriz			   
            latLngI = L.latLng(latLngI);
        }
        corrida.setLatLngBusca(latLngI); //precisa para tracar rota do motorista ate passageiro
        if (!buscarPassageiro) { //distancia do trajeto
            // var latLngI=passageiro.getLatLngI();	//onde o passgeiro inicia a viagem 
            var latLngF = passageiro.getLatLngF(); //onde o passgeiro termina a viagem 
            //corrida.setLatLngBusca(latLngI);//precisa para tracar rota do motorista ate passageiro
            if (latLngF != null) {
                var endFinal = passageiro.getEndFinal();
                if (app.markerI) {
                    app.markerI.remove();
                }
                if (app.rota != null) {
                    Routing = app.rota
                } else {
                    var Routing = L.Routing.control({
                        routeWhileDragging: true,
                        draggableWaypoints: true,
                        addWaypoints: false,
                        language: 'pt',
                        show: false,

                        lineOptions: {
                            styles: [{
                                color: '#206B39',
                                opacity: 0.75,
                                weight: 8
                            }]
                        },
                        altLineOptions: {
                            styles: [{
                                color: '#206B39',
                                opacity: 0.35,
                                weight: 8
                            }]
                        },
                        router: L.Routing.mapbox('pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong')
                    });
                    Routing.addTo(app.map);

                }


                var d = Routing.on('routesfound', function(e) {
                    var routes = e.routes;
                    var qRotas = routes.length;
                    var minDist, x, t2 = 0;
                    minDist = routes[0].summary.totalDistance;
                    t2 = routes[0].summary.totalTime; //em segundos
                    while (x < qRotas - 1) {
                        x++;
                        minDist = routes[x].summary.totalDistance; // em metros
                        t2 = routes[x].summary.totalTime; //em segundos
                        // alert(t2);
                    }
                    // minDist=minDist;


                    document.getElementById("IHDistTraj").value = minDist;
                    document.getElementById("IHTimeD2").value = t2;

                    // Routing.getPlan().setWaypoints([]);	  
                    //  app.map.removeControl(app.rota);



                });

                Routing.getPlan().setWaypoints([]);

                Routing.on('waypointschanged', function(e) {
                    if (e.waypoints[0].latLng) {
                        if (!buscarPassageiro) {
                            //  alert(e.waypoints[0].latLng);
                            passageiro.setLatLngI(e.waypoints[0].latLng);
                            latLngI = e.waypoints[0].latLng;
                        }

                    }

                });

                Routing.getPlan().setWaypoints([
                    L.latLng(latLngI.lat, latLngI.lng),
                    L.latLng(latLngF.lat, latLngF.lng)
                ]);
                app.rota = Routing;




            } else { // precisa enderço final

                var s1 = "";
                s1 += "<div class='alert alert-danger alert-dismissible fade in'>"
                s1 += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
                s1 += "<strong>Atenção!</strong> Preencha os campos selecionando as sugestões apresentadas!";
                s1 += " </div>"
                document.getElementById("msgErro").innerHTML = s1; // em mostraModal	
                //    return false;		  
            }
        } else {
            /***********************************/


            latLngI = corrida.getLatLngInicial(); //Aqui é onde o motorista está	
            if (typeof(latLngI) != "object") {
                latLngI = latLngI.split(","); //pega string transforma em matriz			   
                latLngI = L.latLng(latLngI);
            }
            // alert(latLngI)	;
            var latLngF = corrida.getLatLngBusca(); //setado quando traca rota do destino de passageiro, lá em cima
            if (latLngF != null) {
                var endFinal = passageiro.getEndFinal();
                if (app.markerI) {
                    // app.markerI.remove();
                }

                if (app.rotaBuscaPassageiro != null) {
                    Routing = app.rotaBuscaPassageiro
                } else {
                    var Routing = L.Routing.control({
                        routeWhileDragging: false,
                        language: 'pt',
                        show: false,
                        createMarker: function() {
                            return null;
                        }, //sem marca na rota
                        draggableWaypoints: false,
                        addWaypoints: false,
                        lineOptions: {
                            styles: [{
                                color: 'red',
                                opacity: 0.35,
                                weight: 6
                            }]
                        },
                        altLineOptions: {
                            styles: [{
                                color: 'red',
                                opacity: 0.15,
                                weight: 6
                            }]
                        },
                        router: L.Routing.mapbox('pk.eyJ1IjoibW9pc2VzdHAiLCJhIjoiY2p6dmV4bzZjMHA0NDNsbG1uOGVpM2p2ciJ9.C58i-7tniaJLCWKm77Pong')
                    });
                    Routing.addTo(app.map);

                }


                Routing.on('routesfound', function(e) {
                    var routes = e.routes;
                    var qRotas = routes.length;
                    var minDist, x, t1 = 0;
                    minDist = routes[0].summary.totalDistance;
                    t1 = routes[0].summary.totalTime; //em segundos
                    while (x < qRotas - 1) {
                        x++;
                        minDist = routes[x].summary.totalDistance;
                        t1 = routes[x].summary.totalTime; //em segundos
                        //alert(t1);
                    }
                    // minDist=minDist;


                    document.getElementById("IHDistBusca").value = minDist;
                    document.getElementById("IHTimeD1").value = t1;

                    //  Routing.getPlan().setWaypoints([]);	  
                    //   app.map.removeControl(app.rotaBuscaPassageiro);

                    // return minDist;
                    // console.log("Distancia entre o motorista e o passageiro:"+minDist+"Km")

                });

                Routing.getPlan().setWaypoints([]);

                Routing.getPlan().setWaypoints([
                    L.latLng(latLngI.lat, latLngI.lng),
                    L.latLng(latLngF.lat, latLngF.lng)
                ]);
                app.rotaBuscaPassageiro = Routing;


            } else {

                var s1 = "";
                s1 += "<div class='alert alert-danger alert-dismissible fade in'>"
                s1 += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
                s1 += "<strong>Atenção!</strong> Preencha os campos selecionando as sugestões apresentadas!";
                s1 += " </div>"
                document.getElementById("msgErro").innerHTML = s1; // em mostraModal	
                //   return false;		  
            }

        }
    } catch (e) {
        console.log("Erro na funcao calcDistancias.Por isso deixei silencioso.Este erro não prejudicial ao objetivo da função: " + e.message)
    }
}


function carregaMenus(idioma) {
    //app .setArqXml();//Seta o arquio XML na variavel que representa a app
    var arqXML;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
            arqXML = xhttp.responseXML;
            traduz("nSite", idioma, arqXML);
        }
    };
    xhttp.open("GET", "xml/menus.xml", true);
    xhttp.send();
}

function traduz(id, ling, arqXML) {
    /* Sempre obedecer o esquema ling/oque/nomeitem	   
       ling: pt-br, en 
       oque: menu
       nomeitem: nSite, etc...
       
    */
    var iMenu, x, y, i, xlen, txt;
    var menu = [];

    x = arqXML.getElementsByTagName(ling)[0];
    xlen = x.childNodes.length;
    //alert(xlen);
    y = x.firstChild;
    txt = "";
    iMenu = 0;
    for (i = 0; i < xlen; i++) {
        if (y.nodeType == 1) {
            // alert(y.firstChild.nodeValue);
            menu[iMenu] = y.firstChild.nodeValue;
            iMenu++;

            //        txt = i + "        " + y.nodeName +"     "+y.firstChild.nodeValue+ "<br>";
            //	alert(txt);
        }
        y = y.nextSibling;
    }

    document.getElementById("nSite").textContent = menu[0];
    document.getElementById("inicio").textContent = menu[1];
    document.getElementById("fazerViagem").textContent = menu[2];
    document.getElementById("voceeagente").innerHTML = menu[3] + "<span class='caret'></span>";
    document.getElementById("suaQualificacao").textContent = menu[4]; /*Perigo seguranca:uso do innerHTML*/
    document.getElementById("viagensFeitas").textContent = menu[5];
    document.getElementById("configuracoes").innerHTML = menu[6] + "<span class='caret'></span>";
    document.getElementById("formasDePagamento").textContent = menu[7];
    document.getElementById("teletransporte").textContent = menu[8];
    document.getElementById("compartilharViagem").textContent = menu[9];
    document.getElementById("notificações").textContent = menu[10];
    document.getElementById("idioma").textContent = menu[11];
}

function acheme() {
    if (app.markerI) {
        app.markerI.remove();
    }
    app.map.locate({
        setView: false
    });
    //app.map.setZoom(10);
}

function OnEnter(evt) {
    var key_code = evt.keyCode ? evt.keyCode :
        evt.charCode ? evt.charCode :
        evt.which ? evt.which : void 0;
    if (key_code == 13) {
        return true;
    }
}

function showEndInicial() {
    var iniViagem = passageiro.getEndOrigem();
    document.getElementById("iViagem").innerHTML = iniViagem;
}

function detectar_mobile() {
    var check = false; //wrapper no check
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}

var pararBuscaPorMotorista = false; //gambiarra

function corridaGetStatus(tempoSegundos, proximoMotoristaP) { //Pega Status no BD e seta var javascript	
    try {
        //	chma escolheMotoristaEspecfico() quando n~eo em chamada direta e chama um a um
        var tempoEsperarMotorista = 22; //30 segundos
        var n = 0;

        var aceito = false;
        var varStatusCORRIDA = null;
        if (!proximoMotoristaP) {
            var proximoMotorista = 0; //atual começa com zero	
        } else {
            proximoMotorista = proximoMotoristaP;
        }

        var intervalo = setInterval(function() {
            if (n%2==0){  
                 loadChatEmUll();                         
                qMsgMotoristaTotal=$( ".msgMotorista" ).length;
                   if (qMsgMotoristaTotal>0){
                    console.log('');
                   }

               }
            if (corrida.getCodigo() != null) {
                var url = "../php/verificaStatusCorrida.php?cod_corrida=" + corrida.getCodigo();
                n++;
                var obAjax = $.get(url, function(resultado) {
                    corrida.setStatus(resultado);
                    varStatusCORRIDA = corrida.getStatus();
                    
                    
                    

                    if (varStatusCORRIDA == STATUS.getCodChamDirPas()) {
                        espereCarregandoRequisicao(true, "Espere...chamando seu motorista...", false);
                    }
                    if (varStatusCORRIDA == STATUS.getCodChamCorrNormal()) { //corrida tradicional
                        espereCarregandoRequisicao(true, "Espere...procurando seu motorista...", obAjax);
                    }
                    if (varStatusCORRIDA == STATUS.getCodCorrDirAceita() ||
                        varStatusCORRIDA == STATUS.getCodCorrNormalAceita()) { //STATUS 1 000 011 = Chamando motorista Online normal
                        espereCarregandoRequisicao(false);
                        zeraBufferCoords(bufferCoords);
                        atualizaPosicaoMotorista2();
                        if (!aceito) {
                            escondeObjetos('btLimpar');
                            if (app.motorista) {
                                aceito = true;
                                mostraTelaFinalMotEscolhido(app.motorista);
                            }

                        }
                        //muda STATUS DO PASSAGEIRO PARA O DA CORRIDA
                        passageiro.setStatus(varStatusCORRIDA);
                        setaStatusPassageiroNoBD(passageiro.getCodigo(), varStatusCORRIDA)
                        
                    }
                    //codCorrNormal
                    if (varStatusCORRIDA == STATUS.getCodCorrNormal()) {

                        if (!pararBuscaPorMotorista) {
                            //pararBuscaPorMotorista(var global) pode ser setado para true em espereCarregandoRequisicao()  ;
                            espereCarregandoRequisicao(true, "Espere...procurando seu motorista...", obAjax);
                        } else {
                            tempoEsperarMotorista = 0;
                        }



                    }
                    if (varStatusCORRIDA == STATUS.getCodCorrDirPas()) {
                        espereCarregandoRequisicao(true, "Espere...chamando seu motorista...", false);
                    }
                    //codCorrDirPas		
                    if (varStatusCORRIDA == STATUS.getCodBuscPasCorrDir() ||
                        varStatusCORRIDA == STATUS.getCodBuscPasCorrNormal()) { //STATUS 1001101 = Chamando motorista Online normal
                        document.getElementById("cabPainelMotoristaEscolhido").innerHTML = 'Seu motorista está a caminho...';

                        atualizaPosicaoMotorista2();

                        //muda STATUS DO PASSAGEIRO PARA O DA CORRIDA
                        passageiro.setStatus(varStatusCORRIDA);
                        setaStatusPassageiroNoBD(passageiro.getCodigo(), varStatusCORRIDA);
                      

                        if (!aceito) {
                            escondeObjetos('btLimpar', 'menus');
                            if (app.motorista) {
                                aceito = true;
                                mostraTelaFinalMotEscolhido(app.motorista);
                            }
                        }
                        
                        espereCarregandoRequisicao(false);
                    }
                    if (varStatusCORRIDA == STATUS.getCodEspPasCorrDir() ||
                        varStatusCORRIDA == STATUS.getCodEspPasCorrNormal()) { //STATUS 1001101 = Chamando motorista Online normal
                        document.getElementById("cabPainelMotoristaEscolhido").innerHTML = 'Seu motorista está lhe esperando...';

                        atualizaPosicaoMotorista2();
                        //muda STATUS DO PASSAGEIRO PARA O DA CORRIDA
                        passageiro.setStatus(varStatusCORRIDA);
                        setaStatusPassageiroNoBD(passageiro.getCodigo(), varStatusCORRIDA)
                        

                        if (!aceito) {
                            escondeObjetos('btLimpar', 'menus');
                            if (app.motorista) {
                                aceito = true;
                                mostraTelaFinalMotEscolhido(app.motorista);
                            }
                        }
                    }
                    if (varStatusCORRIDA == STATUS.getCodCorrDirPasEmb() ||
                        varStatusCORRIDA == STATUS.getCodCorrNormalPasEmb()) { //STATUS 1001101 = Chamando motorista Online normal
                        document.getElementById("cabPainelMotoristaEscolhido").innerHTML = 'Em viagem...';
                       

                        atualizaPosicaoMotorista2();

                        //muda STATUS DO PASSAGEIRO PARA O DA CORRIDA
                        passageiro.setStatus(varStatusCORRIDA);
                        setaStatusPassageiroNoBD(passageiro.getCodigo(), varStatusCORRIDA)


                        if (!aceito) {
                            escondeObjetos('btLimpar', 'menus');
                            if (app.motorista) {
                                aceito = true;
                                mostraTelaFinalMotEscolhido(app.motorista);
                            }
                        }
                    }
                    if (varStatusCORRIDA == STATUS.getCodCorrDirTerm() ||
                        varStatusCORRIDA == STATUS.getCodCorrNormalTerm()) { //STATUS 1001101 = Chamando motorista Online normal
                        if (!aceito) {
                            aceito = true;
                        }
                        passageiro.setStatus(STATUS.getCodOnLine());
                        // setaStatusPassageiroNoBD(passageiro.getCodigo(),STATUS.getCodOnLine())		    		     
                        var url = '../php/setaStatusPassBD.php?cod_passageiro=' + passageiro.getCodigo() + "&status=" + STATUS.getCodOnLine();
                        $.get(url, function(r) {
                            //clearInterval(intervalo);	
                            window.location = "/";
                        });


                    }
                    if (varStatusCORRIDA == STATUS.getCodCorrDirCancM()) { //STATUS 1001101 = Chamando motorista Online normal
                        if (!aceito) {
                            aceito = true;
                        }
                        passageiro.setStatus(STATUS.getCodCorrDirCancM());
                        // setaStatusPassageiroNoBD(passageiro.getCodigo(),STATUS.getCodOnLine())		    		     
                        var url = '../php/setaStatusPassBD.php?cod_passageiro=' + passageiro.getCodigo() + "&status=" + STATUS.getCodOnLine();
                        $.get(url, function(r) {
                            var conteudo = "<div id='divErro'></div>";
                            mostraModal("Aviso", conteudo, false,"Fechar",function(){ window.location = "/";});
                            myAlert("divErro", "<strong>Motorista cancelou!</strong>");
                         
                        });


                    }
                    if ((!aceito) && ((corrida.getStatus() == STATUS.getCodCorrDirNAceita()) ||
                            (n * tempoSegundos >= tempoEsperarMotorista) && (corrida.getStatus() == STATUS.getCodCorrDirPas()))) {
                        clearInterval(intervalo);
                        espereCarregandoRequisicao(false);
                        if (n * tempoSegundos >= tempoEsperarMotorista) {
                            var url2 = "../php/verificaStatusMotorista.php?codigo=" + app.motorista.getCodigo();
                            $.get(url2, function(resultado) {
                                app.motorista.setStatus(resultado); //resultado deve iniciar com 1
                                //	Restaura somente se for codigo de chamada que começa com 1xxx xxxx
                                //	atraso de 2 segundos		 
                                setTimeout(restauraStatus(app.motorista.getCodigo(), app.motorista.getStatus()), 2000);
                                corrida.setCodigo(null);
                                if (!corrida.getCodigo()) {
                                    atualizaGraphMotoristas();
                                }
                            });

                            corrida.setStatus(null); // importante para passageiro poder chama ainda que tenha moto ignorado
                            corrida.setCodigo(null);
                            var conteudo = "<div id='divErro'></div>";
                            mostraModal("Aviso", conteudo, "Fechar");
                            myAlert("divErro", "Motorista não atendeu");
                        } else {
                            // restauraStatus(app.motorista.getCodigo());	//quem restaura é o AppMotorista 
                            corrida.setStatus(null); // importante para passageiro poder chama ainda que tenha moto tenha negado
                            var conteudo = "<div id='divErro'></div>";

                            mostraModal("Aviso", conteudo, "Fechar");
                            myAlert("divErro", "Motorista não está podendo fazer viagem agora)");

                        }

                    }
                    //Para corrida Normal se não encontrar motorista ou motoritsa não quiser
                    //Para corrida Normal se não encontrar motorista ou motoritsa não quiser
                    if ((!aceito) && ((corrida.getStatus() == STATUS.getCodCorrNormal()) ||
                            (corrida.getStatus() == STATUS.getCodCorrNormalNAceita()))) {
                        //Dar opcao de parar a procura

                        if (n * tempoSegundos >= tempoEsperarMotorista) { //deve ser 30
                            if (proximoMotorista < motoristas.length) {
                                var url2 = "../php/verificaStatusMotorista.php?codigo=" + app.motorista.getCodigo();
                                $.get(url2, function(resultado) {
                                    app.motorista.setStatus(resultado);
                                    //	Restaura somente se for codigo de chamada que começa com 1xxx xxxx
                                    //	atraso de 2 segundos	
                                    var codAux = app.motorista.getCodigo();
                                    var sttAux = app.motorista.getStatus();
                                    //paga o status do motorista e salvO em outro campo	
                                    //NÃO DESTRUTIVA. Ou seja, o que foi salvo continua lá até outro salvamento sobrepor.
                                    url = "../php/restauraStatusMotorista.php?cod_motorista=" + codAux;
                                    //UPDATE app_motoristas SET status = status_anterior
                                    if (sttAux[0] == '1') {
                                        $.get(url, function(resultado) {})
                                    }; // pararBuscaPorMotorista é uma varivel global modificada por espereCarregandoRequisicao()
                                    if (motoristas[proximoMotorista] && (!pararBuscaPorMotorista)) {

                                        n = 0;

                                        var nomeMotorista, apelidoMotorista, posicaoMotorista,
                                            posicaoMotoristaAnt, codMotorista;
                                        if (corrida.getStatus() == STATUS.getCodCorrDirPas()) {
                                            corrida.setStatus(null); // importante para passageiro poder chama ainda que tenha moto tenha negado	 
                                            corrida.setCodigo(null);
                                        }


                                        app.setMotorista(motoristas[proximoMotorista]); // importante lembra de jogar os dados no App
                                        nomeMotorista = motoristas[proximoMotorista].getNome();
                                        apelidoMotorista = motoristas[proximoMotorista].getApelido();
                                        posicaoMotorista = motoristas[proximoMotorista].getPosicao();
                                        codMotorista = motoristas[proximoMotorista].getCodigo();
                                        document.getElementById("IHficticio").value = motoristas[proximoMotorista].getFicticio();



                                        //Campos de Motorista qUnidade,valorUnidade,valorMinuto,margemLucro
                                        //tem que ser pegos aqui prq podem terem sido atualizados
                                        //ja seta as variáveis de sessao
                                        var url = "../php/pegaCamposConfMotorista.php?codigo=" + codMotorista;
                                        $.get(url, function(r) {
                                            var obj = JSON.parse(r);
                                            //variaveis de sessaoPHP estao com estes valores tmb	
                                            document.getElementById("IHqUnidade").value = obj.qUnidade;
                                            document.getElementById("IHvalorUnidade").value = obj.valorUnidade;
                                            document.getElementById("IHvalorMinuto").value = obj.valorMinuto;
                                            document.getElementById("IHmargemLucro").value = obj.margemLucro;

                                            corrida.setLatLngInicial(posicaoMotorista); //	  	
                                            corrida.setLatLngFinal(passageiro.getLatLngF());


                                            clearInterval(intervalo);
                                            // dENTOR DE escolheMotorigstagEspecfico ESTA ROTINA É NOVAMENTE CHAMAD

                                            if (corrida.getCodigo() && corrida.getStatus()) {
                                                escolheMotoristaEspecfico(false, STATUS.getCodChamCorrNormal(), STATUS.getCodCorrNormal(), corrida.getCodigo(), proximoMotorista);
                                            }




                                        })



                                    } else {
                                        proximoMotorista = motoristas.length;
                                    }


                                });




                            } else {
                                clearInterval(intervalo);
                                corrida.setCodigo(null);
                                corrida.setStatus(null); // importante para passageiro poder chama ainda que tenha moto tenha negado
                                // pararBuscaPorMotorista é uma varivel global modificada por espereCarregandoRequisicao()
                                if (!pararBuscaPorMotorista) {
                                    var conteudo = "<div id='divErro'></div>";
                                    mostraModal("Aviso", conteudo, "Fechar");
                                    myAlert("divErro", "Nenhum motorista nas proximidades aceitou a corrida. Tente uma corrida direta com um amigo.");

                                }

                                atualizaGraphMotoristas();
                            }
                            proximoMotorista++;
                        } //fim se 30 segundos
                        else {
                            //faz nada
                        }

                    }

                })
            }
        }, (app.getTempoEmSegundosVerificaStatusCorrida() || tempoSegundos));


    } catch (er) {
        alert("erro na function corridaGetStatubs :  " + er.message);
    }

}



function calculaCustoTotalEmPassageiro() {
    //calcula a distância efetivamente percorrida 
    //independente do destino final
    try {
        removeSessao('b'); //usado para posicao MostraTelaCorrida	
        var codigo_corrida = corrida.getCodigo();
        var url = "../php/getCoordsViagem.php";
        $.post(url,
            formataRetornaIDMotorista(app.sessao,
                "cod_corrida:" + codigo_corrida),
            function(matCood) {
                var tam = matCood.length;
                matCoord = matCood.split("|");
                matCoord[0] = matCoord[0].replace(/\{\"intinerario\":\"/ig, "");
                matCoord.pop(); //retira ultimo elemento: "\}"
                var distancia = 0;
                for (var x = 0; x < matCoord.length; x++) {
                    matCoord[x] = matCoord[x].split(",");
                    try {
                        matCoord[x] = L.latLng(matCoord[x]);
                    } catch (e) {
                        if (x > 0) {
                            matCoord[x] = matCoord[x - 1]
                        } //repete coordenada anterior se houver erro
                    }
                    if (((x + 1) != 0) && ((x + 1) % 2 == 0)) {
                        distancia += app.map.distance(matCoord[x], matCoord[x - 1]);
                        //console.log(d);
                    }
                }
                distancia = distancia / 1000; //em Quilometros
                if (document.getElementById("IHqUnidade").value) {
                    var kmPorL = Number(document.getElementById("IHqUnidade").value)
                }
                if (document.getElementById("IHvalorUnidade").value) {
                    var vlUnidComb = Number(document.getElementById("IHvalorUnidade").value)
                }
                if (document.getElementById("IHvalorMinuto").value) {
                    var vlMinuto = Number(document.getElementById("IHvalorMinuto").value)
                }
                if (document.getElementById("IHMargemLucro").value) {
                    var margemLucro = Number(document.getElementById("IHMargemLucro").value)
                }
                var tempoViagem;
                var hf = Date.parse(corrida.getHora_final());
                if (hf == null || hf == undefined || isNaN(hf)) {
                    hf = +new Date(); //se por algum motivo não vim a hora do BD
                    hf = Date.parse(hf);
                }
                var hi = Date.parse(corrida.getHora_inicial());
                var difMinutos = (hf - hi) / (1000 * 60); //em minutos	   
                if (isNaN(difMinutos) || (difMinutos == undefined)) {
                    difMinutos = 10; //10min- tempo minimo avaliar se nesse caso é melhor perguntar
                }
                tempoViagem = difMinutos;
                //limites
                if (vlUnidComb > 6) {
                    vlUnidComb = 6
                };
                if (kmPorL < 5) {
                    kmPorL = 5
                };
                if (margemLucro > 2) {
                    margemLucro = 2
                };
                if (vlMinuto > 0.8) {
                    vlMinuto = 0.8
                };



                /*******************************************************/
                var kmVl = (distancia) * (vlUnidComb / kmPorL);
                var tVl = (vlMinuto * (tempoViagem));
                var lucro = (kmVl + tVl) * margemLucro;

                var txCoop = 0;
                var txApp = 0.098;
                var tributo01 = 0;
                var tributo02 = 0;
                var tributo03 = 0;
                var tributo04 = 0;
                var ct = kmVl + tVl + lucro + txCoop +  tributo01 + tributo02 + tributo03 + tributo04;
                ct = parseFloat(ct.toFixed(2));
                ct=ct+(ct*txApp);
                if (ct < 8.00) {
                    ct = 8.00
                }
                document.getElementById("painelViagem").style.visibility = "hidden";

                corrida.valor = ct;
                corrida.tempoViagem = tempoViagem;
                corrida.distancia = distancia;

                criaAtualizaSessao('codigoCorrida', corrida.getCodigo());



                // mostraModal(titulo, conteudo,txtBtExit,
                // txtBtOk,CallBackOk,txtObs,
                // txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.	
                var conteudo = "<div class='centraliza negrito'>Valor da corrida:<span class='recebeChamada'> R$ " + ct.toFixed(2) + "</span></div>"
                mostraModal("Valor da corrida",
                    conteudo,
                    false,
                    "Recebeu pagamento",
                    fecharViagemCorrenteOk,
                    false,
                    "Problema...",
                    tratarViagemProblema,
                    false);
            })

    } catch (e1) {
        alert("Erro na funtion calculaCustoTotal" + e1.message)
    }
}


function testM(l) {
    l = L.latLng(l);
    mover(l, app.markerI);
}
//com uma so posicao
function atualizaPosicaoMotorista2(c) {
    if (c) {

        var url = "../php/getUltPosicaoMotorista.php?cod_corrida=" + c;

    } else {
        var url = "../php/getUltPosicaoMotorista.php?cod_corrida=" + corrida.getCodigo();
    }

    $.get(url,
        function(ultPos) {
            if (ultPos) {

                if (typeof(ultPos) != "object") {
                    ultPos = ultPos.split(","); //pega string transforma em matriz	
                    try {
                        ultPos = L.latLng(ultPos);
                    } catch (e) {
                        ultPos = null;
                    }

                }
                var latLngVaiBD = ultPos; //pega valor lá embaixo 

                function mover() {
                    app.getMotorista().marca.slideTo([latLngVaiBD.lat, latLngVaiBD.lng], {
                        duration: 2000,
                        keepAtCenter: true
                    });
                }


                if (latLngVaiBD) { //se vaor válido move
                    // console.log(latLngVaiBD);		
                    animationFrame(mover);
                }
                //}	
                //	 }	 
                //	 }		 
            }
        });

}; //fim function atualizaPosicaoMotorista



function tap(c) {
    atualizaPosicaoMotorista2(c);
}

function atualizaPosicaoMotorista(c) {
    var cb = new CircularBuffer(3);
    if (c) {

        var url = "../php/get3UltPosicaoMotorista.php?cod_corrida=" + c;

    } else {
        var url = "../php/get3UltPosicaoMotorista.php?cod_corrida=" + corrida.getCodigo();
    }

    $.get(url,
        function(tresUltPos) {
            if (tresUltPos) {
                var matPos = tresUltPos.split("|"); //matPos[0](posicao mais antiga),matPos[1] e matPos[2](posicao mais nova)

                for (var x = 0; x <= matPos.length - 1; x++) {
                    if (x == 0) {
                        cb.set(0, matPos[0]);
                        cb.set(1, matPos[1]);
                        cb.set(2, matPos[2]);
                    }
                    var ultLatLng = cb.get(x);
                    if (typeof(ultLatLng) != "object") {
                        ultLatLng = ultLatLng.split(","); //pega string transforma em matriz	
                        try {
                            ultLatLng = L.latLng(ultLatLng);
                        } catch (e) {
                            ultLatLng = null;
                        }

                    }
                    var latLngVaiBD; //pega valor lá embaixo 
                    function mover() {
                        app.getMotorista().marca.slideTo([latLngVaiBD.lat, latLngVaiBD.lng], {
                            duration: 2000,
                            keepAtCenter: true
                        });
                    }

                    if ((ultLatLng) && (typeof(ultLatLng) == "object")) {
                        var presente = false;
                        for (var jx = 0; jx <= 3; jx++) {
                            if (bufferCoords.get(jx)) { //	ultLatLng é objeto Leaflet					 
                                if ((bufferCoords.get(jx).lat == ultLatLng.lat) && (
                                        bufferCoords.get(jx).lng == ultLatLng.lng)) {
                                    presente = true;
                                }
                            }

                        }
                        if (!presente) {
                            latLngVaiBD = bufferCoords.get(3); // pega ultimo posicao do buffer que ficar fora 
                            var i = 3;
                            do { //joga no FIFO
                                if (i == 0) {
                                    bufferCoords.set(i, ultLatLng);
                                } else {
                                    bufferCoords.set(i, bufferCoords.get(i - 1));
                                }
                                i--;
                            } while (i >= 0);

                            if (latLngVaiBD) { //se vaor válido move
                                // console.log(latLngVaiBD);		
                                animationFrame(mover);
                            }
                        }
                    }
                }
            }
        });

}; //fim function atualizaPosicaoMotorista

function myAlert(idErroLocalMsgErro, msg) {
    var s1 = "";
    s1 += "<div class='alert alert-danger alert-dismissible fade in centraliza'>"
    s1 += "<strong>Atenção! </strong>" + msg + " ";
    s1 += " </div>"
    document.getElementById(idErroLocalMsgErro).innerHTML = s1; // em mostraModal	
    return false;
}

function setaStatusCorridaNoBD(cod_corrida, Status) {
    url = "../php/setaStatusCorrida.php?cod_corrida=" + cod_corrida + "&status=" + Status;
    $.get(url, function(resultado) {})
}

function salvaStatus(codigoMotorista, StatusQueVemdoBD) {
    //faz cópia do status setado no BD do motorista e salva em outro campo
    //Não salva status começado por 1 (chamadas)
    //Status tem que vir do BD no momeento de salvar - garantir isso antes
    if (StatusQueVemdoBD[0] != '1') {
        url = "../php/salvaStatusMotorista.php?cod_motorista=" + codigoMotorista;
        //UPDATE app_motoristas SET status_anterior = status
        $.get(url, function(resultado) {});
    }

}

function restauraStatus(codigoMotorista, StatusQueVemdoBD) {
    //paga o status do motorista e salvO em outro campo	
    //NÃO DESTRUTIVA. Ou seja, o que foi salvo continua lá até outro salvamento sobrepor.
    url = "../php/restauraStatusMotorista.php?cod_motorista=" + codigoMotorista;
    //UPDATE app_motoristas SET status = status_anterior
    if (StatusQueVemdoBD[0] == '1') {
        $.get(url, function(resultado) {

        });

    }

}

function mostraTelaFinalMotEscolhido(motorista) {
    try {
        //setGraphMotoristas(false,motorista);//(getDezMotProximos,motoristaEscolhidoDiretamente). Necessario consulda BD
        var latLngF=passageiro.getLatLngF();
        if (latLngF) {
            if (defineRotaCorrida(false)) {
                ; //defineRotaCorrida(true)RotaMotoristaBuscaPassgeiro
                defineRotaCorrida(true); //defineRotaCorrida(true)RotaMotoristaBuscaPassgeiro
            }
        }
    } catch (e) {
        alert("erro na function mostraTelaFinalMotEscolhido :  " + e.message);
    }finally {
        if (document.getElementById("btContatoPainelMotoristaEscolhido")) {
            document.getElementById("btContatoPainelMotoristaEscolhido").onclick = fChatPassageiro;
        }
        if (document.getElementById("btCancelarPainelMotoristaEscolhido")) {
            document.getElementById("btCancelarPainelMotoristaEscolhido").onclick = fCancelaPassageiro;
        }
        document.getElementById("painelMotoristaEscolhido").style.visibility = "visible";
        document.getElementById("cabPainelMotoristaEscolhido").innerHTML = "Seu motorista";
        document.getElementById("painelMotoristaEscolhido").onclick = escondeDivMotoristaEscolhido;
        document.getElementById("btDestino").style.visibility = "hidden";
        document.getElementById("nomeMotoristaEscolhido").innerHTML = motorista.getNome();
        if (motorista.getSobrenome()){
            document.getElementById("nomeMotoristaEscolhido").innerHTML+=' '+motorista.getSobrenome();
        }
        if (!passageiro.getLogin()) {
            document.getElementById("avisoSimulacao").style.visibility = "visible";
        }
        
     }

}


function onMouseOutMarcaMotorista() {
    //
}

function onLocationError(erro) {
    var titulo, conteudo;
    titulo = "Erro ao localizar!";
    if (erro.code == 1) {
        conteudo = "Localização só é possível com protocolo https.<br/> Digite na frente do endereco da página <em>https://</em> e <br/> permita a localização quando for perguntado."
    } else {
        conteudo = erro.message + " " + erro.code;
    }

    //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel)
    mostraModal(titulo, conteudo, "Fechar");
}

function showIdioma() {
    var jm = document.getElementById("janelaModal");
    document.getElementById("tituloJanelaModal").innerHTML = "";
    document.getElementById("tituloJanelaModal").innerHTML = "Idioma";
    $(jm).modal('show');
    constroiIdiomaModal();
}

function constroiIdiomaModal(pJm) {


    var s1 = "<form><div class='form-group'><label for='iViagem'>Endereço do início da viagem:</label>";
    s1 += "<input type='text' class='form-control' id='iViagem' " + iniViagem + ">";
    s1 += "</div> <div class='form-group'> <label for='fViagem'>Destino:</label>";
    s1 += "<input type='text' class='form-control' id='fViagem' placeholder='Destino da viagem aqui'></div>";
    s1 += "<div id='btBuscarMotorista'><button type='button' class='btn btn-primary'>Buscar motorista</button>";
    s1 += "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>	  </form>";



    document.getElementById("conteudoModal").innerHTML = "";

    document.getElementById("conteudoModal").innerHTML = s1;




}

function setAltImgs() {


}

function escondeDivMotoristaEscolhido() {
    try {
        var elem = document.getElementById("painelMotoristaEscolhido");
        var elemInterno = document.getElementById("conteudoPainelMotoristaEscolhido");
        var b = 0;
        //alert(b);
        if (elem.style.bottom == '0px') {
            function deslocamento() {
                b -= 10;
                // aplicando estilo no elemento   
                elem.style.bottom = b + 'px';
                // verificando se chegou ao ponto desejado
                if (elemInterno.offsetHeight <= Math.abs(b))
                    // interrompe o processo de deslocamento 
                    clearInterval(id);
            }
            var id = setInterval(deslocamento, 1);
        } else {
            elem.style.bottom = '0' + 'px';
        }
    } catch (e) {
        alert("Erro na funcao escondeDivMotoristaEscolhido " + e.message)
    }
}


/* corrida direta */


function associa() {
    document.getElementById("fViagem").onkeyup = pegaSugestaoEndViagem;
    document.getElementById("sugDest").onchange = atualEndViagem;
}

function fEscolhaMotorista() {
    if (document.getElementById("login")) {
        var motoristas = [];
        var raioChamDir = document.getElementById("IHraioChamDir").value;
        var selecaoAmizade = document.getElementById("IHidFiltroSoAmigos").value;
       
        var latLng = passageiro.getLatLngI();

        var titulo, evento, vLatLng;

        var s1 = "<h4 class='centraliza'>Do mais próximo ao mais distante</h4>";
        espereCarregandoRequisicao(true, "Um momento...");

        if (!corrida.getCodigo()) {
            var url = "../php/buscarMotoristas.php";
            url += "?codPassageiro=" + passageiro.getCodigo() + "&condAmizade=" + selecaoAmizade + "&raioChamDir=" + raioChamDir + "&lat=" + latLng.lat + "&lng=" + latLng.lng + "&status=" + STATUS.getCodOnLine();
            $.get(url, function(r) {
                r = JSON.parse(r);
                for (var x = 0; x < r.motoristas.length; x++) {
                    motoristas.push(r.motoristas[x]);
                }

                s1 += ' <div class="table-responsive">';
                //s1+='<h2></h2>';

                s1 += '<table class="table table-hover">';
                s1 += '<thead>';
                s1 += '<tr> <th>Nome</th> <th>Dist aprox</th><!-- <th>Vl Km (R$)</th> <th>Vl Min (R$)</th> --></tr>';
                s1 += '</thead>';
                s1 += '<tbody>';
                //alert(motoristas);

                for (var k = 0; k < motoristas.length; k++) {

                    // uma linha com quatro colunas
                    s1 += ' <tr onclick="chamaOnDbClickMarcaMotorista(' + k + ');">';
                     
                     var url_avatarMotoristaFace=String(motoristas[k].url_avatar);
                     
                    if (motoristas[k].id_facebook){//solução só funciona prq o face ta suspenso
                        
                       
                        //solução só funciona prq o face ta suspenso. Tirar: https://ttm.drmoisessantos.com/
                        
                        s1 += '<td> <img src="https://ttm.drmoisessantos.com/'+ url_avatarMotoristaFace +'" alt="(F)" width="25px" height="25px" >&nbsp; ' + motoristas[k].nome+' '+motoristas[k].sobrenome +'<input type="hidden" id='+motoristas[k].codigo+'>&nbsp;&nbsp;<img id="imgAmizadeFace" src="../imgs/iconeFace.png" alt="(F)" width="15px" height="15px" ></td>';
                    }else{
                        if ((url_avatarMotoristaFace!=undefined)&&(url_avatarMotoristaFace.trim()!="")){
                             s1 += '<td> <img src="https://ttm.drmoisessantos.com/'+ url_avatarMotoristaFace +'" alt="(F)" width="25px" height="25px" >&nbsp; ' + motoristas[k].nome +' '+motoristas[k].sobrenome+'&nbsp;&nbsp;</td>';  
                        }else{
                            s1 += '<td> ' + motoristas[k].nome +' '+motoristas[k].sobrenome+'&nbsp;&nbsp;</td>';  
                        }
                      
                    }
                  var aux=motoristas[k].Dist;
                  s1+=' <td>' + 2*(aux/1).toFixed(0) + 'Km'+'</td>';
                   // var aux=(motoristas[k]c.valorUnidade / motoristas[k].qUnidade);
                   // s1 += ' <td>' + aux.toFixed(1) + '</td>';
                    //s1 += '   <td>' + motoristas[k].valorMinuto + '</td>';

                    s1 += ' </tr> ';
                    //
                }
                s1 += ' </tbody>  </table> </div>';


                if (selecaoAmizade == 'soAmigos') {

                    titulo = "<h3>Motoristas disponíveis - somente amigos</h3>"
                } else {
                    if(selecaoAmizade == 'incluirAmigosFace'){
                        titulo = "<h3>Motoristas disponíveis - somente amigos incluindo os do Facebook</h3>"
                    }
                     else{
                      titulo = "<h3>Motoristas disponíveis - todos </h3>"     
                     }
                     
                    
                }


                conteudo = s1;
                if (!motoristas.length) {
                    conteudo = '<p class="centraliza">Sem motorista com esse critério.</p>';
                }

                //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.	
                mostraModal(titulo, conteudo, "Fechar", false, false, "Analise o motorista mais adequado", false, false, false,false,false,"../imgs/blcMedePapai2020.jpeg");
                espereCarregandoRequisicao(false);



                //tempo mínimo necessário para atualizar a mariz motorista devido alguma operacao assicrona
            });

        }

    } else {
        verTelaLogin() ;
       // cam(); rotina para chamada via imagem
    }
}

function chamaOnDbClickMarcaMotorista(k) {
    vLatLng = motoristas[k].lat + "," + motoristas[k].lng;
    vLatLng = vLatLng.split(",");
    vLatLng = L.latLng(vLatLng);
    evento = {
        latlng: vLatLng
    };
    onDbClickMarcaMotorista(evento);
}

function confDistChamDireta() {
    if (document.getElementById("login")) {
        var raioChamDir = document.getElementById("IHraioChamDir").value;
        var selecaoAmizade = document.getElementById("IHidFiltroSoAmigos").value;

        var s1 = "<p class='centraliza'><label for='newRChamDir'>Distância do Motorista em Chamada Direta:</label><input size='4' type='text' id='newRChamDir' value='" + raioChamDir + "'> (km)</p>";
         
        if (selecaoAmizade == 'soAmigos') {
            s1 += "<div class='panel panel-default'>    <div class='panel-body'><p class='centraliza'><input  checked id='idFiltroSoAmigos' value='soAmigos' type='checkbox' >  <label for='sma'> Somente Motoristas Amigos (Mamigos)</label></p>";
        } else {
            s1 += "<div class='panel panel-default'>    <div class='panel-body'><p class='centraliza'><input  id='idFiltroSoAmigos' value='todos' type='checkbox' >  <label for='sma'> Somente Motoristas Amigos (Mamigos)</label></p>";
        }
        s1+="<p class='centraliza'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input  checked id='idIncluirAmigosFace' value='incluirAmigosFace' type='checkbox' disabled>  <label for='sma'>Incluir amigos do Facebook (Mamigos)</label><em>(Suspenso)</em></p></div></div>"
 
            //enable<->disabled
          //incluirAmigosFace inclui soAmigos


        conteudo = s1;
        //mostraModal(titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.	
        mostraModal("Configurações", conteudo, "Fechar", "OK", setaConfiguracoes, "Configure a distância máxima que o TT buscará motoristas", false, false, false);

    } else {
        verTelaLogin();
    }
}

function situacaoAmizade(codPassageiro, codMotorista) {
    try {
        var url = '../php/situacaoDeAmizade.php?codPassageiro=' + codPassageiro + "&codMotorista=" + codMotorista;
        $.get(url, function(resultado) {
            // alert(resultado);
            
            if (resultado.trim() == '1') { //trim retira espaco e caracteres especiais
                $('#btAmizade').text('Mamigo');
                $('#btAmizade').prop('class', 'btn btn-success');
                $('#btAmizade').click(function() {
                    alternaAmizadePara(0, codPassageiro, codMotorista)
                });

            } else {
                $('#btAmizade').text('Fazer amizade');
                $('#btAmizade').prop('class', 'btn btn-warning');
                $('#btAmizade').click(function() {
                    alternaAmizadePara(1, codPassageiro, codMotorista)
                });


            }
        })
        //alert(r);
        //return r.responseText.trim();//retorna 0 se não sao amigo
    } catch (e) {
        alert("erro na function amigos :  " + e.message);
    }
}

function alternaAmizadePara(amizade, codPassageiro, codMotorista) {
    if (passageiro.getLogin()) {
        var url = "../php/altAmizade.php?amizade=" + amizade + "&codPassageiro=" + codPassageiro + "&codMotorista=" + codMotorista;
        //(url,txtEspera,functionCallBack)
        ajaxGetTT(url, "um momento...", function(resultado) {
            //alert(resultado);
            $("#btAmizade").prop("onclick", null).off("click");
            if (resultado.trim() == '1') { //trim retira espaco e caracteres especiais
                $('#btAmizade').text('Mamigo');
                $('#btAmizade').prop('class', 'btn btn-success');
                $('#btAmizade').click(function() {
                    alternaAmizadePara(0, codPassageiro, codMotorista)
                });
            } else {
                $('#btAmizade').text('Fazer amizade');
                $('#btAmizade').prop('class', 'btn btn-warning');
                $('#btAmizade').click(function() {
                    alternaAmizadePara(1, codPassageiro, codMotorista)
                });
            }

        });
        //$.get(url,); 


    } else {
        verTelaLogin()
    }
}


function onDbClickMarcaMotorista(e) {
    try {
        var nomeMotorista, apelidoMotorista, posicaoMotorista,
            posicaoMotoristaAnt, codMotorista;
        corrida.setStatus(null); // importante para passageiro poder chama ainda que tenha moto tenha negado
        for (var x = 0; x < motoristas.length; x++) {
            var errolat = Math.abs(e.latlng.lat * 1852 * 60 - (motoristas[x].lat * 1852 * 60)); //<0,0001
            var errolng = Math.abs(e.latlng.lng * 1852 * 60 - (motoristas[x].lng * 1852 * 60));


            if ((errolat <= 0.0001) && (errolng <= 0.0001)) {
                app.setMotorista(motoristas[x]); // importante lembra de jogar os dados no App
                nomeMotorista = motoristas[x].getNome()+' '+ motoristas[x].getSobrenome();
                apelidoMotorista = motoristas[x].getApelido();
                posicaoMotorista = motoristas[x].getPosicao();
                codMotorista = motoristas[x].getCodigo();
                document.getElementById("IHficticio").value = motoristas[x].getFicticio();


                //Campos de Motorista qUnidade,valorUnidade,valorMinuto,margemLucro
                //tem que ser pegos aqui prq podem terem sido atualizados
                //ja seta as variáveis de sessao
                var url = "../php/pegaCamposConfMotorista.php?codigo=" + codMotorista;
                $.get(url, function(r) {
                    var obj = JSON.parse(r);
                    //variaveis de sessaoPHP estao com estes valores tmb	
                    document.getElementById("IHqUnidade").value = obj.qUnidade;
                    document.getElementById("IHvalorUnidade").value = obj.valorUnidade;
                    document.getElementById("IHvalorMinuto").value = obj.valorMinuto;
                    document.getElementById("IHmargemLucro").value = obj.margemLucro;
                })

            }
        }

        s1 = "<spam class='col-md-4' for='Nome'>Nome:</spam>" + nomeMotorista + "</br> ";
        if (apelidoMotorista) {
            s1 += " <spam class='col-md-4 ' for='apelido'>Pode chamar de: </spam>" + apelidoMotorista + "</br> ";
        }
        s1 += "<spam class='col-md-4 ' for='foto'>Foto do motorista: </spam>";
        //aqui app.motorista existe
        if (app.motorista.getUrl_avatar()) {
            s1 += "<img id='imgFotoMot' class='foto' src='https://ttm.drmoisessantos.com/" + app.motorista.getUrl_avatar() + "'>";
              
        } else {
            s1 += "<img id='imgFotoMot' class='foto' src='https://ttm.drmoisessantos.com/imgs/uploads/sf.png'>";
            
        }

        s1+=" <script>you.avatar = document.getElementById('ImgFotoMot').src;</script> ";


        s1 += "</br><spam class='col-md-4 ' for='viagensRealizadas'>Viagens realizadas:</spam>";


        s1 += "</br></br></br><label class='col-md-4 control-label' for='fViagem'>Destino:</label>"
        s1 += "<div class='form-group col-md-8'> ";

        corrida.setLatLngInicial(posicaoMotorista); //

        if (passageiro.getEndFinal().trim() != "") {
            var txtEndFinal = passageiro.getEndFinal();

            s1 += "<input value='" + txtEndFinal + "' name='finalViagem' type='text' AUTOCOMPLETE='off' oninput='associa()' class='form-control input-md' data-width='70%' id='fViagem' placeholder='Destino da viagem aqui'>";
            atualEndViagem();
        } else {

            s1 += "<input name='finalViagem' type='text' AUTOCOMPLETE='off' oninput='associa()' class='form-control input-md' data-width='70%' id='fViagem' placeholder='Destino da viagem aqui'>";
        }
        s1 += "</div></br><div class='form-group col-md-4'>";
        s1 += "<select   class='sugDestDireto'  id='sugDest' size='5'>";

        s1 += "</select></div>";
        s1 += "<div id='msgErro'></div>  ";
        s1 += "<div id='valorEDistacias'>  ";
        s1 += " <div id='distancias'><p id='dist' class='centraliza'></p></div>";
        s1 += " <div ><p class='centraliza' id='tempos'></p></div>";
        s1 += " <div><p class='centraliza' id='valorViagem'></p></div>";

        var titulo = "Dados do motorista"
        var validoEmCidade=cityAutoPassageiro();//retorna nome da cidade ou false
        if (validoEmCidade){} titulo+=" - Corridas dentro de "+validoEmCidade;
        if ((app.motorista.getFicticio()=='1')||(app.motorista.getFicticio()==1)) {
            titulo = "Dados do motorista - MOTORISTA FICTÍCIO"
        }

        //corrida.latLngBusca é setada quando da localizacao
        //corrida.latLngFinal (destino passageiro) é conseguido aqui
        corrida.setLatLngFinal(passageiro.getLatLngF());

        //titulo, conteudo,txtBtExit,txtBtOk,CallBackOk,txtObs,txtBtCancel,CallBackCancel,urlFormPost){//se txtBtOk não for passado o botão ok não aparece.
        if (!(document.getElementById(codMotorista))){
            //solucao temporária hidden com id igual código motorista preenchido quendo da escolha pelo menu rapido
          var btAmizade = true;    
        }else{
          var btAmizade = false;    
        }
        
        
        
        mostraModal(titulo, s1, "Fechar", "Chamar este motorista*", escolheMotoristaEspecfico, "</br>*Chame quem você conhece.", false, false, false, btAmizade, app.motorista); //se txtBtOk não for passado o botão ok não aparece.
      
             
      
    } catch (er) {
        alert("Erro na funcao onDbClickMarcaMotorista " + er.message)
    }

}

function escolheMotoristaEspecfico(evento, tipoCHAMADA, tipoCORRIDA, codCorridaJaInserida, proximoMotorista) {
    try {

        if (!passageiro.getLatLngF()) {
            var s1 = "";
            s1 += "<div class='alert alert-danger alert-dismissible fade in'>"
            s1 += "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a>";
            s1 += "<strong>Atenção!</strong> Preencha os campos selecionando as sugestões apresentadas!";
            s1 += " </div>"
            document.getElementById("msgErro").innerHTML = s1; // em mostraModal	
            return false;
        } else {

            espereCarregandoRequisicao(true, "Um momento...")
            var jm = document.getElementById("janelaModal");
            var motoristaEscolhidoDiretamente = app.getMotorista(); //motorista setado em onDbClickMarcaMotorista ou getDadosMotMaisPerto
            //setaStatusComoChamando tambem cria registro inicial da Corrida e retorna o código da mesma
            //corrida.setStatus(STATUS.getCodChamDirPas());

            var url = "";

            $(jm).modal('hide');
            //  alert("Posicao Motorista: "+motoristaEscolhidoDiretamente.getPosicao()); 
            //Atencao formato de posicao é varchar "lat,log" 
            //não é o formato LatLng do Leaflet [lat,lng]
            //entao formato de latLngInicial é varchar "lat,log"
            //seta no formato latLng do leaflet em 26/07/2018

            corrida.setLatLngInicial(motoristaEscolhidoDiretamente.getPosicao()); //necessário aqui para DEMO

            if (passageiro.getLogin()) { //so seta se estive logado

                url = "../php/verificaStatusMotorista.php?codigo=" + motoristaEscolhidoDiretamente.getCodigo();

                $.get(url, function(resultado) {
                    var statusMotorista = resultado;
                    if (statusMotorista == STATUS.getCodOnLine()) { // so seta se motorista escolhido tiver online

                        corrida.setMotorista(motoristaEscolhidoDiretamente.getCodigo());
                        salvaStatus(corrida.getMotorista(), statusMotorista); //IMPORTANTE salvamento 001
                        app.motorista.setStatus(statusMotorista);
                        //$_SESSION['codigoCorrida'] definda no arquivo abaixo
                        if (!codCorridaJaInserida) {
                            var urlBase = "../php/insereCorrida.php";
                            url = "";
                        } else {
                            var urlBase = "../php/atualizaCorrida.php?codigoCorrida=" + codCorridaJaInserida;
                            url = "";
                        }


                        if (tipoCORRIDA) {
                            corrida.setStatus(tipoCORRIDA); //passrá p/ tipoCorrida	tipo da corrida
                        } else {
                            corrida.setStatus(STATUS.getCodCorrDirPas())
                        }; //passrá p/ getCodCorrDirPas()	}
                        if (!codCorridaJaInserida) {
                            url += "?statusCorrida=" + corrida.getStatus();
                        } else {
                            url += "&statusCorrida=" + corrida.getStatus();
                        }

                        corrida.setLatLngFinal(passageiro.getLatLngF());

                        //alert("Local embarque: "+passageiro.getLatLngI());
                        corrida.setLatLngBusca(passageiro.getLatLngI());

                        corrida.setPassageiro(passageiro.getCodigo());

                        if (tipoCHAMADA) {
                            corrida.setStatus(tipoCHAMADA); //passrá p/ getCodCorrNormal()	- SO NA RAM
                        } else {
                            corrida.setStatus(STATUS.getCodChamDirPas())
                        }; //passrá p/ getCodCorrDirPas()	}


                        corrida.nomePassageiro = passageiro.getLogin(); //o login não é muito relevante é o de verdade

                        passageiro.fone = document.getElementById("IHcelular").value;

                        corrida.contato_pas = (passageiro.fone);
                        vContato_pas = corrida.contato_pas;

                        var vLat = String(corrida.getLatLngFinal().lat);
                        //alert(vLat);
                        vLat = vLat.slice(0, 10);
                        var vLng = String(corrida.getLatLngFinal().lng);
                        vLng = vLng.slice(0, 10);

                        url += "&latLngFinal=" + vLat + "," + vLng;

                        var latLngI = corrida.getLatLngInicial();
                        if (typeof(latLngI) != "object") {
                            latLngI = latLngI.split(","); //pega string transforma em matriz			   
                            latLngI = L.latLng(latLngI);
                        }
                        vLat = String(latLngI.lat);
                        vLng = String(latLngI.lng);


                        url += "&latLngInicial=" + vLat + "," + vLng;

                        vLat = String(corrida.getLatLngBusca().lat);
                        vLat = vLat.slice(0, 10);
                        vLng = String(corrida.getLatLngBusca().lng);
                        vLng = vLng.slice(0, 10);

                        url += "&latLngBusca=" + vLat + "," + vLng;

                        url += "&cod_passageiro=" + corrida.getPassageiro(); //SOMENTE O CÓDIGO DO PASSAGEIRO
                        url += "&nome_passageiro=" + corrida.nomePassageiro;
                        url += "&cod_motorista=" + corrida.getMotorista(); //SOMENTE O CÓDIGO DO MOTORISTA

                        vLat = String(corrida.getSetagemInicial().lat);
                        vLat = vLat.slice(0, 10);
                        vLng = String(corrida.getSetagemInicial().lng);
                        vLng = vLng.slice(0, 10);




                        url += "&setagemInicial=" + vLat + "," + vLng;

                        var vEndOrigem = passageiro.getEndOrigem();
                        //vEndOrigem=encodeURI(vEndOrigem);

                        url += "&endEmbarque=" + vEndOrigem;

                        var vEndFinal = passageiro.getEndFinal();
                        //vEndFinal=encodeURI(vEndFinal);

                        url += "&endFinalDeclarado=" + vEndFinal;

                        //console.log(vEndOrigem+"<-enderecos->"+vEndFinal);
                        url += "&contato_pas=" + vContato_pas;

                        url += "&ctEstimado=" + corrida.getCtEstimado();

						var selecaoAmizade = document.getElementById("IHidFiltroSoAmigos").value;
						if (selecaoAmizade=='soAmigos'){
							url += "&amigos=1";//eram amigos no momento da viagem
						}else{
                            url += "&amigos=0";//NAO eram amigos no momento da viagem
                        }

                        $.get(urlBase + url, function(resultado2) { //INSERE OU ATUALIZA CORRIDA EM BD
                            if (!codCorridaJaInserida) {
                                corrida.setCodigo(resultado2); //CÓDIGO DA CORRIDA
                            } else {
                                corrida.setCodigo(codCorridaJaInserida); //CÓDIGO DA CORRIDA
                            }



                            urlBase = "../php/setaStatusComoChamando.php"; //do Motorista no BD do Motorista e CAMPO corrida_corrente
                            url = ""; //Reseta url - IMPORTANTE
                            if (tipoCHAMADA) {
                                corrida.setStatus(tipoCHAMADA); //passrá p/ getCodCorrDirPas()	
                                url += "?statusChamado=" + tipoCHAMADA;
                            } else {
                                corrida.setStatus(STATUS.getCodChamDirPas())
                                url += "?statusChamado=" + STATUS.getCodChamDirPas();
                            }; //passrá p/ getCodCorrDirPas()	}


                            url += "&cod_motorista=" + corrida.getMotorista(); //codigo do motorista
                            url += "&cod_corrida=" + corrida.getCodigo();
                            //Atualiza status motorista para chamaNdo e CAMPO corrida_corrente:

                            $.get(urlBase + url, function(resultado) {
                                // Depois de setar o motorista como chamando, insere codigo corrida corrente na tabela do passageiro
                                urlBase = "../php/setCorrCorentePassageiro.php";
                                url = ""; //Reseta url - IMPORTANTE
                                url += "?cod_passageiro=" + passageiro.getCodigo(); //codigo do passageiro
                                url += "&cod_corrida=" + corrida.getCodigo();
                                $.get(urlBase + url, function(resultado) {
                                    //nada
                                });
                            });


                            espereCarregandoRequisicao(false);
                            if (corrida.getStatus() != STATUS.getCodCorrDirPas) {
                                corridaGetStatus(3, proximoMotorista);
                            } else {
                                corridaGetStatus(3);
                            }




                        }); //cuidado! Não remover } e );
                    }
                    if ((STATUS.getCodCorrDirPas() == corrida.getStatus() ||
                            STATUS.getCodChamDirPas() == corrida.getStatus()) && (corrida.getCodigo == null)) {
                        var mensagem = "<strong>Motorista parece não está mais online!</strong>";
                        mostraDialogo(mensagem, "warning", 1500);

                        //alert("Motorista parece não está mais online");
                        acheme();
                    }

                }); //cuidado! Não remover }, } e );
            } else {
                mostraTelaFinalMotEscolhido(motoristaEscolhidoDiretamente);
            }
        }
    } catch (e) {
        alert("Erro na Function escolheMotoristaEspecfico" + e.message)
    }
}

function onMouseOverMarcaMotorista() {
    //marca.
}

/* corrida tradicional */


function showFazerViagem() {
    try {
        var jm = document.getElementById("janelaModal");
        document.getElementById("tituloJanelaModal").innerHTML = "";
        document.getElementById("tituloJanelaModal").innerHTML = "Fazer viagem - <em>Ainda não disponível POR AQUI</em><br><em class='avisoSimulacao'>Somente CHAMADA DIRETA: </br>Dê um duplo clique em um motorista. </br>Ou use o botão Rápido.</em>";
        getDadosMotMaisPerto(); //equivale a funcao onDbClickMarcaMotorista de chamada direta
        $(jm).modal('show');
        constroiContModal();
    } catch (e) {
        alert("erro na function showFazerViagem :  " + e.message);
    }


}

function getDadosMotMaisPerto(classificacaoMot) {
    try {
        if (!classificacaoMot) {
            var classificacaoMot = 0;
        }
        var nomeMotorista, apelidoMotorista, posicaoMotorista,
            posicaoMotoristaAnt, codMotorista;
        corrida.setStatus(null); // importante para passageiro poder chama ainda que tenha moto tenha negado

        app.setMotorista(motoristas[classificacaoMot]); // importante lembra de jogar os dados no App
        nomeMotorista = motoristas[classificacaoMot].getNome();
        apelidoMotorista = motoristas[classificacaoMot].getApelido();
        posicaoMotorista = motoristas[classificacaoMot].getPosicao();
        codMotorista = motoristas[classificacaoMot].getCodigo();
        document.getElementById("IHficticio").value = motoristas[classificacaoMot].getFicticio();


        //Campos de Motorista qUnidade,valorUnidade,valorMinuto,margemLucro
        //tem que ser pegos aqui prq podem terem sido atualizados
        //ja seta as variáveis de sessao
        var url = "../php/pegaCamposConfMotorista.php?codigo=" + codMotorista;
        $.get(url, function(r) {
            var obj = JSON.parse(r);
            //variaveis de sessaoPHP estao com estes valores tmb	
            document.getElementById("IHqUnidade").value = obj.qUnidade;
            document.getElementById("IHvalorUnidade").value = obj.valorUnidade;
            document.getElementById("IHvalorMinuto").value = obj.valorMinuto;
            document.getElementById("IHmargemLucro").value = obj.margemLucro;
        })


        corrida.setLatLngInicial(posicaoMotorista); //	  	
        corrida.setLatLngFinal(passageiro.getLatLngF());


    } catch (er) {
        alert("Erro na funcao getDadosMotMaisPerto " + er.message)
    }

}

function constroiContModal(pJm) {
    try {
        var iniViagem = passageiro.getEndOrigem();

        if (iniViagem == "") {

            iniViagem = " placeholder='Início da viagem aqui' ";

        } else {

            iniViagem = "value='" + iniViagem + "'";

        }


        //resolver problema autocompletar do chrome
        var s1 = "<form id='fModal1'><div class='form-group'><label for='iViagem'>Endereço do início da viagem:</label>";

        s1 += "<input type='text' AUTOCOMPLETE='off' class='form-control' id='iViagem' " + iniViagem + ">";

        s1 += "</div> <div class='form-group'> <label for='fViagem'>Destino:</label>";


        s1 += "<input name='finalVigaem' type='text' class='form-control' data-width='100%' id='fViagem' placeholder='Destino da viagem aqui' AUTOCOMPLETE='off'>";

        s1 += "<select class='form-control'  id='sugDest' size='5'>";
        // s1+="<option value='Escolha endereço mais próximo...' selected>Escolha endereço mais próximo AQUI...</option>";
        s1 += "</select></div>";

        s1 += "<br /><button id='btBuscarMotorista' type='button' class='btn btn-primary'>Buscar motorista</button>";

        s1 += "<button id='btFechar' type='button' class='btn btn-secondary' data-dismiss='modal'>Fechar</button></div>";
        s1 += "<div id='msgErro'></div><br/></form>";

        s1 += "<div id='valorEDistacias'>  ";
        s1 += " <div id='distancias'><p class='centraliza' id='dist'></p></div>";
        s1 += " <div ><p class='centraliza' id='tempos'></p></div>";
        s1 += " <div><p class='centraliza' id='valorViagem'></p></div>";

        document.getElementById("conteudoModal").innerHTML = "";

        document.getElementById("conteudoModal").innerHTML = s1;
        //alert(s1);
        // document.getElementById("iViagem").onfocus=showEndInicial;
        jQuery('iViagem').attr('autocomplete', 'off');
        jQuery('fViagem').attr('autocomplete', 'off');
        document.getElementById("iViagem").onkeyup = pegaSugestaoEndViagem;
        document.getElementById("fViagem").onkeyup = pegaSugestaoEndViagem;
        document.getElementById("sugDest").onchange = atualEndViagem;
        document.getElementById("btBuscarMotorista").onclick = buscarMotorista;


    } catch (e) {
        alert("erro na function constroiContModal :  " + e.message);
    }
}

/* Funcoes utilitarias */


function tiraAcentos(p) {
    try {
        //var charMap = {"0":"0","1":"1","2":"2","3":"3","4":"4","5":"5","6":"6","7":"7","8":"8","9":"9","A":"A","B":"B","C":"C","D":"D","E":"E","F":"F","G":"G","H":"H","I":"I","J":"J","K":"K","L":"L","M":"M","N":"N","O":"O","P":"P","Q":"Q","R":"R","S":"S","T":"T","U":"U","V":"V","W":"W","X":"X","Y":"Y","Z":"Z","a":"a","b":"b","c":"c","d":"d","e":"e","f":"f","g":"g","h":"h","i":"i","j":"j","k":"k","l":"l","m":"m","n":"n","o":"o","p":"p","q":"q","r":"r","s":"s","t":"t","u":"u","v":"v","w":"w","x":"x","y":"y","z":"z","ª":"a","²":"2","³":"3","¹":"1","º":"o","À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","Ç":"C","È":"E","É":"E","Ê":"E","Ë":"E","Ì":"I","Í":"I","Î":"I","Ï":"I","Ð":"D","Ñ":"N","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","Ù":"U","Ú":"U","Û":"U","Ü":"U","Ý":"Y","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","ç":"c","è":"e","é":"e","ê":"e","ë":"e","ì":"i","í":"i","î":"i","ï":"i","ð":"d","ñ":"n","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","ù":"u","ú":"u","û":"u","ü":"u","ý":"y","ÿ":"y","Ā":"A","ā":"a","Ă":"A","ă":"a","Ą":"A","ą":"a","Ć":"C","ć":"c","Ĉ":"C","ĉ":"c","Ċ":"C","ċ":"c","Č":"C","č":"c","Ď":"D","ď":"d","Đ":"D","đ":"d","Ē":"E","ē":"e","Ĕ":"E","ĕ":"e","Ė":"E","ė":"e","Ę":"E","ę":"e","Ě":"E","ě":"e","Ĝ":"G","ĝ":"g","Ğ":"G","ğ":"g","Ġ":"G","ġ":"g","Ģ":"G","ģ":"g","Ĥ":"H","ĥ":"h","Ħ":"H","ħ":"h","Ĩ":"I","ĩ":"i","Ī":"I","ī":"i","Ĭ":"I","ĭ":"i","Į":"I","į":"i","İ":"I","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","Ĺ":"L","ĺ":"l","Ļ":"L","ļ":"l","Ľ":"L","ľ":"l","Ŀ":"L","ŀ":"l","Ł":"L","ł":"l","Ń":"N","ń":"n","Ņ":"N","ņ":"n","Ň":"N","ň":"n","Ō":"O","ō":"o","Ŏ":"O","ŏ":"o","Ő":"O","ő":"o","Ŕ":"R","ŕ":"r","Ŗ":"R","ŗ":"r","Ř":"R","ř":"r","Ś":"S","ś":"s","Ŝ":"S","ŝ":"s","Ş":"S","ş":"s","Š":"S","š":"s","Ţ":"T","ţ":"t","Ť":"T","ť":"t","Ũ":"U","ũ":"u","Ū":"U","ū":"u","Ŭ":"U","ŭ":"u","Ů":"U","ů":"u","Ű":"U","ű":"u","Ų":"U","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","ź":"z","Ż":"Z","ż":"z","Ž":"Z","ž":"z","ſ":"s","Ơ":"O","ơ":"o","Ư":"U","ư":"u","Ǎ":"A","ǎ":"a","Ǐ":"I","ǐ":"i","Ǒ":"O","ǒ":"o","Ǔ":"U","ǔ":"u","Ǖ":"U","ǖ":"u","Ǘ":"U","ǘ":"u","Ǚ":"U","ǚ":"u","Ǜ":"U","ǜ":"u","Ǟ":"A","ǟ":"a","Ǡ":"A","ǡ":"a","Ǧ":"G","ǧ":"g","Ǩ":"K","ǩ":"k","Ǫ":"O","ǫ":"o","Ǭ":"O","ǭ":"o","ǰ":"j","Ǵ":"G","ǵ":"g","Ǹ":"N","ǹ":"n","Ǻ":"A","ǻ":"a","Ǿ":"O","ǿ":"o","Ȁ":"A","ȁ":"a","Ȃ":"A","ȃ":"a","Ȅ":"E","ȅ":"e","Ȇ":"E","ȇ":"e","Ȉ":"I","ȉ":"i","Ȋ":"I","ȋ":"i","Ȍ":"O","ȍ":"o","Ȏ":"O","ȏ":"o","Ȑ":"R","ȑ":"r","Ȓ":"R","ȓ":"r","Ȕ":"U","ȕ":"u","Ȗ":"U","ȗ":"u","Ș":"S","ș":"s","Ț":"T","ț":"t","Ȟ":"H","ȟ":"h","Ȧ":"A","ȧ":"a","Ȩ":"E","ȩ":"e","Ȫ":"O","ȫ":"o","Ȭ":"O","ȭ":"o","Ȯ":"O","ȯ":"o","Ȱ":"O","ȱ":"o","Ȳ":"Y","ȳ":"y","ʰ":"h","ʲ":"j","ʳ":"r","ʷ":"w","ʸ":"y","ˡ":"l","ˢ":"s","ˣ":"x","ͣ":"a","ͤ":"e","ͥ":"i","ͦ":"o","ͧ":"u","ͨ":"c","ͩ":"d","ͪ":"h","ͫ":"m","ͬ":"r","ͭ":"t","ͮ":"v","ͯ":"x","٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9","۰":"0","۱":"1","۲":"2","۳":"3","۴":"4","۵":"5","۶":"6","۷":"7","۸":"8","۹":"9","߀":"0","߁":"1","߂":"2","߃":"3","߄":"4","߅":"5","߆":"6","߇":"7","߈":"8","߉":"9","०":"0","१":"1","२":"2","३":"3","४":"4","५":"5","६":"6","७":"7","८":"8","९":"9","০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","੦":"0","੧":"1","੨":"2","੩":"3","੪":"4","੫":"5","੬":"6","੭":"7","੮":"8","੯":"9","૦":"0","૧":"1","૨":"2","૩":"3","૪":"4","૫":"5","૬":"6","૭":"7","૮":"8","૯":"9","୦":"0","୧":"1","୨":"2","୩":"3","୪":"4","୫":"5","୬":"6","୭":"7","୮":"8","୯":"9","௦":"0","௧":"1","௨":"2","௩":"3","௪":"4","௫":"5","௬":"6","௭":"7","௮":"8","௯":"9","౦":"0","౧":"1","౨":"2","౩":"3","౪":"4","౫":"5","౬":"6","౭":"7","౮":"8","౯":"9","౸":"0","౹":"1","౺":"2","౻":"3","౼":"1","౽":"2","౾":"3","೦":"0","೧":"1","೨":"2","೩":"3","೪":"4","೫":"5","೬":"6","೭":"7","೮":"8","೯":"9","൦":"0","൧":"1","൨":"2","൩":"3","൪":"4","൫":"5","൬":"6","൭":"7","൮":"8","൯":"9","๐":"0","๑":"1","๒":"2","๓":"3","๔":"4","๕":"5","๖":"6","๗":"7","๘":"8","๙":"9","໐":"0","໑":"1","໒":"2","໓":"3","໔":"4","໕":"5","໖":"6","໗":"7","໘":"8","໙":"9","༠":"0","༡":"1","༢":"2","༣":"3","༤":"4","༥":"5","༦":"6","༧":"7","༨":"8","༩":"9","༪":"1","༫":"2","༬":"3","༭":"4","༮":"5","༯":"6","༰":"7","༱":"8","༲":"9","༳":"0","၀":"0","၁":"1","၂":"2","၃":"3","၄":"4","၅":"5","၆":"6","၇":"7","၈":"8","၉":"9","႐":"0","႑":"1","႒":"2","႓":"3","႔":"4","႕":"5","႖":"6","႗":"7","႘":"8","႙":"9","፩":"1","፪":"2","፫":"3","፬":"4","፭":"5","፮":"6","፯":"7","፰":"8","፱":"9","០":"0","១":"1","២":"2","៣":"3","៤":"4","៥":"5","៦":"6","៧":"7","៨":"8","៩":"9","៰":"0","៱":"1","៲":"2","៳":"3","៴":"4","៵":"5","៶":"6","៷":"7","៸":"8","៹":"9","᠐":"0","᠑":"1","᠒":"2","᠓":"3","᠔":"4","᠕":"5","᠖":"6","᠗":"7","᠘":"8","᠙":"9","᥆":"0","᥇":"1","᥈":"2","᥉":"3","᥊":"4","᥋":"5","᥌":"6","᥍":"7","᥎":"8","᥏":"9","᧐":"0","᧑":"1","᧒":"2","᧓":"3","᧔":"4","᧕":"5","᧖":"6","᧗":"7","᧘":"8","᧙":"9","᧚":"1","᪀":"0","᪁":"1","᪂":"2","᪃":"3","᪄":"4","᪅":"5","᪆":"6","᪇":"7","᪈":"8","᪉":"9","᪐":"0","᪑":"1","᪒":"2","᪓":"3","᪔":"4","᪕":"5","᪖":"6","᪗":"7","᪘":"8","᪙":"9","᭐":"0","᭑":"1","᭒":"2","᭓":"3","᭔":"4","᭕":"5","᭖":"6","᭗":"7","᭘":"8","᭙":"9","᮰":"0","᮱":"1","᮲":"2","᮳":"3","᮴":"4","᮵":"5","᮶":"6","᮷":"7","᮸":"8","᮹":"9","᱀":"0","᱁":"1","᱂":"2","᱃":"3","᱄":"4","᱅":"5","᱆":"6","᱇":"7","᱈":"8","᱉":"9","᱐":"0","᱑":"1","᱒":"2","᱓":"3","᱔":"4","᱕":"5","᱖":"6","᱗":"7","᱘":"8","᱙":"9","ᴬ":"A","ᴮ":"B","ᴰ":"D","ᴱ":"E","ᴳ":"G","ᴴ":"H","ᴵ":"I","ᴶ":"J","ᴷ":"K","ᴸ":"L","ᴹ":"M","ᴺ":"N","ᴼ":"O","ᴾ":"P","ᴿ":"R","ᵀ":"T","ᵁ":"U","ᵂ":"W","ᵃ":"a","ᵇ":"b","ᵈ":"d","ᵉ":"e","ᵍ":"g","ᵏ":"k","ᵐ":"m","ᵒ":"o","ᵖ":"p","ᵗ":"t","ᵘ":"u","ᵛ":"v","ᵢ":"i","ᵣ":"r","ᵤ":"u","ᵥ":"v","ᵹ":"g","ᶜ":"c","ᶞ":"d","ᶠ":"f","ᶻ":"z","᷊":"r","ᷓ":"a","ᷗ":"c","ᷘ":"d","ᷙ":"d","ᷚ":"g","ᷜ":"k","ᷝ":"l","ᷠ":"n","ᷤ":"s","ᷥ":"s","ᷦ":"z","Ḁ":"A","ḁ":"a","Ḃ":"B","ḃ":"b","Ḅ":"B","ḅ":"b","Ḇ":"B","ḇ":"b","Ḉ":"C","ḉ":"c","Ḋ":"D","ḋ":"d","Ḍ":"D","ḍ":"d","Ḏ":"D","ḏ":"d","Ḑ":"D","ḑ":"d","Ḓ":"D","ḓ":"d","Ḕ":"E","ḕ":"e","Ḗ":"E","ḗ":"e","Ḙ":"E","ḙ":"e","Ḛ":"E","ḛ":"e","Ḝ":"E","ḝ":"e","Ḟ":"F","ḟ":"f","Ḡ":"G","ḡ":"g","Ḣ":"H","ḣ":"h","Ḥ":"H","ḥ":"h","Ḧ":"H","ḧ":"h","Ḩ":"H","ḩ":"h","Ḫ":"H","ḫ":"h","Ḭ":"I","ḭ":"i","Ḯ":"I","ḯ":"i","Ḱ":"K","ḱ":"k","Ḳ":"K","ḳ":"k","Ḵ":"K","ḵ":"k","Ḷ":"L","ḷ":"l","Ḹ":"L","ḹ":"l","Ḻ":"L","ḻ":"l","Ḽ":"L","ḽ":"l","Ḿ":"M","ḿ":"m","Ṁ":"M","ṁ":"m","Ṃ":"M","ṃ":"m","Ṅ":"N","ṅ":"n","Ṇ":"N","ṇ":"n","Ṉ":"N","ṉ":"n","Ṋ":"N","ṋ":"n","Ṍ":"O","ṍ":"o","Ṏ":"O","ṏ":"o","Ṑ":"O","ṑ":"o","Ṓ":"O","ṓ":"o","Ṕ":"P","ṕ":"p","Ṗ":"P","ṗ":"p","Ṙ":"R","ṙ":"r","Ṛ":"R","ṛ":"r","Ṝ":"R","ṝ":"r","Ṟ":"R","ṟ":"r","Ṡ":"S","ṡ":"s","Ṣ":"S","ṣ":"s","Ṥ":"S","ṥ":"s","Ṧ":"S","ṧ":"s","Ṩ":"S","ṩ":"s","Ṫ":"T","ṫ":"t","Ṭ":"T","ṭ":"t","Ṯ":"T","ṯ":"t","Ṱ":"T","ṱ":"t","Ṳ":"U","ṳ":"u","Ṵ":"U","ṵ":"u","Ṷ":"U","ṷ":"u","Ṹ":"U","ṹ":"u","Ṻ":"U","ṻ":"u","Ṽ":"V","ṽ":"v","Ṿ":"V","ṿ":"v","Ẁ":"W","ẁ":"w","Ẃ":"W","ẃ":"w","Ẅ":"W","ẅ":"w","Ẇ":"W","ẇ":"w","Ẉ":"W","ẉ":"w","Ẋ":"X","ẋ":"x","Ẍ":"X","ẍ":"x","Ẏ":"Y","ẏ":"y","Ẑ":"Z","ẑ":"z","Ẓ":"Z","ẓ":"z","Ẕ":"Z","ẕ":"z","ẖ":"h","ẗ":"t","ẘ":"w","ẙ":"y","ẛ":"s","Ạ":"A","ạ":"a","Ả":"A","ả":"a","Ấ":"A","ấ":"a","Ầ":"A","ầ":"a","Ẩ":"A","ẩ":"a","Ẫ":"A","ẫ":"a","Ậ":"A","ậ":"a","Ắ":"A","ắ":"a","Ằ":"A","ằ":"a","Ẳ":"A","ẳ":"a","Ẵ":"A","ẵ":"a","Ặ":"A","ặ":"a","Ẹ":"E","ẹ":"e","Ẻ":"E","ẻ":"e","Ẽ":"E","ẽ":"e","Ế":"E","ế":"e","Ề":"E","ề":"e","Ể":"E","ể":"e","Ễ":"E","ễ":"e","Ệ":"E","ệ":"e","Ỉ":"I","ỉ":"i","Ị":"I","ị":"i","Ọ":"O","ọ":"o","Ỏ":"O","ỏ":"o","Ố":"O","ố":"o","Ồ":"O","ồ":"o","Ổ":"O","ổ":"o","Ỗ":"O","ỗ":"o","Ộ":"O","ộ":"o","Ớ":"O","ớ":"o","Ờ":"O","ờ":"o","Ở":"O","ở":"o","Ỡ":"O","ỡ":"o","Ợ":"O","ợ":"o","Ụ":"U","ụ":"u","Ủ":"U","ủ":"u","Ứ":"U","ứ":"u","Ừ":"U","ừ":"u","Ử":"U","ử":"u","Ữ":"U","ữ":"u","Ự":"U","ự":"u","Ỳ":"Y","ỳ":"y","Ỵ":"Y","ỵ":"y","Ỷ":"Y","ỷ":"y","Ỹ":"Y","ỹ":"y","⁰":"0","ⁱ":"i","⁴":"4","⁵":"5","⁶":"6","⁷":"7","⁸":"8","⁹":"9","ⁿ":"n","₀":"0","₁":"1","₂":"2","₃":"3","₄":"4","₅":"5","₆":"6","₇":"7","₈":"8","₉":"9","ₐ":"a","ₑ":"e","ₒ":"o","ₓ":"x","ₕ":"h","ₖ":"k","ₗ":"l","ₘ":"m","ₙ":"n","ₚ":"p","ₛ":"s","ₜ":"t","ℂ":"C","ℊ":"g","ℋ":"H","ℌ":"H","ℍ":"H","ℎ":"h","ℏ":"h","ℐ":"I","ℑ":"I","ℒ":"L","ℓ":"l","ℕ":"N","ℙ":"P","ℚ":"Q","ℛ":"R","ℜ":"R","ℝ":"R","ℤ":"Z","ℨ":"Z","K":"K","Å":"A","ℬ":"B","ℭ":"C","ℯ":"e","ℰ":"E","ℱ":"F","ℳ":"M","ℴ":"o","ℹ":"i","ⅅ":"D","ⅆ":"d","ⅇ":"e","ⅈ":"i","ⅉ":"j","Ⅰ":"I","Ⅴ":"V","Ⅹ":"X","Ⅼ":"L","Ⅽ":"C","Ⅾ":"D","Ⅿ":"M","ⅰ":"i","ⅴ":"v","ⅹ":"x","ⅼ":"l","ⅽ":"c","ⅾ":"d","ⅿ":"m","ↅ":"6","①":"1","②":"2","③":"3","④":"4","⑤":"5","⑥":"6","⑦":"7","⑧":"8","⑨":"9","Ⓐ":"A","Ⓑ":"B","Ⓒ":"C","Ⓓ":"D","Ⓔ":"E","Ⓕ":"F","Ⓖ":"G","Ⓗ":"H","Ⓘ":"I","Ⓙ":"J","Ⓚ":"K","Ⓛ":"L","Ⓜ":"M","Ⓝ":"N","Ⓞ":"O","Ⓟ":"P","Ⓠ":"Q","Ⓡ":"R","Ⓢ":"S","Ⓣ":"T","Ⓤ":"U","Ⓥ":"V","Ⓦ":"W","Ⓧ":"X","Ⓨ":"Y","Ⓩ":"Z","ⓐ":"a","ⓑ":"b","ⓒ":"c","ⓓ":"d","ⓔ":"e","ⓕ":"f","ⓖ":"g","ⓗ":"h","ⓘ":"i","ⓙ":"j","ⓚ":"k","ⓛ":"l","ⓜ":"m","ⓝ":"n","ⓞ":"o","ⓟ":"p","ⓠ":"q","ⓡ":"r","ⓢ":"s","ⓣ":"t","ⓤ":"u","ⓥ":"v","ⓦ":"w","ⓧ":"x","ⓨ":"y","ⓩ":"z","⓪":"0","⓵":"1","⓶":"2","⓷":"3","⓸":"4","⓹":"5","⓺":"6","⓻":"7","⓼":"8","⓽":"9","⓿":"0","❶":"1","❷":"2","❸":"3","❹":"4","❺":"5","❻":"6","❼":"7","❽":"8","❾":"9","➀":"1","➁":"2","➂":"3","➃":"4","➄":"5","➅":"6","➆":"7","➇":"8","➈":"9","➊":"1","➋":"2","➌":"3","➍":"4","➎":"5","➏":"6","➐":"7","➑":"8","➒":"9","ⱼ":"j","ⱽ":"V","〇":"0","〡":"1","〢":"2","〣":"3","〤":"4","〥":"5","〦":"6","〧":"7","〨":"8","〩":"9","꘠":"0","꘡":"1","꘢":"2","꘣":"3","꘤":"4","꘥":"5","꘦":"6","꘧":"7","꘨":"8","꘩":"9","Ꝺ":"D","ꝺ":"d","Ꝼ":"F","ꝼ":"f","Ᵹ":"G","Ꞃ":"R","ꞃ":"r","Ꞅ":"S","ꞅ":"s","Ꞇ":"T","ꞇ":"t","Ꞡ":"G","ꞡ":"g","Ꞣ":"K","ꞣ":"k","Ꞥ":"N","ꞥ":"n","Ꞧ":"R","ꞧ":"r","Ꞩ":"S","ꞩ":"s","꣐":"0","꣑":"1","꣒":"2","꣓":"3","꣔":"4","꣕":"5","꣖":"6","꣗":"7","꣘":"8","꣙":"9","꤀":"0","꤁":"1","꤂":"2","꤃":"3","꤄":"4","꤅":"5","꤆":"6","꤇":"7","꤈":"8","꤉":"9","꧐":"0","꧑":"1","꧒":"2","꧓":"3","꧔":"4","꧕":"5","꧖":"6","꧗":"7","꧘":"8","꧙":"9","꩐":"0","꩑":"1","꩒":"2","꩓":"3","꩔":"4","꩕":"5","꩖":"6","꩗":"7","꩘":"8","꩙":"9","꯰":"0","꯱":"1","꯲":"2","꯳":"3","꯴":"4","꯵":"5","꯶":"6","꯷":"7","꯸":"8","꯹":"9","０":"0","１":"1","２":"2","３":"3","４":"4","５":"5","６":"6","７":"7","８":"8","９":"9","Ａ":"A","Ｂ":"B","Ｃ":"C","Ｄ":"D","Ｅ":"E","Ｆ":"F","Ｇ":"G","Ｈ":"H","Ｉ":"I","Ｊ":"J","Ｋ":"K","Ｌ":"L","Ｍ":"M","Ｎ":"N","Ｏ":"O","Ｐ":"P","Ｑ":"Q","Ｒ":"R","Ｓ":"S","Ｔ":"T","Ｕ":"U","Ｖ":"V","Ｗ":"W","Ｘ":"X","Ｙ":"Y","Ｚ":"Z","ａ":"a","ｂ":"b","ｃ":"c","ｄ":"d","ｅ":"e","ｆ":"f","ｇ":"g","ｈ":"h","ｉ":"i","ｊ":"j","ｋ":"k","ｌ":"l","ｍ":"m","ｎ":"n","ｏ":"o","ｐ":"p","ｑ":"q","ｒ":"r","ｓ":"s","ｔ":"t","ｕ":"u","ｖ":"v","ｗ":"w","ｘ":"x","ｙ":"y","ｚ":"z"} ;
        var charMapReduzido = {
            "ª": "a",
            "²": "2",
            "³": "3",
            "¹": "1",
            "º": "o",
            "À": "A",
            "Á": "A",
            "Â": "A",
            "Ã": "A",
            "Ä": "A",
            "Å": "A",
            "Ç": "C",
            "È": "E",
            "É": "E",
            "Ê": "E",
            "Ë": "E",
            "Ì": "I",
            "Í": "I",
            "Î": "I",
            "Ï": "I",
            "Ð": "D",
            "Ñ": "N",
            "Ò": "O",
            "Ó": "O",
            "Ô": "O",
            "Õ": "O",
            "Ö": "O",
            "Ø": "O",
            "Ù": "U",
            "Ú": "U",
            "Û": "U",
            "Ü": "U",
            "Ý": "Y",
            "à": "a",
            "á": "a",
            "â": "a",
            "ã": "a",
            "ä": "a",
            "å": "a",
            "ç": "c",
            "è": "e",
            "é": "e",
            "ê": "e",
            "ë": "e",
            "ì": "i",
            "í": "i",
            "î": "i",
            "ï": "i",
            "ð": "d",
            "ñ": "n",
            "ò": "o",
            "ó": "o",
            "ô": "o",
            "õ": "o",
            "ö": "o",
            "ø": "o",
            "ù": "u",
            "ú": "u",
            "û": "u",
            "ü": "u",
            "ý": "y",
            "ÿ": "y",
            "Ā": "A",
            "ā": "a",
            "Ă": "A",
            "ă": "a",
            "Ą": "A",
            "ą": "a",
            "Ć": "C",
            "ć": "c",
            "Ĉ": "C",
            "ĉ": "c",
            "Ċ": "C",
            "ċ": "c",
            "Č": "C",
            "č": "c",
            "Ď": "D",
            "ď": "d",
            "Đ": "D",
            "đ": "d",
            "Ē": "E",
            "ē": "e",
            "Ĕ": "E",
            "ĕ": "e",
            "Ė": "E",
            "ė": "e",
            "Ę": "E",
            "ę": "e",
            "Ě": "E",
            "ě": "e",
            "Ĝ": "G",
            "ĝ": "g",
            "Ğ": "G",
            "ğ": "g",
            "Ġ": "G",
            "ġ": "g",
            "Ģ": "G",
            "ģ": "g",
            "Ĥ": "H",
            "ĥ": "h",
            "Ħ": "H",
            "ħ": "h",
            "Ĩ": "I",
            "ĩ": "i",
            "Ī": "I",
            "ī": "i",
            "Ĭ": "I",
            "ĭ": "i",
            "Į": "I",
            "į": "i",
            "İ": "I",
            "Ĵ": "J",
            "ĵ": "j",
            "Ķ": "K",
            "ķ": "k",
            "Ĺ": "L",
            "ĺ": "l",
            "Ļ": "L",
            "ļ": "l",
            "Ľ": "L",
            "ľ": "l",
            "Ŀ": "L",
            "ŀ": "l",
            "Ł": "L",
            "ł": "l",
            "Ń": "N",
            "ń": "n",
            "Ņ": "N",
            "ņ": "n",
            "Ň": "N",
            "ň": "n",
            "Ō": "O",
            "ō": "o",
            "Ŏ": "O",
            "ŏ": "o",
            "Ő": "O",
            "ő": "o",
            "Ŕ": "R",
            "ŕ": "r",
            "Ŗ": "R",
            "ŗ": "r",
            "Ř": "R",
            "ř": "r",
            "Ś": "S",
            "ś": "s",
            "Ŝ": "S",
            "ŝ": "s",
            "Ş": "S",
            "ş": "s",
            "Š": "S",
            "š": "s",
            "Ţ": "T",
            "ţ": "t",
            "Ť": "T",
            "ť": "t",
            "Ũ": "U",
            "ũ": "u",
            "Ū": "U",
            "ū": "u",
            "Ŭ": "U",
            "ŭ": "u",
            "Ů": "U",
            "ů": "u",
            "Ű": "U",
            "ű": "u",
            "Ų": "U",
            "ų": "u",
            "Ŵ": "W",
            "ŵ": "w",
            "Ŷ": "Y",
            "ŷ": "y",
            "Ÿ": "Y",
            "Ź": "Z",
            "ź": "z",
            "Ż": "Z",
            "ż": "z",
            "Ž": "Z",
            "ž": "z",
            "ſ": "s",
            "Ơ": "O",
            "ơ": "o",
            "Ư": "U",
            "ư": "u",
            "Ǎ": "A",
            "ǎ": "a",
            "Ǐ": "I",
            "ǐ": "i",
            "Ǒ": "O",
            "ǒ": "o",
            "Ǔ": "U",
            "ǔ": "u",
            "Ǖ": "U",
            "ǖ": "u",
            "Ǘ": "U",
            "ǘ": "u",
            "Ǚ": "U",
            "ǚ": "u",
            "Ǜ": "U",
            "ǜ": "u",
            "Ǟ": "A",
            "ǟ": "a",
            "Ǡ": "A",
            "ǡ": "a",
            "Ǧ": "G",
            "ǧ": "g",
            "Ǩ": "K",
            "ǩ": "k",
            "Ǫ": "O",
            "ǫ": "o",
            "Ǭ": "O",
            "ǭ": "o",
            "ǰ": "j",
            "Ǵ": "G",
            "ǵ": "g",
            "Ǹ": "N",
            "ǹ": "n",
            "Ǻ": "A",
            "ǻ": "a",
            "Ǿ": "O",
            "ǿ": "o",
            "Ȁ": "A",
            "ȁ": "a",
            "Ȃ": "A",
            "ȃ": "a",
            "Ȅ": "E",
            "ȅ": "e",
            "Ȇ": "E",
            "ȇ": "e",
            "Ȉ": "I",
            "ȉ": "i",
            "Ȋ": "I",
            "ȋ": "i",
            "Ȍ": "O",
            "ȍ": "o",
            "Ȏ": "O",
            "ȏ": "o",
            "Ȑ": "R",
            "ȑ": "r",
            "Ȓ": "R",
            "ȓ": "r",
            "Ȕ": "U",
            "ȕ": "u",
            "Ȗ": "U",
            "ȗ": "u",
            "Ș": "S",
            "ș": "s",
            "Ț": "T",
            "ț": "t",
            "Ȟ": "H",
            "ȟ": "h",
            "Ȧ": "A",
            "ȧ": "a",
            "Ȩ": "E",
            "ȩ": "e",
            "Ȫ": "O",
            "ȫ": "o",
            "Ȭ": "O",
            "ȭ": "o",
            "Ȯ": "O",
            "ȯ": "o",
            "Ȱ": "O",
            "ȱ": "o",
            "Ȳ": "Y",
            "ȳ": "y",
            "ʰ": "h",
            "ʲ": "j",
            "ʳ": "r",
            "ʷ": "w",
            "ʸ": "y",
            "ˡ": "l",
            "ˢ": "s",
            "ˣ": "x",
            "ͣ": "a",
            "ͤ": "e",
            "ͥ": "i",
            "ͦ": "o",
            "ͧ": "u",
            "ͨ": "c",
            "ͩ": "d",
            "ͪ": "h",
            "ͫ": "m",
            "ͬ": "r",
            "ͭ": "t",
            "ͮ": "v",
            "ͯ": "x",
            "٠": "0",
            "١": "1",
            "٢": "2",
            "٣": "3",
            "٤": "4",
            "٥": "5",
            "٦": "6",
            "٧": "7",
            "٨": "8",
            "٩": "9",
            "۰": "0",
            "۱": "1",
            "۲": "2",
            "۳": "3",
            "۴": "4",
            "۵": "5",
            "۶": "6",
            "۷": "7",
            "۸": "8",
            "۹": "9",
            "߀": "0",
            "߁": "1",
            "߂": "2",
            "߃": "3",
            "߄": "4",
            "߅": "5",
            "߆": "6",
            "߇": "7",
            "߈": "8",
            "߉": "9",
            "०": "0",
            "१": "1",
            "२": "2",
            "३": "3",
            "४": "4",
            "५": "5",
            "६": "6",
            "७": "7",
            "८": "8",
            "९": "9",
            "০": "0",
            "১": "1",
            "২": "2",
            "৩": "3",
            "৪": "4",
            "৫": "5",
            "৬": "6",
            "৭": "7",
            "৮": "8",
            "৯": "9",
            "ᴬ": "A",
            "ᴮ": "B",
            "ᴰ": "D",
            "ᴱ": "E",
            "ᴳ": "G",
            "ᴴ": "H",
            "ᴵ": "I",
            "ᴶ": "J",
            "ᴷ": "K",
            "ᴸ": "L",
            "ᴹ": "M",
            "ᴺ": "N",
            "ᴼ": "O",
            "ᴾ": "P",
            "ᴿ": "R",
            "ᵀ": "T",
            "ᵁ": "U",
            "ᵂ": "W",
            "ᵃ": "a",
            "ᵇ": "b",
            "ᵈ": "d",
            "ᵉ": "e",
            "ᵍ": "g",
            "ᵏ": "k",
            "ᵐ": "m",
            "ᵒ": "o",
            "ᵖ": "p",
            "ᵗ": "t",
            "ᵘ": "u",
            "ᵛ": "v",
            "ᵢ": "i",
            "ᵣ": "r",
            "ᵤ": "u",
            "ᵥ": "v",
            "ᵹ": "g",
            "ᶜ": "c",
            "ᶞ": "d",
            "ᶠ": "f",
            "ᶻ": "z",
            "᷊": "r",
            "ᷓ": "a",
            "ᷗ": "c",
            "ᷘ": "d",
            "ᷙ": "d",
            "ᷚ": "g",
            "ᷜ": "k",
            "ᷝ": "l",
            "ᷠ": "n",
            "ᷤ": "s",
            "ᷥ": "s",
            "ᷦ": "z",
            "Ḁ": "A",
            "ḁ": "a",
            "Ḃ": "B",
            "ḃ": "b",
            "Ḅ": "B",
            "ḅ": "b",
            "Ḇ": "B",
            "ḇ": "b",
            "Ḉ": "C",
            "ḉ": "c",
            "Ḋ": "D",
            "ḋ": "d",
            "Ḍ": "D",
            "ḍ": "d",
            "Ḏ": "D",
            "ḏ": "d",
            "Ḑ": "D",
            "ḑ": "d",
            "Ḓ": "D",
            "ḓ": "d",
            "Ḕ": "E",
            "ḕ": "e",
            "Ḗ": "E",
            "ḗ": "e",
            "Ḙ": "E",
            "ḙ": "e",
            "Ḛ": "E",
            "ḛ": "e",
            "Ḝ": "E",
            "ḝ": "e",
            "Ḟ": "F",
            "ḟ": "f",
            "Ḡ": "G",
            "ḡ": "g",
            "Ḣ": "H",
            "ḣ": "h",
            "Ḥ": "H",
            "ḥ": "h",
            "Ḧ": "H",
            "ḧ": "h",
            "Ḩ": "H",
            "ḩ": "h",
            "Ḫ": "H",
            "ḫ": "h",
            "Ḭ": "I",
            "ḭ": "i",
            "Ḯ": "I",
            "ḯ": "i",
            "Ḱ": "K",
            "ḱ": "k",
            "Ḳ": "K",
            "ḳ": "k",
            "Ḵ": "K",
            "ḵ": "k",
            "Ḷ": "L",
            "ḷ": "l",
            "Ḹ": "L",
            "ḹ": "l",
            "Ḻ": "L",
            "ḻ": "l",
            "Ḽ": "L",
            "ḽ": "l",
            "Ḿ": "M",
            "ḿ": "m",
            "Ṁ": "M",
            "ṁ": "m",
            "Ṃ": "M",
            "ṃ": "m",
            "Ṅ": "N",
            "ṅ": "n",
            "Ṇ": "N",
            "ṇ": "n",
            "Ṉ": "N",
            "ṉ": "n",
            "Ṋ": "N",
            "ṋ": "n",
            "Ṍ": "O",
            "ṍ": "o",
            "Ṏ": "O",
            "ṏ": "o",
            "Ṑ": "O",
            "ṑ": "o",
            "Ṓ": "O",
            "ṓ": "o",
            "Ṕ": "P",
            "ṕ": "p",
            "Ṗ": "P",
            "ṗ": "p",
            "Ṙ": "R",
            "ṙ": "r",
            "Ṛ": "R",
            "ṛ": "r",
            "Ṝ": "R",
            "ṝ": "r",
            "Ṟ": "R",
            "ṟ": "r",
            "Ṡ": "S",
            "ṡ": "s",
            "Ṣ": "S",
            "ṣ": "s",
            "Ṥ": "S",
            "ṥ": "s",
            "Ṧ": "S",
            "ṧ": "s",
            "Ṩ": "S",
            "ṩ": "s",
            "Ṫ": "T",
            "ṫ": "t",
            "Ṭ": "T",
            "ṭ": "t",
            "Ṯ": "T",
            "ṯ": "t",
            "Ṱ": "T",
            "ṱ": "t",
            "Ṳ": "U",
            "ṳ": "u",
            "Ṵ": "U",
            "ṵ": "u",
            "Ṷ": "U",
            "ṷ": "u",
            "Ṹ": "U",
            "ṹ": "u",
            "Ṻ": "U",
            "ṻ": "u",
            "Ṽ": "V",
            "ṽ": "v",
            "Ṿ": "V",
            "ṿ": "v",
            "Ẁ": "W",
            "ẁ": "w",
            "Ẃ": "W",
            "ẃ": "w",
            "Ẅ": "W",
            "ẅ": "w",
            "Ẇ": "W",
            "ẇ": "w",
            "Ẉ": "W",
            "ẉ": "w",
            "Ẋ": "X",
            "ẋ": "x",
            "Ẍ": "X",
            "ẍ": "x",
            "Ẏ": "Y",
            "ẏ": "y",
            "Ẑ": "Z",
            "ẑ": "z",
            "Ẓ": "Z",
            "ẓ": "z",
            "Ẕ": "Z",
            "ẕ": "z",
            "ẖ": "h",
            "ẗ": "t",
            "ẘ": "w",
            "ẙ": "y",
            "ẛ": "s",
            "Ạ": "A",
            "ạ": "a",
            "Ả": "A",
            "ả": "a",
            "Ấ": "A",
            "ấ": "a",
            "Ầ": "A",
            "ầ": "a",
            "Ẩ": "A",
            "ẩ": "a",
            "Ẫ": "A",
            "ẫ": "a",
            "Ậ": "A",
            "ậ": "a",
            "Ắ": "A",
            "ắ": "a",
            "Ằ": "A",
            "ằ": "a",
            "Ẳ": "A",
            "ẳ": "a",
            "Ẵ": "A",
            "ẵ": "a",
            "Ặ": "A",
            "ặ": "a",
            "Ẹ": "E",
            "ẹ": "e",
            "Ẻ": "E",
            "ẻ": "e",
            "Ẽ": "E",
            "ẽ": "e",
            "Ế": "E",
            "ế": "e",
            "Ề": "E",
            "ề": "e",
            "Ể": "E",
            "ể": "e",
            "Ễ": "E",
            "ễ": "e",
            "Ệ": "E",
            "ệ": "e",
            "Ỉ": "I",
            "ỉ": "i",
            "Ị": "I",
            "ị": "i",
            "Ọ": "O",
            "ọ": "o",
            "Ỏ": "O",
            "ỏ": "o",
            "Ố": "O",
            "ố": "o",
            "Ồ": "O",
            "ồ": "o",
            "Ổ": "O",
            "ổ": "o",
            "Ỗ": "O",
            "ỗ": "o",
            "Ộ": "O",
            "ộ": "o",
            "Ớ": "O",
            "ớ": "o",
            "Ờ": "O",
            "ờ": "o",
            "Ở": "O",
            "ở": "o",
            "Ỡ": "O",
            "ỡ": "o",
            "Ợ": "O",
            "ợ": "o",
            "Ụ": "U",
            "ụ": "u",
            "Ủ": "U",
            "ủ": "u",
            "Ứ": "U",
            "ứ": "u",
            "Ừ": "U",
            "ừ": "u",
            "Ử": "U",
            "ử": "u",
            "Ữ": "U",
            "ữ": "u",
            "Ự": "U",
            "ự": "u",
            "Ỳ": "Y",
            "ỳ": "y",
            "Ỵ": "Y",
            "ỵ": "y",
            "Ỷ": "Y",
            "ỷ": "y",
            "Ỹ": "Y",
            "ỹ": "y",
            "⁰": "0",
            "ⁱ": "i",
            "⁴": "4",
            "⁵": "5",
            "⁶": "6",
            "⁷": "7",
            "⁸": "8",
            "⁹": "9",
            "ⁿ": "n",
            "₀": "0",
            "₁": "1",
            "₂": "2",
            "₃": "3",
            "₄": "4",
            "₅": "5",
            "₆": "6",
            "₇": "7",
            "₈": "8",
            "₉": "9",
            "ₐ": "a",
            "ₑ": "e",
            "ₒ": "o",
            "ₓ": "x",
            "ₕ": "h",
            "ₖ": "k",
            "ₗ": "l",
            "ₘ": "m",
            "ₙ": "n",
            "ₚ": "p",
            "ₛ": "s",
            "ₜ": "t",
            "ℂ": "C",
            "ℊ": "g",
            "ℋ": "H",
            "ℌ": "H",
            "ℍ": "H",
            "ℎ": "h",
            "ℏ": "h",
            "ℐ": "I",
            "ℑ": "I",
            "ℒ": "L",
            "ℓ": "l",
            "ℕ": "N",
            "ℙ": "P",
            "ℚ": "Q",
            "ℛ": "R",
            "ℜ": "R",
            "ℝ": "R",
            "ℤ": "Z",
            "ℨ": "Z",
            "K": "K",
            "Å": "A",
            "ℬ": "B",
            "ℭ": "C",
            "ℯ": "e",
            "ℰ": "E",
            "ℱ": "F",
            "ℳ": "M",
            "ℴ": "o",
            "ℹ": "i",
            "ⅅ": "D",
            "ⅆ": "d",
            "ⅇ": "e",
            "ⅈ": "i",
            "ⅉ": "j",
            "Ⅰ": "I",
            "Ⅴ": "V",
            "Ⅹ": "X",
            "Ⅼ": "L",
            "Ⅽ": "C",
            "Ⅾ": "D",
            "Ⅿ": "M",
            "ⅰ": "i",
            "ⅴ": "v",
            "ⅹ": "x",
            "ⅼ": "l",
            "ⅽ": "c",
            "ⅾ": "d",
            "ⅿ": "m",
            "ↅ": "6",
            "①": "1",
            "②": "2",
            "③": "3",
            "④": "4",
            "⑤": "5",
            "⑥": "6",
            "⑦": "7",
            "⑧": "8",
            "⑨": "9",
            "Ⓐ": "A",
            "Ⓑ": "B",
            "Ⓒ": "C",
            "Ⓓ": "D",
            "Ⓔ": "E",
            "Ⓕ": "F",
            "Ⓖ": "G",
            "Ⓗ": "H",
            "Ⓘ": "I",
            "Ⓙ": "J",
            "Ⓚ": "K",
            "Ⓛ": "L",
            "Ⓜ": "M",
            "Ⓝ": "N",
            "Ⓞ": "O",
            "Ⓟ": "P",
            "Ⓠ": "Q",
            "Ⓡ": "R",
            "Ⓢ": "S",
            "Ⓣ": "T",
            "Ⓤ": "U",
            "Ⓥ": "V",
            "Ⓦ": "W",
            "Ⓧ": "X",
            "Ⓨ": "Y",
            "Ⓩ": "Z",
            "ⓐ": "a",
            "ⓑ": "b",
            "ⓒ": "c",
            "ⓓ": "d",
            "ⓔ": "e",
            "ⓕ": "f",
            "ⓖ": "g",
            "ⓗ": "h",
            "ⓘ": "i",
            "ⓙ": "j",
            "ⓚ": "k",
            "ⓛ": "l",
            "ⓜ": "m",
            "ⓝ": "n",
            "ⓞ": "o",
            "ⓟ": "p",
            "ⓠ": "q",
            "ⓡ": "r",
            "ⓢ": "s",
            "ⓣ": "t",
            "ⓤ": "u",
            "ⓥ": "v",
            "ⓦ": "w",
            "ⓧ": "x",
            "ⓨ": "y",
            "ⓩ": "z",
            "⓪": "0",
            "⓵": "1",
            "⓶": "2",
            "⓷": "3",
            "⓸": "4",
            "⓹": "5",
            "⓺": "6",
            "⓻": "7",
            "⓼": "8",
            "⓽": "9",
            "⓿": "0",
            "❶": "1",
            "❷": "2",
            "❸": "3",
            "❹": "4",
            "❺": "5",
            "❻": "6",
            "❼": "7",
            "❽": "8",
            "❾": "9",
            "➀": "1",
            "➁": "2",
            "➂": "3",
            "➃": "4",
            "➄": "5",
            "➅": "6",
            "➆": "7",
            "➇": "8",
            "➈": "9",
            "➊": "1",
            "➋": "2",
            "➌": "3",
            "➍": "4",
            "➎": "5",
            "➏": "6",
            "➐": "7",
            "➑": "8",
            "➒": "9",
            "ⱼ": "j",
            "ⱽ": "V",
            "〇": "0",
            "〡": "1",
            "〢": "2",
            "〣": "3",
            "〤": "4",
            "〥": "5",
            "〦": "6",
            "〧": "7",
            "〨": "8",
            "〩": "9",
            "꘠": "0",
            "꘡": "1",
            "꘢": "2",
            "꘣": "3",
            "꘤": "4",
            "꘥": "5",
            "꘦": "6",
            "꘧": "7",
            "꘨": "8",
            "꘩": "9",
            "Ꝺ": "D",
            "ꝺ": "d",
            "Ꝼ": "F",
            "ꝼ": "f",
            "Ᵹ": "G",
            "Ꞃ": "R",
            "ꞃ": "r",
            "Ꞅ": "S",
            "ꞅ": "s",
            "Ꞇ": "T",
            "ꞇ": "t",
            "Ꞡ": "G",
            "ꞡ": "g",
            "Ꞣ": "K",
            "ꞣ": "k",
            "Ꞥ": "N",
            "ꞥ": "n",
            "Ꞧ": "R",
            "ꞧ": "r",
            "Ꞩ": "S",
            "ꞩ": "s",
            "꣐": "0",
            "꣑": "1",
            "꣒": "2",
            "꣓": "3",
            "꣔": "4",
            "꣕": "5",
            "꣖": "6",
            "꣗": "7",
            "꣘": "8",
            "꣙": "9",
            "꤀": "0",
            "꤁": "1",
            "꤂": "2",
            "꤃": "3",
            "꤄": "4",
            "꤅": "5",
            "꤆": "6",
            "꤇": "7",
            "꤈": "8",
            "꤉": "9",
            "꧐": "0",
            "꧑": "1",
            "꧒": "2",
            "꧓": "3",
            "꧔": "4",
            "꧕": "5",
            "꧖": "6",
            "꧗": "7",
            "꧘": "8",
            "꧙": "9",
            "꩐": "0",
            "꩑": "1",
            "꩒": "2",
            "꩓": "3",
            "꩔": "4",
            "꩕": "5",
            "꩖": "6",
            "꩗": "7",
            "꩘": "8",
            "꩙": "9",
            "꯰": "0",
            "꯱": "1",
            "꯲": "2",
            "꯳": "3",
            "꯴": "4",
            "꯵": "5",
            "꯶": "6",
            "꯷": "7",
            "꯸": "8",
            "꯹": "9",
            "０": "0",
            "１": "1",
            "２": "2",
            "３": "3",
            "４": "4",
            "５": "5",
            "６": "6",
            "７": "7",
            "８": "8",
            "９": "9",
            "Ａ": "A",
            "Ｂ": "B",
            "Ｃ": "C",
            "Ｄ": "D",
            "Ｅ": "E",
            "Ｆ": "F",
            "Ｇ": "G",
            "Ｈ": "H",
            "Ｉ": "I",
            "Ｊ": "J",
            "Ｋ": "K",
            "Ｌ": "L",
            "Ｍ": "M",
            "Ｎ": "N",
            "Ｏ": "O",
            "Ｐ": "P",
            "Ｑ": "Q",
            "Ｒ": "R",
            "Ｓ": "S",
            "Ｔ": "T",
            "Ｕ": "U",
            "Ｖ": "V",
            "Ｗ": "W",
            "Ｘ": "X",
            "Ｙ": "Y",
            "Ｚ": "Z",
            "ａ": "a",
            "ｂ": "b",
            "ｃ": "c",
            "ｄ": "d",
            "ｅ": "e",
            "ｆ": "f",
            "ｇ": "g",
            "ｈ": "h",
            "ｉ": "i",
            "ｊ": "j",
            "ｋ": "k",
            "ｌ": "l",
            "ｍ": "m",
            "ｎ": "n",
            "ｏ": "o",
            "ｐ": "p",
            "ｑ": "q",
            "ｒ": "r",
            "ｓ": "s",
            "ｔ": "t",
            "ｕ": "u",
            "ｖ": "v",
            "ｗ": "w",
            "ｘ": "x",
            "ｙ": "y",
            "ｚ": "z"
        };
        var nome = p;
        var teste = nome.replace(/\W/gi, function(char) {
            return charMapReduzido[char] || " ";
        });
        return teste;
    } catch (e) {
        alert("Erro na função tiraAcentos:" + e.message)
    }


}

function retiraPreposicoes(s) {
    //var str = s;
    //Depois melhorar
    var newstr = s.replace(/\sa\s|\se\s|\sd\s|\sc\s|\sp\s|\ss\s|\sa\s|\sao\s|\saos\s|\sdos\s|\sdo\s|\sde\s|\sda\s|\scom\s|\spor\s|\sdas\s|\ssem\s|\sdi\s|\sdu\s|\sdus\s|\sdis\s/ig, ' ');
    return newstr;
    //console.log(newstr);  // Twas the night before Christmas...

}

function temPreposicoes(s) {
    var str = s;
    var patt = /\sa\s|\se\s|\sd\s|\sc\s|\sp\s|\ss\s|\sa\s|\sao\s|\saos\s|\sdos\s|\sdo\s|\sde\s|\sda\s|\scom\s|\spor\s|\sdas\s|\ssem\s|\sdi\s|\sdu\s|\sdus\s|\sdis\s/ig;
    var res = patt.test(str);
    return res;
}


function modTamMapa() {
    var tamNavedador = $(window).width();
    var tamDocumento = $(document).width();
    // top:20px; left:35%; height: 70%;    width: 30%;
    if ((tamNavedador < 450) || (tamDocumento < 450)) {
        $('#boxPrincipal').css({
            'left': '0px',
            'height': '100%',
            'width': '100%'
        })

    } else {
        $('#boxPrincipal').css({
            'left': '35%',
            'height': '70%',
            'width': '30%'
        })
    }

}

function soNumero(str) {
    str = str.toString();
    return str.replace(/\D/g, "");
}


function formCadValidado() {
    if ($("input#nomeCad").val() == '') {
        $("em#er1").css('display', 'inline-block'); //style.display='inline;';
        $("input#nomeCad").focus();
        return false;
    } else {
        $("em#er1").css('display', 'none');
    }
    if ($("input#sobreNomeCad").val() == '') {
        $("em#er2").css('display', 'inline-block'); //style.display='inline;';
        $("input#sobreNomeCad").focus();
        return false;
    } else {
        $("em#er2").css('display', 'none');
    }
    if ($("input#cpfCad").val() == '') {
        $("em#er3").css('display', 'inline-block'); //style.display='inline;';
        $("input#cpfCad").focus();
        return false;
    } else {
        $("em#er3").css('display', 'none');
    }
    if ($("input#cpfCad").val() != '') {

        var str = $("input#cpfCad").val(); //RegExp validacao CPF	
        var str2 = RetiraMascara(str); //retira mascara	
        $("input#cpfCad").val(str2);
        var res = str2.match(/^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/);
        if (!res) {
            $("em#er3").css('display', 'inline-block'); //style.display='inline;';
            $("input#cpfCad").focus();
            return false;
        } else {
            if (!is_cpf($("input#cpfCad").val())) {
                $("em#er3").css('display', 'inline-block'); //style.display='inline;';
                $("input#cpfCad").focus();
                return false;
            } else {
                $("em#er3").css('display', 'none');
            } //style.display='inline;';
        }
    }



    if ($("input#emailCad").val() == '') {
        $("em#er4").css('display', 'inline-block'); //style.display='inline;';
        $("input#emailCad").focus();
        return false;
    } else {
        $("em#er4").css('display', 'none');
    }

    if ($("input#emailCad").val() != '') {
        var str = $("input#emailCad").val(); //RegExp validacao EMail	
        var res = str.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i);
        if (!res) {
            $("em#er4").css('display', 'inline-block'); //style.display='inline;';
            $("input#emailCad").focus();
            return false;
        } else {
            $("em#er4").css('display', 'none');
        }
    }

    if ($("input#emailCad").val().toLowerCase() != $("input#reEmailCad").val().toLowerCase()) {
        $("em#er5").css('display', 'inline-block'); //style.display='inline;';
        $("input#reEmailCad").focus();
        return false;
    } else {
        $("em#er5").css('display', 'none');
    }

    if ($("input#celCad").val() == '') {
        $("em#er6").css('display', 'inline-block'); //style.display='inline;';
        $("input#celCad").focus();
        return false;
    } else {
        $("em#er6").css('display', 'none');
    }

    if ($("input#celCad").val() != '') {
        var str = $("input#celCad").val();
        var res = str.match(/\(\s?[1-9]\d\s?\)\s?9?\d{4}[-]?\d{4}/);
        if (!res) {
            $("em#er6").css('display', 'inline-block'); //style.display='inline;';
            $("input#celCad").focus();
            return false;
        } else {
            $("em#er6").css('display', 'none');
        }
    }

    if ($("input#senhaCad").val() == '') {
        $("em#er7").css('display', 'inline-block'); //style.display='inline;';
        $("input#senhaCad").focus();
        return false;
    } else {
        $("em#er7").css('display', 'none');
    }

    if ($("input#reSenhaCad").val() !== $("input#senhaCad").val()) {
        $("em#er8").css('display', 'inline-block'); //style.display='inline;';
        $("input#reSenhaCad").focus();
        return false;
    } else {
        $("em#er8").css('display', 'none');
    }

    return true;
}

function is_cpf(c) {
    /*Créditos: http://araujo.cc/blog/funcao-javascript-para-validar-cpf.html */
    /* */
    if ((c = c.replace(/[^\d]/g, "")).length != 11)
        return false;

    if (c == "00000000000")
        return false;
    if (c == "11111111111")
        return false;

    if (c == "22222222222")
        return false;

    if (c == "33333333333")
        return false;

    if (c == "44444444444")
        return false;

    if (c == "55555555555")
        return false;

    if (c == "66666666666")
        return false;

    if (c == "77777777777")
        return false;

    if (c == "88888888888")
        return false;

    if (c == "99999999999")
        return false;

    var r;
    var s = 0;

    for (i = 1; i <= 9; i++)
        s = s + parseInt(c[i - 1]) * (11 - i);

    r = (s * 10) % 11;

    if ((r == 10) || (r == 11))
        r = 0;

    if (r != parseInt(c[9]))
        return false;

    s = 0;

    for (i = 1; i <= 10; i++)
        s = s + parseInt(c[i - 1]) * (12 - i);

    r = (s * 10) % 11;

    if ((r == 10) || (r == 11))
        r = 0;

    if (r != parseInt(c[10]))
        return false;

    return true;
}

function RetiraMascara(strCPF) {
    return strCPF.replace(/\D/g, '');
}

function escondeObjetos(IDobj1, IDobj1) { //obj1,obj1,...
    var IDobjs;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
            obj = document.getElementById(arguments[i]);
            obj.style.display = 'none';
            obj.disabled = false;
        }
    }
}

function mostraObjetos(IDobj1, IDobj1) { //obj1,obj1,...
    var IDobjs;
    for (var i = 0; i < arguments.length; i++) {
        if (arguments[i]) {
            obj = document.getElementById(arguments[i]);
            obj.style.display = 'run-in';
            obj.disabled = false;
        }
    }
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
            console.log("Em recuperaSessao: Sessao " + id + " recuperada: " + Storage.getItem(id))
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

function zeraBufferCoords(c) {
    c.set(0, undefined);
    c.set(1, undefined);
    c.set(2, undefined);
    c.set(3, undefined);
}

// Circular buffer storage. Externally-apparent 'length' increases indefinitely
// while any items with indexes below length-n will be forgotten (undefined
// will be returned if you try to get them, trying to set is an exception).
// n represents the initial length of the array, not a maximum
function CircularBuffer(n) {
    this._array = new Array(n);
    this.length = 0;
}
CircularBuffer.prototype.toString = function() {
    return '[object CircularBuffer(' + this._array.length + ') length ' + this.length + ']';
};
CircularBuffer.prototype.get = function(i) {
    if (i < 0 || i < this.length - this._array.length)
        return undefined;
    return this._array[i % this._array.length];
};
CircularBuffer.prototype.set = function(i, v) {
    if (i < 0 || i < this.length - this._array.length)
        throw CircularBuffer.IndexError;
    while (i > this.length) {
        this._array[this.length % this._array.length] = undefined;
        this.length++;
    }
    this._array[i % this._array.length] = v;
    if (i == this.length)
        this.length++;
};
CircularBuffer.prototype.IndexError = {};



function mostraDialogo(mensagem, tipo, tempo) {
    //Autor desta funcao:Conrado Saud 
    //site:http://blog.conradosaud.com.br/artigo/38
    //Aqui com adaptacoes nossa
    //tipos:primary,secondary,success,danger,warning,info,light e dark
    //Ex de uso:
    //var mensagem = "<strong>Informações alteradas com sucesso!</strong><br>Suas informações foram alteradas e já podem ser visualizadas no painel.";
    //mostraDialogo(mensagem, "warning", 2500);
    try {
        // se houver outro alert desse sendo exibido, cancela essa requisição
        if ($("#message").is(":visible")) {
            return false;
        }

        // se não setar o tempo, o padrão é 3 segundos
        if (!tempo) {
            var tempo = 3000;
        }

        // se não setar o tipo, o padrão é alert-info
        if (!tipo) {
            var tipo = "info";
        }

        // monta o css da mensagem para que fique flutuando na frente de todos elementos da página
        var cssMessage = "display: block; position: fixed; top: 0; left: 20%; right: 20%; width: 60%; padding-top: 10px; z-index: 19999";
        var cssInner = "margin: 0 auto; box-shadow: 1px 1px 5px black;";

        // monta o html da mensagem com Bootstrap
        var dialogo = "";
        dialogo += '<div id="message" style="' + cssMessage + '">';
        dialogo += '    <div class="alert alert-' + tipo + ' alert-dismissable" style="' + cssInner + '">';
        dialogo += '    <a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>';
        dialogo += mensagem;
        dialogo += '    </div>';
        dialogo += '</div>';

        // adiciona ao body a mensagem com o efeito de fade
        $("body").append(dialogo);
        $("#message").hide();
        $("#message").fadeIn(200);

        // contador de tempo para a mensagem sumir
        setTimeout(function() {
            $('#message').fadeOut(300, function() {
                $(this).remove();
            });
        }, tempo); // milliseconds


    } catch (e) {
        alert("Erro na function mostraDialogo: " + e.message)
    }

}

function fFB(){
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '609463026453550',
      cookie     : true,
      xfbml      : true,
      version    : 'v6.0'
    });
      
   FB.AppEvents.logPageView();   
   
   return FB;
   
   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   
   

}

function fsairViaFace(){
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '609463026453550',
      cookie     : true,
      xfbml      : true,
      version    : 'v6.0'
    });
      
   FB.AppEvents.logPageView();   
   
   
   (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
  
   
    
        FB.logout(function(response) {
            
        });
        $.post('/index.php?sair=yes',{},function(r2){})
    
}
}
//ASairViaFace



function fCancelaPassageiro(){
     var conteudo = "<div id='divErro'></div>";
                            mostraModal("Aviso", conteudo, "Fechar");
                            myAlert("divErro", "<strong>Cancelamento somente com o motorista</strong><br>Ligar ou via chat no botão Contato.<br><strong>A taxa de cancelamento é proporcional ao deslocamento do motorista no momento da solicitação ao mesmo.</strong>");
}
function cityAutoPassageiro(){
    var achou=passageiro.getEndOrigem().match(/Extremoz/ig);
    if (achou){return 'Extremoz'};
    achou=passageiro.getEndOrigem().match(/Parnamirim/ig);
    if (achou){return 'Parnamirim'};
    achou=passageiro.getEndOrigem().match(/São Gonçalo do Amarante/ig);
    if (achou){return 'São Gonçalo do Amarante'};
    achou=passageiro.getEndOrigem().match(/RN|Rio Grande do Norte/ig);
    if (achou){return 'RN'};
    return false;
    
}