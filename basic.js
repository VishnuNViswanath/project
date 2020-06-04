function change() {
  let value = document.getElementById("btn");

  if (value.innerText === "Connect") {
    value.innerHTML = "<span id = 'disconnectButton'>Disconnect</span";
    let value1 = document.getElementById("message");
    value1.innerHTML = "<b>Active</b>";
    
  } else {
    value.innerHTML = "<span id = 'connectButton'>Connect</span";
    let value1 = document.getElementById("message");
    value1.innerHTML = "<b>Inactive</b>";
  }
}
let pubkey = 'BQ1WS9VUTSKgLodGobPCBTExfp1gi7Lm';

let xmlhttp = new XMLHttpRequest();
let url = "http://novice-997.appspot.com/blockchain";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";
    var i;
    for(i = 0; i < arr.length; i++) {
        out += '<a href="' + arr[i].url + '">' +
        arr[i].display + '</a><br>';
    }
    bitcoin.chain = out;
}

const wallet = new Wallet();
wallet.generateKeyPair();
let address = wallet.getAddress();


const bitcoin = new Blockchain();
let value3 = document.getElementById("height");
value3.innerText = bitcoin.chain.length;

let value2 = document.getElementById("address");
value2.innerText = pubkey;


console.log(bitcoin.chain);






