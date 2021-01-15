const signupForm = document.getElementById('signup-form');
const fullName = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const rePassword = document.getElementById('re_password');

signupForm.addEventListener('submit', e => {
	e.preventDefault();
	if (checkInputs()) {
		$.ajax({
			type: "POST",
			url: '/ajax-register',
			data: { email: email.value },
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			success: function (response) {				
				console.log(response);
				console.log(!!response);
				if (response==="This email already exists !") {
					setErrorFor(email, response);
				} else if (response==="Email is available !"){
					signupForm.submit();
				}
			}
		});
	}
});

function checkInputs() {
	var isValidFormInput = true;
	// trim to remove the whitespaces
	const nameValue = fullName.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const rePasswordValue = rePassword.value.trim();

	if (nameValue === '') {
		setErrorFor(fullName, 'Full name cannot be blank');
		isValidFormInput = false;
	} else {
		setSuccessFor(fullName);
	}

	if (emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
		isValidFormInput = false;
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
		isValidFormInput = false;
	} else {
		setSuccessFor(email);
	}

	if (passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
		isValidFormInput = false;
	} else {
		setSuccessFor(password);
	}

	if (rePasswordValue === '') {
		setErrorFor(rePassword, 'Confirmed password cannot be blank');
		isValidFormInput = false;
	} else if (passwordValue !== rePasswordValue) {
		setErrorFor(rePassword, 'Passwords do not match');
		isValidFormInput = false;
	} else {
		setSuccessFor(rePassword);
	}
	return isValidFormInput
}

function setErrorFor(input, message) {
	const formGroup = input.parentElement;
	const small = formGroup.querySelector('small');
	formGroup.className = 'form-group error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formGroup = input.parentElement;
	formGroup.className = 'form-group success';
}

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}