// get scratch-api

var Scratch = require("scratch-api");

var username = "";
var password = "";
var project_id = -1;
var cloud;

function encode(text){
	var alpha = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~�";
	var next;
	var result="";

	for(var i=0;i<text.length;i++){
		next=(alpha.indexOf(text[i])+1).toString();
		if(next.length==1){
			next="0"+next;
		}
		result+=next;
	}
	return result;
}	

Scratch.UserSession.create(username, password, function(e, user) {
  if (e) { return console.error(e); }
  console.log("Logged in.");
  user.cloudSession(project_id, function(e, cloud_) {
    if (e) { return console.error(e); }
    console.log("Cloud connected.")
    cloud = cloud_;
    cloud.set("\u2601 myVar", "1")
  });
});

/*test file*/
