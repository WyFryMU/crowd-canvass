var logoutFlag = false;
var accountType;
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
	const eventTitle = document.getElementById("eventTitle");
	const des = document.getElementById("des");
	const amountPaid = document.getElementById("amountPaid");
	const route1Addresses = document.getElementById("route1Addresses");
	const formLink = document.getElementById("formLink");


	//var user = firebase.auth().currentUser;
	//console.log(user);
	//console.log(user.uid);

	const btnCreateACanvassEvent = document.getElementById("createACanvassEvent");

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
				if(accountType == "volunteer"){
					window.location = "accountMainPageAfterSignIn.html";
				}
			});
			//signup event
			btnCreateACanvassEvent.addEventListener('click', e => {
			// Add a new document in collection "users"
				firebase.firestore().collection("canvassEvents").add({
					userID: firebaseUser.uid,
					eventTitle: eventTitle.value,
					des: des.value,
					amountPaid: amountPaid.value,
					route1Addresses: route1Addresses.value,
					formLink: formLink.value
				})
				.then(() => {
					console.log("Document successfully written!");
					alert("Event created.");
					window.location = "accountMainPageAfterSignIn.html";
				})
				.catch((error) => {
					console.error("Error writing document: ", error);
					alert(error);
				});
			});
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