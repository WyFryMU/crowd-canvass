(function() {
	console.log("loaded generateSurvey script");
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
	const submitBtn = document.getElementById("submitBtn");
	const logout = document.getElementById("logout");
    const surveyName = document.getElementById("name");
	
	//logout event
	logout.addEventListener('click', e => {
		firebase.auth().signOut();
		window.location = "index.html";
	});

	//add realtime listener
	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser){
			//submit survey QnA
			submitBtn.addEventListener('click', e => {
			// Add a new document in collection "users"
				var questions = document.querySelectorAll("[name='question[]']");
				var answer1 = document.querySelectorAll("[name='answer1[]']");
				var answer2 = document.querySelectorAll("[name='answer2[]']");
                var questionsArray = [];
                var answer1Array = [];
                var answer2Array = [];
	
				for(var i = 0; i < questions.length; i++) {
                    questionsArray.push(questions[i].value);
                    answer1Array.push(answer1[i].value);
                    answer2Array.push(answer2[i].value);
					console.log(questions[i].value);
					console.log(answer1[i].value);
					console.log(answer2[i].value);
                    
				}
                console.log(questionsArray);
			firebase.firestore().collection("surveys").add({
				userID: firebaseUser.uid,
                surveyName: surveyName.value,
				questions: questionsArray,
                answer1: answer1Array,
                answer2: answer2Array
			})
			.then(() => {
				console.log("Document successfully written!");
				//window.location = "accountMainPageAfterSignIn.html";
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