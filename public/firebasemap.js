// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;
var markersArray = [];
var eventInfo = [];
var eventIDs = [];
var firebaseUser;
var logoutFlag = false;
var accountType;

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

function initMap() {
  //starting map
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.0389, lng: -87.906 },
    zoom: 13,
  });
  infoWindow = new google.maps.InfoWindow();
    //Geolocation 
    if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          infoWindow.setPosition(pos);
          map.setCenter(pos);
          const marker = new google.maps.Marker({
            position: pos,
            map,
            title: "Current Location",
            icon: {
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
          });
          
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    };
  //});


  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
  // Marker with text on click
    //Geocode 
    const geocoder = new google.maps.Geocoder();
    //adding events to map
    populateMap(geocoder, map);
    //console.log(markersArray);
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
          const db = firebase.firestore();
          db.collection("users").doc(firebaseUser.uid).get().then((doc) => {
            accountType = doc.get("accountType");
          console.log("Inside");
          console.log(accountType);
          });
        console.log(firebaseUser);
        console.log(firebaseUser.uid);
        this.firebaseUser = firebaseUser;
      }else{
        console.log("not logged in");
        if(logoutFlag){
          window.location = "index.html";
        }else{
          window.location = "signUpsignIn.html";	
        }
      }
    });
    setTimeout( //see comment right below
      function(){
        for(var i = 0; i < markersArray.length; i++){
          google.maps.event.addListener(markersArray[i], 'click', function(){
            this.infoWindow.open(map, this);
          });
          
        }
        console.log(eventInfo);
        console.log(eventIDs);
        //adds address to show on screen

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
        for(var i = 0; i < Object.keys(eventInfo).length; i++) {
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
          cell1.appendChild(document.createElement("button")).appendChild(document.createTextNode("Sign Up"));
          cell1.id = count;
          cell1.name = count.toString;
          console.log(cell1);
          count++;
          cell1.style.border = "1px solid black";
          cell1.style.padding = "5px";
          //add listeners to sign up buttons
          cell1.addEventListener('click', e => {
            console.log("path");
            
            console.log(e);
            console.log(e.path[1].id);
            console.log("eventId");
            console.log(eventIDs[e.path[1].id]);
            firebase.firestore().collection("users").doc(firebaseUser.uid).update({
              signedUpFor: firebase.firestore.FieldValue.arrayUnion(eventIDs[e.path[1].id])
              //signedUpFor: eventIDs[e.path[1].id]
            })
            .then(() => {
              alert("You have sucessfully signed up.");
              console.log("Document successfully written!");
              //window.location = "accountMainPageAfterSignIn.html";
            })
            .catch((error) => {
              alert("Error while signing up, please try again.");
              console.error("Error writing document: ", error);
            });  
          });
        }

        





      }, 3000); //wait 3 seconds before running this code so the array can populate before we add listeners
}

function populateMap(geocoder, resultsMap) {  
  var lat, long;
  //Service Events map population
  const db = firebase.firestore();
  db.collection("serviceEvents").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        //console.log(doc.get("route1Addresses"));
        var address = doc.get("route1Addresses");
        eventIDs.push(doc.id);
        eventInfo.push(doc.data());
        geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK") {
          //console.log(results[0].geometry.location);
          lat = results[0].geometry.location.lat();
          long = results[0].geometry.location.lng();
          var marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: resultsMap,
            latitude: lat,
            longitude: long
        });
        const eventTitle = doc.get("eventTitle");
        const des = doc.get("des");
        console.log(des);
        const amountPaid = doc.get("amountPaid");
        const route1Addresses = doc.get("route1Addresses");
        const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">'+ eventTitle + '</h1>' +
        '<div id="bodyContent">' +
        "<p> Event Description: "+ des + "</p>" +
        "<p> Amount Paid: "+ amountPaid + "</p>" +
        "<p> Address: "+route1Addresses+"</p>" +
        "</div>" +
        "</div>";
        marker.infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
        //console.log(results[0].geometry.location);
        markersArray.push(marker);
      }/* else {
        alert("Geocode was not successful for the following reason: " + status);
      }*/
    });
    });
  });
  //Canvass Events map population
  db.collection("canvassEvents").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        //console.log(doc.get("route1Addresses"));
        var address = doc.get("route1Addresses");
        eventIDs.push(doc.id);
        eventInfo.push(doc.data());
        geocoder.geocode({ address: address }, (results, status) => {
          if (status === "OK") {
            lat = results[0].geometry.location.lat();
            long = results[0].geometry.location.lng();
            var marker = new google.maps.Marker({
              position: results[0].geometry.location,
              map: resultsMap,
              latitude: lat,
              longitude: long
            });
            const eventTitle = doc.get("eventTitle");
            const des = doc.get("des");
            console.log(des);
            const amountPaid = doc.get("amountPaid");
            const route1Addresses = doc.get("route1Addresses");
            const contentString =
            '<div id="content">' +
            '<div id="siteNotice">' +
            "</div>" +
            '<h1 id="firstHeading" class="firstHeading">'+ eventTitle + '</h1>' +
            '<div id="bodyContent">' +
            "<p> Event Description: "+ des + "</p>" +
            "<p> Amount Paid: "+ amountPaid + "</p>" +
            "<p> Address: "+route1Addresses+"</p>" +
            "</div>" +
            "</div>";
            marker.infoWindow = new google.maps.InfoWindow({
              content: contentString
            });
            markersArray.push(marker);
          }/* else {
        alert("Geocode was not successful for the following reason: " + status);
      }*/
        });
    });
  });
}

function organizerOnly(){
	if(accountType == "organizer"){
		return true;
	}
	else{
		alert("You do not have the right account type to view this page.")
		return false;
	}
}

    
  