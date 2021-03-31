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
	
    //logout event
    logout.addEventListener('click', e => {
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
			console.log("not logged in");
            //alert("Please sign in.");
            //window.location = "signUpsignIn.html";
		}
	});
}());