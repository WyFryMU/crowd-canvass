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
	const btnCreateAccount = document.getElementById("createAccount");
	
	const txtName = document.getElementById("name");
	const txtAccountUserName = document.getElementById("accountUsername");
	const selectType = document.getElementById("type");
	
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
			console.log(firebaseUser.uid);
			// Add a new document in collection "users"
			firebase.firestore().collection("users").doc(firebaseUser.uid).set({
				name: txtName.value,
				username: txtAccountUserName.value,
				accountType: selectType.value
			})
			.then(() => {
				console.log("Document successfully written!");
				window.location = "accountMainPageAfterSignIn.html";
			})
			.catch((error) => {
				console.error("Error writing document: ", error);
			});
			
		}else{
			console.log("not logged in");
		}
	});
}());