document.addEventListener("DOMContentLoaded", function() {
    const img = document.getElementById("profileImg");
    if (!img.src || img.src === "") {
        img.src = "/static/Pics/Profile-icon.png";
    }
});