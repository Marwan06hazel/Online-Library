// to get the elements themselves
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');
const toggleP = document.getElementById('togglePass');
const toggleC = document.getElementById('toggleConfirm');

// show/hide password
toggleP.addEventListener("click", () => {
    if(password.type === "password") {
        password.type = "text";
        toggleP.classList.remove("fa-eye");
        toggleP.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        toggleP.classList.remove("fa-eye-slash");
        toggleP.classList.add("fa-eye");
    }
});

toggleC.addEventListener("click", () => {
    if(confirm.type === "password") {
        confirm.type = "text";
        toggleC.classList.remove("fa-eye");
        toggleC.classList.add("fa-eye-slash");
    } else {
        confirm.type = "password";
        toggleC.classList.remove("fa-eye-slash");
        toggleC.classList.add("fa-eye");
    }
});

// helper function to check empty fields
function isEmpty(inputValue, keyName, errorObj){
    if( inputValue.trim() === "" ) errorObj[keyName] = "This field is required";
}

// showing the errors
function showErrors(errors){
    // remove old errors using the class .error
    document.querySelectorAll(".error").forEach(el => el.remove());
    for(var keyName in errors){
        let inputField = document.getElementById(keyName); //accessing the specific input
        let errorDiv = document.createElement("div");      //creating <div> for displaying error
        errorDiv.classList.add("error");         // giving the div element a className = error
        errorDiv.textContent = errors[keyName];  // writing the error in the div
        errorDiv.style.color = "red";            //styling
        errorDiv.style.fontSize = "14px";
        // insert the <div> after/under each input
        inputField.insertAdjacentElement("afterend", errorDiv);
    }
}

// handling submit
document.querySelector("form").addEventListener("submit", (e) => {
    const Username = document.getElementById('username').value;
    const Email = document.getElementById('email').value;
    const Password = password.value;
    const Confirm = confirm.value;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    let errors = {};
    // validations
    isEmpty(Username, "username", errors);
    isEmpty(Email, "email", errors);
    isEmpty(Password, "password", errors);
    isEmpty(Confirm, "confirm", errors);
    if(Email && !Email.includes('@')) errors.email = "Invalid email";
    if(Password && !passwordRegex.test(Password)) errors.password = "Password must contain at least 8 characters, including letters, numbers, and special characters";
    if(Confirm && Confirm != Password) errors.confirm = "Password doesn't match, Please try again.";
    showErrors(errors);
    if(Object.keys(errors).length > 0) e.preventDefault();
});