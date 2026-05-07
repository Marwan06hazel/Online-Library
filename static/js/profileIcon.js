function loadProfileImage() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const img = document.getElementById("profileImg");

    if (currentUser.image) {
        img.src = currentUser.image;
    } else {
        img.src = "../Pics/Profile-icon.png";
    }
}

document.addEventListener("DOMContentLoaded", loadProfileImage);
