function openEdit() {
    document.getElementById("editBox").style.display = "block";

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    document.getElementById("nameInput").value = currentUser.username;
    document.getElementById("emailInput").value = currentUser.email;
}


function closeEdit() {
    document.getElementById("editBox").style.display = "none";
}


// Save Changes
function saveChanges() {

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let uid = localStorage.getItem("currentUserId");

    // read updates values from the form
    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;

    let userIndex = users.findIndex(user => user.id == uid);

    if (userIndex === -1) return;

    // update user info actually in database
    if (name) {
        users[userIndex].username = name;
        currentUser.username = name;
    }

    if (email) {
        users[userIndex].email = email;
        currentUser.email = email;
    }

    // Image
    let file = document.getElementById("imgInput").files[0];

    if (file) {
        let reader = new FileReader();  // read image file using FileReader

        reader.onload = function(e) {

            let imageData = e.target.result; // convert it to Base64 string

            users[userIndex].image = imageData;
            currentUser.image = imageData;

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            loadProfile();
        };

        reader.readAsDataURL(file);

    } else { // if no pp, just update other info
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        loadProfile();
    }

    alert("Profile updated");
    closeEdit();
}


// Load Profile
function loadProfile() {

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    // update the header UI
    document.getElementById("username").textContent = currentUser.username;
    document.getElementById("email").textContent = currentUser.email;
    document.getElementById("role").textContent = currentUser.role;

    // update the displaying box UI
    document.getElementById("infoUsername").textContent = currentUser.username;
    document.getElementById("infoEmail").textContent = currentUser.email;
    document.getElementById("infoRole").textContent = currentUser.role;

    if (currentUser.image) {
        document.getElementById("profileImage").src = currentUser.image;
    }
}

// keeps data displayed after refresh
document.addEventListener("DOMContentLoaded", loadProfile);
