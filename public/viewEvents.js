var logoutFlag = false;
var fUserID;
var eventInfo = [];
var eventIDs = [];
var eventSignedUpFor;
(function() {
	console.log("loaded viewEvent script");
	const firebaseConfig = {
		apiKey: "AIzaSyAgEK90feSQbkemjfXMCWwTh-Mid7lAq1Y",
		authDomain: "crowdcanvass.firebaseapp.com",
		databaseURL: "https://crowdcanvass-default-rtdb.firebaseio.com",
		projectId: "crowdcanvass",
		storageBucket: "crowdcanvass.appspot.com",
		messagingSenderId: "805578793962",
		appId: "1:805578793962:web:a4784e3e4647f013d50893",
		};
		
	firebase.initializeApp(firebaseConfig);
	//get elements
	
	const logout = document.getElementById("logout");
	
	//logout event
	logout.addEventListener('click', e => {
		logoutFlag = true;
		firebase.auth().signOut();
		//window.location = "index.html";
	});

	//add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			fUserID = firebaseUser.uid;
		}else{
			if(logoutFlag){
				window.location = "index.html";
			}else{
				window.location = "signUpsignIn.html";	
			}
			console.log("No one is logged in");
			//alert("Please sign in.");
			//window.location = "signUpsignIn.html";
		}
	});
}());

const db = firebase.firestore();
db.collection("serviceEvents").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      console.log(doc.data());
      eventIDs.push(doc.id);
      eventInfo.push(doc.data());
  });
});
//Canvass Events map population
db.collection("canvassEvents").get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
    console.log(doc.data());
      eventIDs.push(doc.id);
      eventInfo.push(doc.data());
  });
});

setTimeout(function(){
    db.collection("users").doc(fUserID).get().then((doc) => {
        eventSignedUpFor = doc.get("signedUpFor");
        //console.log(eventSignedUpFor);
        //console.log(doc.data());
    });
},1500);
  



setTimeout(function(){
    var table = document.getElementById('eventList');

    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    cell1.appendChild(document.createTextNode("Event Title"));
    cell1.style.border = "1px solid black";
    cell1.style.padding = "5px";
    var cell1 = row.insertCell(1);
    cell1.appendChild(document.createTextNode("Description"));
    cell1.style.border = "1px solid black";
    cell1.style.padding = "5px";
    var cell1 = row.insertCell(2);
    cell1.appendChild(document.createTextNode("Amount Paid"));
    cell1.style.border = "1px solid black";
    cell1.style.padding = "5px";
    var cell1 = row.insertCell(3);
    cell1.appendChild(document.createTextNode("Address"));
    cell1.style.border = "1px solid black";
    cell1.style.padding = "5px";

    var count = 0;
    for(var i = 0; i < Object.keys(eventIDs).length; i++) {
        for(var j = 0; j < Object.keys(eventSignedUpFor).length; j++) {
            if(eventIDs[i] == eventSignedUpFor[j]){
                var table = document.getElementById('eventList');

                var rowCount = table.rows.length;
                var row = table.insertRow(rowCount);
            
                var cell1 = row.insertCell(0);
                cell1.appendChild(document.createTextNode(eventInfo[i].eventTitle));
                cell1.style.border = "1px solid black";
                cell1.style.padding = "5px";
                var cell1 = row.insertCell(1);
                cell1.appendChild(document.createTextNode(eventInfo[i].des));
                cell1.style.border = "1px solid black";
                cell1.style.padding = "5px";
                var cell1 = row.insertCell(2);
                cell1.appendChild(document.createTextNode("$" + eventInfo[i].amountPaid));
                cell1.style.border = "1px solid black";
                cell1.style.padding = "5px";
                var cell1 = row.insertCell(3);
                cell1.appendChild(document.createTextNode(eventInfo[i].route1Addresses));
                cell1.style.border = "1px solid black";
                cell1.style.padding = "5px";
                var cell1 = row.insertCell(4);
                cell1.appendChild(document.createElement("button")).appendChild(document.createTextNode("Un-Register"));
                cell1.id = count;
                cell1.name = count.toString;
                console.log(cell1);
                count++;
                cell1.style.border = "1px solid black";
                cell1.style.padding = "5px";
                cell1.addEventListener('click', e => {
                    console.log("path");
                    
                    console.log(e);
                    console.log(e.path[1].id);
                    console.log("eventId");
                    console.log(eventIDs[e.path[1].id]);
                    firebase.firestore().collection("users").doc(fUserID).update({
                      signedUpFor: firebase.firestore.FieldValue.arrayRemove(eventSignedUpFor[e.path[1].id])
                      //signedUpFor: eventIDs[e.path[1].id]
                    })
                    .then(() => {
                      alert("You have sucessfully unregistered for this event.");
                      console.log("Document successfully written!");
                      //window.location = "accountMainPageAfterSignIn.html";
                    })
                    .catch((error) => {
                      alert("Error while unregistering, please try again.");
                      console.error("Error writing document: ", error);
                    });  
                  });
            }
        }
    }
}, 3000);