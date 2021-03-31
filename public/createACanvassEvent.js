(function() {
	console.log("loaded createCanvassEvent script");
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
	const radioHourly = document.getElementById("hourly");
	const radioService = document.getElementById("service");
	const amountPaid = document.getElementById("amountPaid");
	const routesCanvassed = document.getElementById("routesCanvassed");
	const route1Addresses = document.getElementById("route1Addresses");
	const route2Addresses = document.getElementById("route2Addresses");
	const route3Addresses = document.getElementById("route3Addresses");

	//var user = firebase.auth().currentUser;
	//console.log(user);
	//console.log(user.uid);

	const btnCreateACanvassEvent = document.getElementById("createACanvassEvent");

	const logout = document.getElementById("logout");
	
	//logout event
	logout.addEventListener('click', e => {
		firebase.auth().signOut();
		window.location = "index.html";
	});

	//add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			//signup event
			btnCreateACanvassEvent.addEventListener('click', e => {
			// Add a new document in collection "users"
			firebase.firestore().collection("canvassEvents").add({
				userID: firebaseUser.uid,
				amountPaid: amountPaid.value,
				routesCanvassed: routesCanvassed.value,
				route1Addresses: route1Addresses.value,
				route2Addresses: route2Addresses.value,
				route3Addresses: route3Addresses.value,
				radioHourly: radioHourly.checked,
				radioService: radioService.checked
			})
			.then(() => {
				console.log("Document successfully written!");
				window.location = "accountMainPageAfterSignIn.html";
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
			});
		}else{
			console.log("No one is logged in");
			//alert("Please sign in.");
			//window.location = "signUpsignIn.html";
		}
	});
}());