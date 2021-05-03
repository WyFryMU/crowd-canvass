var logoutFlag = false;
var fUserID;
(function() {
	console.log("loaded accountManage script");
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
    const logout = document.getElementById("logout");
	const newPassword = document.getElementById("newPassword");
	const confirmNewPassword = document.getElementById("confirmNewPassword");
	const changePassword = document.getElementById("changePassword");
	const accountTypeChange = document.getElementById("changeType");
	console.log(newPassword);
	console.log(newPassword.value);

	accountTypeChange.addEventListener("change", e => {
		console.log("Changed");
		firebase.firestore().collection("users").doc(fUserID).update({
			accountType: accountTypeChange.value
			//signedUpFor: eventIDs[e.path[1].id]
		  })
		  .then(() => {
			alert("You have sucessfully changed your account type.");
			console.log("Document successfully written!");
			//window.location = "accountMainPageAfterSignIn.html";
		  })
		  .catch((error) => {
			alert("Error while changing account type, please try again.");
			console.error("Error writing document: ", error);
		  }); 
		});
	
	changePassword.addEventListener('click', e => {
        if(newPassword.value == confirmNewPassword.value){
			console.log(newPassword);
			console.log(confirmNewPassword);
			var user = firebase.auth().currentUser;
			

			user.updatePassword(newPassword.value).then(function() {
			// Update successful.
				alert("Password has been sucessfully changed. Please relog.");
				firebase.auth().signOut();
			}).catch(function(error) {
			// An error happened.
				alert(error);
			});
		}else{
			console.log(newPassword);
			console.log(confirmNewPassword);
			//console.log(newPassword);
			console.log(confirmNewPassword.value);
			//alert("New passwords do not match.")
		}
        
    });

    //logout event
    logout.addEventListener('click', e => {
		logoutFlag = true;
        firebase.auth().signOut();
        window.location = "index.html";
    });
    //add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			fUserID = firebaseUser.uid;
			console.log(firebaseUser);
			console.log(firebaseUser.uid);
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