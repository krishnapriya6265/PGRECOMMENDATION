/* ===== INPUT STYLE FUNCTIONS ===== */

function setError(inputId){
    let input = document.getElementById(inputId);
    input.classList.add("error");
    input.classList.remove("success");
}

function setSuccess(inputId){
    let input = document.getElementById(inputId);
    input.classList.remove("error");
    input.classList.add("success");
}


/* ===== VALIDATION FUNCTION ===== */

function validateRegister(){

let fname = document.getElementById("fname").value.trim();
let lname = document.getElementById("lname").value.trim();
let phone = document.getElementById("phone").value.trim();
let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value;
let confirm = document.getElementById("confirm_password").value;

let fnameError = document.getElementById("fnameError");
let lnameError = document.getElementById("lnameError");
let phoneError = document.getElementById("phoneError");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let confirmPasswordError = document.getElementById("confirmPasswordError");

/* CLEAR OLD ERRORS */
fnameError.innerText = "";
lnameError.innerText = "";
phoneError.innerText = "";
emailError.innerText = "";
passwordError.innerText = "";
confirmPasswordError.innerText = "";

let valid = true;

/* REGEX PATTERNS */
let namePattern = /^[A-Za-z\s]{5,}$/;
let phonePattern = /^[0-9]{10}$/;
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;


/* ===== FIRST NAME ===== */
if(fname === ""){
    fnameError.innerText = "First name is required";
    setError("fname");
    valid = false;
}
else if(!namePattern.test(fname)){
    fnameError.innerText = "First name must contain letters (minimum 5 characters)";
    setError("fname");
    valid = false;
}
else{
    setSuccess("fname");
}


/* ===== LAST NAME ===== */
if(lname === ""){
    lnameError.innerText = "Last name is required";
    setError("lname");
    valid = false;
}
else if(!namePattern.test(lname)){
    lnameError.innerText = "Last name must contain letters (minimum 5 characters)";
    setError("lname");
    valid = false;
}
else{
    setSuccess("lname");
}


/* ===== PHONE ===== */
if(phone === ""){
    phoneError.innerText = "Phone number is required";
    setError("phone");
    valid = false;
}
else if(!phonePattern.test(phone)){
    phoneError.innerText = "Phone number must be 10 digits";
    setError("phone");
    valid = false;
}
else{
    setSuccess("phone");
}


/* ===== EMAIL ===== */
if(email === ""){
    emailError.innerText = "Email is required";
    setError("email");
    valid = false;
}
else if(!emailPattern.test(email)){
    emailError.innerText = "Please enter a valid email address";
    setError("email");
    valid = false;
}
else{
    setSuccess("email");
}


/* ===== PASSWORD ===== */
if(password === ""){
    passwordError.innerText = "Password is required";
    setError("password");
    valid = false;
}
else if(!passwordPattern.test(password)){
    passwordError.innerText = "Password must include uppercase, lowercase, number and special character.";
    setError("password");
    valid = false;
}
else{
    setSuccess("password");
}


/* ===== CONFIRM PASSWORD ===== */
if(confirm === ""){
    confirmPasswordError.innerText = "Confirm password is required";
    setError("confirm_password");
    valid = false;
}
else if(password !== confirm){
    confirmPasswordError.innerText = "Passwords do not match";
    setError("confirm_password");
    valid = false;
}
else{
    setSuccess("confirm_password");
}

return valid;
}


/* ===== FORM SUBMIT ===== */

document.getElementById("registerForm").addEventListener("submit", function(e){

e.preventDefault();

if(!validateRegister()){
    return;
}

let formData = new FormData(this);

fetch("/register_user",{
    method:"POST",
    body:formData
})
.then(response=>response.json())
.then(data=>{

    let emailError=document.getElementById("emailError");
    emailError.innerText="";

    if(data.status==="error"){
        emailError.innerText=data.message;
        setError("email");
    }

    if(data.status==="success"){
        alert(data.message);
        window.location.href="/login";
    }

});

});


/* ===== REMOVE ERROR WHILE TYPING ===== */

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        input.classList.remove("error");
    });
});