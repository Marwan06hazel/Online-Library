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

    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passInput").value;

    let userIndex = users.findIndex(user => user.id == uid);

    if (userIndex === -1) return;

    // update text fields
    if (name) {
        users[userIndex].username = name;
        currentUser.username = name;
    }

    if (email) {
        users[userIndex].email = email;
        currentUser.email = email;
    }

    if (password) {
        users[userIndex].password = password;
        currentUser.password = password;
    }

    // Image
    let file = document.getElementById("imgInput").files[0];

    if (file) {
        let reader = new FileReader();

        reader.onload = function(e) {

            let imageData = e.target.result;

            users[userIndex].image = imageData;
            currentUser.image = imageData;

            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify(currentUser));

            loadProfile();
        };

        reader.readAsDataURL(file);

    } else {
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

    document.getElementById("username").textContent = currentUser.username;
    document.getElementById("email").textContent = currentUser.email;
    document.getElementById("role").textContent = currentUser.role;

    document.getElementById("infoUsername").textContent = currentUser.username;
    document.getElementById("infoEmail").textContent = currentUser.email;
    document.getElementById("infoRole").textContent = currentUser.role;

    if (currentUser.image) {
        document.getElementById("profileImage").src = currentUser.image;
    }
}

document.addEventListener("DOMContentLoaded", loadProfile);
