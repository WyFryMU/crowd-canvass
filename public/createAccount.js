(function() {
	console.log("loaded createAcct script");
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
	const txtEmail = document.getElementById("email");
	const txtPassword = document.getElementById("password");
	const btnCreateAccount = document.getElementById("testButton");
	
	//signup event
	btnCreateAccount.addEventListener('click', e => {
		//get email and password
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		//sign in
		const promise = auth.createUserWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	});
	
	//add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			console.log(firebaseUser);
			window.location.href = "accountMainPageAfterSignIn.html";
		}else{
			console.log("not logged in");
		}
	});
}());