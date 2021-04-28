// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
let map, infoWindow;
var markersArray = [];
const contentString =
'<div id="content">' +
'<div id="siteNotice">' +
"</div>" +
'<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
'<div id="bodyContent">' +
"<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
"sandstone rock formation in the southern part of the " +
"Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
"south west of the nearest large town, Alice Springs; 450&#160;km " +
"(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
"features of the Uluru - Kata Tjuta National Park. Uluru is " +
"sacred to the Pitjantjatjara and Yankunytjatjara, the " +
"Aboriginal people of the area. It has many springs, waterholes, " +
"rock caves and ancient paintings. Uluru is listed as a World " +
"Heritage Site.</p>" +
'<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
"https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
"(last visited June 22, 2009).</p>" +
"</div>" +
"</div>";

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
  const chicago = { lat: 41.881, lng: -87.623 };

    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });
    const marker = new google.maps.Marker({
      position: chicago,
      map,
      title: "Chicago",
    });
    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });
    //console.log("marker");
    //console.log(marker);
    //Geocode 
    const geocoder = new google.maps.Geocoder();
    //adding events to map
    populateMap(geocoder, map);
    //console.log(markersArray);
    setTimeout(
      function(){
        for(var i = 0; i < markersArray.length; i++){
          google.maps.event.addListener(markersArray[i], 'click', function(){
            this.infoWindow.open(map, this);
          });
          
        }
      }, 3000); //wait 3 seconds before running this code so the array can populate
}

function populateMap(geocoder, resultsMap) {  
  var lat, long;
  //Service Events map population
  const db = firebase.firestore();
  db.collection("serviceEvents").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        //console.log(doc.get("route1Addresses"));
        var address = doc.get("route1Addresses");
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



    
  