const form = document.querySelector("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

const toggleP = document.getElementById('togglePass');

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

// inner errors
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

// global failure errors
function showGlobalError(message) {

    // remove old global errors
    document.querySelectorAll(".global-error").forEach(el => el.remove());

    const globalError = document.createElement("div");

    globalError.classList.add("global-error");
    globalError.textContent = message;
    globalError.style.color = "red";
    globalError.style.fontSize = "14px";
    globalError.style.marginBottom = "10px";

    const form = document.querySelector("form");

    // insert the <div> at the top of the form 
    form.prepend(globalError);
}

// handle submit
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let errors = {};

    const Email = email.value;
    const Password = password.value;

    if( Email.trim() === "" ) errors.email = "This field is required";
    if( Password.trim() === "" ) errors.password = "This field is required";
    
    showErrors(errors);
    if (Object.keys(errors).length > 0) return;


    // authentication
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(
        user => user.email === Email && user.password === Password
    );

    if (!userFound) {
        showGlobalError("Login failed! Invalid email or password");
        return;
    }

    // store current user session
    localStorage.setItem("currentUser", JSON.stringify(userFound));

    // redirect
    if (Admin) {
        localStorage.setItem("role", "admin");
        window.location.href = "adminpage.html";
    } else {
        localStorage.setItem("role", "user");
        window.location.href = "userpage.html";
    }
    
});
