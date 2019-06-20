const BRIDGE_URL = "192.168.178.172"  // IP adres van de bridge
const API_KEY = "l1SJ36Y-mE6pM48fRULsOjfFIv2tyV68AWtcXNjB"  //sleutel om de bridge aan te sturen
const BASE_URL = `http://${BRIDGE_URL}/api/${API_KEY}/lights/` //beginstuk van de url

navigator.getBattery().then(function(battery) {
    console.log("test: " + battery.level);
});

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}

function zetAan(){
  let body = '{"on": true}';
  sendRequest(1, body);
}

function zetUit(){
  let body = '{"on": false}';
  sendRequest(1, body);
}

function Rood(){
  let body = '{"hue": 255}';
  sendRequest(1, body);
}

function Groen(){
  let body = '{"hue": 14000}';
  sendRequest(1, body);
}

function Bri(){
  let body = '{"bri": 75}';
  sendRequest(1, body);
}

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
var rood = document.getElementById("rood");
var groen = document.getElementById("groen");
var bri = document.getElementById("bri");
aanknop.addEventListener("click", zetAan);
uitknop.addEventListener("click", zetUit);
rood.addEventListener("click", Rood);
groen.addEventListener("click", Groen);
bri.addEventListener("click", Bri);
