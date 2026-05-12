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

document.querySelector("form").addEventListener("submit", (e) => {
    let errors = {};
    if(password.value.trim() === "") errors.password = "This field is required";
    if(document.getElementById("email").value.trim() === "") errors.email = "This field is required";
    showErrors(errors);
    if(Object.keys(errors).length > 0) e.preventDefault();
});