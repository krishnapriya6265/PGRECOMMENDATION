// ---------------- LOGIN VALIDATION ----------------
function validateLogin(){

let email = document.getElementById("email").value.trim();
let password = document.getElementById("password").value.trim();

let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

emailError.innerText = "";
passwordError.innerText = "";

let valid = true;

// Email pattern
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email validation
if(email === ""){
emailError.innerText = "Email is required";
valid = false;
}
else if(!emailPattern.test(email)){
emailError.innerText = "Enter a valid email address";
valid = false;
}

// Password validation
if(password === ""){
passwordError.innerText = "Password is required";
valid = false;
}

// 🔥 Loading effect
if(valid){
let btn = document.querySelector("button[type='submit']");
btn.innerText = "Logging in...";
btn.disabled = true;
}

return valid;
}


// ---------------- AUTO HIDE FLASH MESSAGE ----------------
window.onload = function(){

setTimeout(function(){

let msg = document.querySelector(".server-msg");

if(msg){
msg.style.transition = "opacity 0.5s";
msg.style.opacity = "0";

setTimeout(()=>{
msg.remove();
},500);
}

},3000);

}