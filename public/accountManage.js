var logoutFlag = false;
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
	console.log(newPassword);
	console.log(newPassword.value);
	
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