var accountType;
var logoutFlag = false;
(function() {
	
	console.log("loaded signup script");
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
			console.log(firebaseUser);

			console.log(firebaseUser.uid);
			const db = firebase.firestore();
  			db.collection("users").doc(firebaseUser.uid).get().then((doc) => {
    			accountType = doc.get("accountType");
				console.log("Inside");
				console.log(accountType);
			});
			//window.location.href = "accountMainPageAfterSignIn.html";
		}else{
			if(logoutFlag){
				window.location = "index.html";
			}else{
				window.location = "signUpsignIn.html";	
			}
		}
	});
}());
setTimeout( function(){
	console.log("Outside");
	console.log(accountType);
} ,2000);

function organizerOnly(){
	if(accountType == "organizer"){
		return true;
	}
	else{
		alert("You do not have the right account type to view this page.")
		return false;
	}
}