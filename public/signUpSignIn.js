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
	const signIn = document.getElementById("signIn");
	const forgotPasswordBtn = document.getElementById("forgotPassword");
	//const dontHaveAnAccountSignUp = document.getElementById("dontHaveAnAccountSignUp");
	const txtEmail = document.getElementById("email");
	const txtPassword = document.getElementById("password");
	
	//signup event
	signIn.addEventListener('click', e => {
		//get email and password
		const email = txtEmail.value;
		const pass = txtPassword.value;
		const auth = firebase.auth();
		if(email == ""){
			alert("Please enter your email.");
		}else if(pass == ""){
			alert("Please enter your password.");
		}
		//sign in
		const promise = auth.signInWithEmailAndPassword(email,pass);
		promise.catch(e => console.log(e.message));
	});

	//forgot password event
	forgotPasswordBtn.addEventListener('click', e => {
		//get email and password
		if(email.value == ""){
			alert("Please enter your email then click forgot password.");
		}else{
		const email = txtEmail.value;
		const auth = firebase.auth();
		//sign in
		const promise = auth.sendPasswordResetEmail(email);
		promise.catch(e => console.log(e.message));
		alert("Check your email to reset your password.");
		}
	});
	
	/*dontHaveAnAccountSignUp.addEventListener('click', e => {
		window.location.href = "createAnAccount.html";
	});*/
	
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