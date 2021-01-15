const signupForm = document.getElementById('signup-form');
const email = document.getElementById('email');
const password = document.getElementById('password');

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    if (checkInputs()) {
        signupForm.submit();
    }
});

function checkInputs() {
    var isValidFormInput = true;
    // trim to remove the whitespaces

    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

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
    return isValidFormInput;
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