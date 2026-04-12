// to get the elements themselves
const form = document.querySelector("form");

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm = document.getElementById('confirm');

const checkBox = document.getElementById('admin');
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
form.addEventListener("submit", (e) => {

    // variables (uppercase) for storing the input values of the elements when submitting
    const Username = username.value;
    const Email = email.value;
    const Password = password.value;
    const Confirm = confirm.value;
    const Admin = checkBox.checked;

    let errors = {};  
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // prevent default reload
    e.preventDefault()

    // validations
    isEmpty(Username, "username", errors);
    isEmpty(Email, "email", errors);
    isEmpty(Password, "password", errors);
    isEmpty(Confirm, "confirm", errors);

    if(Email && !Email.includes('@')) errors.email = "Invalid email"
    if(Password && !passwordRegex.test(Password)) errors.password = "Password must contain at least 8 characters, including letters, numbers, and special characters"
    if(Confirm && Confirm != Password) errors.confirm = "Password doesn't match, Please try again."

    // load existing users & check duplicate email
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some(user => user.email === Email);
    if (exists) errors.email = "Email already exists";
    
    showErrors(errors);

    if (Object.keys(errors).length === 0){

        // store user data
        const newUser = {
            id: Date.now(),
            username: Username,
            email: Email,
            password: Password,
            role: Admin ? "admin" : "user",
            borrowedBooks: [],
            favorites: [],
            history: []
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
    
        // redirect to the corresponding home page
        if (Admin) {
            localStorage.setItem("role", "admin");
            window.location.href = "adminpage.html";
        } else {
            localStorage.setItem("role", "user");
            window.location.href = "userpage.html";
        }
    }

})
