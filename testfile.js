// get scratch-api

var Scratch = require("scratch-api");

var username = "";
var password = "";
var project_id = -1;
var cloud;


function encrypt(data) {
  var chars = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~�"
  var output = "";
  var charIndex;
  for (var i = 0; i < data.length; i++) {
    charIndex = (chars.indexOf(data[i])+1).toString();
    if (charIndex.length == "1") {
      output += "0" + charIndex;
    } else {
      output += charIndex;
    }
  }
  return output + "00";
}

function runGenerator() {
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", "https://randomuser.me/api/", true);
  xhttp.send();
  cloud.set("\u2601 randomUser", encrypt(JSON.stringify(xhttp.responseText)));
  setTimeout(runGenerator, 10000);
}

Scratch.UserSession.create(username, password, function(e, user) {
  if (e) { return console.error(e); }
  console.log("Logged in.");
  user.cloudSession(project_id, function(e, cloud_) {
    if (e) { return console.error(e); }
    console.log("Cloud connected.")
    cloud = cloud_;
    runGenerator();
  });
});
