const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const processSignInButton = document.getElementById('processSignIn');
const processSignUpButton = document.getElementById('processSignUp');
var userID;

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

processSignUpButton.addEventListener('click', () => {
	let fName = document.getElementById("firstName").value;
	let lName = document.getElementById("lastName").value;
	let login = document.getElementById("Login").value;
	let pass = document.getElementById("password").value;

	if(fName == '' || fName == null 
	|| lName == '' || lName == null 
	|| login == '' || login == null 
	|| pass == '' || pass == null){
		alert("Please Fill All Required Field");
		return;
	}

	fetch('http://cop4331group20.online/LAMPAPI/SignUp.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			firstName: fName,
			lastName: lName,
			login: login,
			password: pass,
			userId: 1
		})
	}).then(res => {
		return res.json()
	})
	.then(data =>{
		console.log(data);
		location.href = "./index.html";
	} )
	.catch(error => console.log('ERROR: Failed Account creation'))

});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

processSignInButton.addEventListener('click', () => {
	let user = document.getElementById("Username").value;
	let pass = document.getElementById("Password").value;
  let loginError = document.getElementById("loginError");

	if(user == null || user == '' || pass == null || pass == ''){
		loginError.textContent = 'Username or Password is incorrect';
		console.log('Failed try again');
		return;
	}

	fetch('http://cop4331group20.online/LAMPAPI/Login.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			login: user,
			password: pass
		})
	}).then(res => {
		return res.json()
	})
	.then(data =>{
		console.log(data);
   if(data["error"] != '' || data["id"] == null){
			loginError.textContent = 'Username or Password is incorrect';
			return;
		}
		sessionStorage.setItem("auth", 1);
		sessionStorage.setItem("userId", data["id"]);
		sessionStorage.setItem("firstName", data["firstName"]);
		location.href = "./contacts.html";
	})
	.catch(error => console.log('ERROR: Failed Login'))
	//place api call here
});

