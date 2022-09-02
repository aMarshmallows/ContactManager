const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const processSignInButton = document.getElementById('processSignIn');
const processSignUpButton = document.getElementById('processSignUp');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

processSignUpButton.addEventListener('click', () => {
	let name = document.getElementById("name1").value;
	let user = document.getElementById("user1").value;
	let pass = document.getElementById("pass1").value;

	//place api call here 
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

processSignInButton.addEventListener('click', () => {
	let user = document.getElementById("Username").value;
	let pass = document.getElementById("Password").value;

	window.confirm("hujibi ");
	//place api call here
});