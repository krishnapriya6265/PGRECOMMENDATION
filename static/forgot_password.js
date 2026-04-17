function validateForgotForm(){

let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value.trim();
let confirm = document.getElementById("confirm_password").value.trim();

let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let confirmPasswordError = document.getElementById("confirmPasswordError");

emailError.innerText = "";
passwordError.innerText = "";
confirmPasswordError.innerText = "";
let valid = true;

let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

if(!emailPattern.test(email)){
emailError.innerText = "Please enter a valid email address";
valid = false;
}

if(!passwordPattern.test(password)){
passwordError.innerText = "Password must contain uppercase, lowercase, number and symbol";
valid = false;   
}

if(password !== confirm){
confirmPasswordError.innerText = "Passwords do not match";
valid = false;
}
return valid;
}