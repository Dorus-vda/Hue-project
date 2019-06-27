const BRIDGE_URL = "192.168.178.172"  // IP adres van de bridge
const API_KEY = "l1SJ36Y-mE6pM48fRULsOjfFIv2tyV68AWtcXNjB"  //sleutel om de bridge aan te sturen
const BASE_URL = `http://${BRIDGE_URL}/api/${API_KEY}/lights/` //beginstuk van de url

let batteryParagraph = document.getElementById("BP")

function runBattery() {
  navigator.getBattery().then(function(battery) {
    batteryParagraph.innerHTML = "Uw batterij is " + Math.round(battery.level * 100) + "%"
    let lightlevel = battery.level * 25000
    let body = `{"hue": ${lightlevel}}`;
    // let body = '{"hue": ' + lightlevel + '}'
    sendRequest(1, body);
  });
}



var update_loopbattery = setInterval(runBattery, 1000);
// var update_looplights = setInterval(cleurnverandrn, 1000);

function zetAan(){
  let body = '{"on": true}';
  sendRequest(1, body);
}
function brightness(){
  let body = '{"bri": 5}';
  sendRequest(1, body);
}

function zetUit(){
  let body = '{"on": false}';
  sendRequest(1, body);
}

// function cleurnverandrn(){
//   let lightlevel = battery.level * 25000
//   let body = '{"hue": lightlevel}';
//   sendRequest(1, body);
// }

function sendRequest(lampNumber, body){
	let http = new XMLHttpRequest();
       let url = BASE_URL + lampNumber + "/state";
	http.open("PUT", url);  //We gebruiken de URL om een PUT request naartoe te sturen
	http.onreadystatechange = function() {
		if(http.readyState == 4 && http.status == 200){
			console.log(http.responseText);
		}
	}
	http.send(body);  //Stuur de body van je request naar de bridge
}

var aanknop = document.getElementById("aanknop");
var uitknop = document.getElementById("uitknop");
aanknop.addEventListener("click", zetAan);
uitknop.addEventListener("click", zetUit);
