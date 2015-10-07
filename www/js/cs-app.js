/*******************************************************************************
 *
 * Copyright (c) 2015 Fraunhofer FOKUS, All rights reserved.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3.0 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library. If not, see <http://www.gnu.org/licenses/>.
 *
 * AUTHORS: Louay Bassbouss (louay.bassbouss@fokus.fraunhofer.de)
 *
 ******************************************************************************/
var terminalManager;
var terminals = [];

var log = function (msg) {
    console.log(msg);
    var logElem = $("#log");
    logElem.val(logElem.val()+msg+"\n");
    logElem.scrollTop(logElem[0].scrollHeight);
};

var discoverTerminals = function () {
    terminalManager.discoverTerminals(function (discoveredTerminals) {
        terminals = discoveredTerminals;
        $("#discoverTerminalsBtn").attr("disabled", false);
        $("#terminals").empty();
        $(terminals).each(function (i,terminal) {
            var channel = Math.random().toString(36).substring(2);
            $("#terminals").append("<li id='"+i+"'>"+terminal.friendly_name+"  <button class='launch' data-index='"+i+"' data-channel='"+channel+"'>Launch</button>  <button class='connect' data-index='"+i+"' data-channel='"+channel+"'>Connect</button> <div class='log'></div></li>");
        });
        if(terminals.length==0){
            $("#terminals").html("No HbbTV terminals found. Click on the discover button to search again!");
        }
        else{
            $("button.launch").click(function () {
                var index = $(this).attr("data-index");
                var channel = $(this).attr("data-channel");
                launchHbbTVApp(index,channel);
            });
            $("button.connect").click(function () {
                var index = $(this).attr("data-index");
                var channel = $(this).attr("data-channel");
                connect(index,channel);
            });
        }
        log(terminals.length+" HbbTV terminals found");
    });
};

var launchHbbTVApp = function (index,channel) {
    var terminal = terminals[index];
    var options = {
        "appUrlBase": "http://fraunhoferfokus.github.io/node-hbbtv/www/hbbtv-app.html",
        "appLocation": "?channel="+channel
    };
    terminal && terminalManager.launchHbbTVApp(terminal.enum_id, options, function (res) {
        log("launch app: enum_id="+ terminal.enum_id);
    });
};

var connect = function (index,channel) {
    var terminal = terminals[index];
    var app2appRemoteBaseUrl = terminal && terminal.X_HbbTV_App2AppURL || app2appURL;
    var ws = new WebSocket(app2appRemoteBaseUrl + channel);
    ws.binaryType = "arraybuffer";
    ws.onopen = function(evt) {
        log("Connection waiting ...");
    };
    ws.onclose = function(evt) {
        log("Connection closed.");
    };
    ws.onerror = function (evt) {
        log("Connection error.");
    };
    ws.onmessage = function(evt) {
        console.log(evt.data);
        if (evt.data == "pairingcompleted") {
            log("connection paired");
            ws.onmessage = function(evt) {
                log( "Received Message: " + evt.data);
            };
            var msg = "Hello from Companion Screen";
            ws.send(msg);
            if(typeof Int8Array != "undefined"){
                var array = [0,1,2,3,4,5,6,7,8,9];
                var binary = new Int8Array(array).buffer;
                ws.send(binary);
            }
        } else {
            log("Unexpected message received from terminal.");
            ws.close();
        }
    };
};

var initApp = function() {
    terminalManager = hbbtv && hbbtv.createTerminalManager();
    $("#discoverTerminalsBtn").click(function () {
        log("Discover HbbTV Terminals");
        $("#terminals").html("Searching for HbbTV terminals:  please wait ...");
        $("#discoverTerminalsBtn").attr("disabled", true);
        setTimeout(discoverTerminals,500);
    });
    $("#discoverTerminalsBtn").attr("disabled",false);
};

if(typeof hbbtv != "undefined"){
    initApp();
}
else {
    // wait for deviceready events (in Cordova Apps)
    document.addEventListener('deviceready', function () {
        initApp();
    }, false);
}