window.onload = function(){
    let savedName = this.localStorage.getItem("username");

    if (savedName) {
        document.getElementById("username").innerText = savedName;
    }
}

function openEdit() {
    let box = document.getElementById("editBox");
    document.getElementById("editBox").style.display = "flex";

    let currentName = document.getElementById("username").innerText;
    document.getElementById("nameInput").value = currentName;
}

function closeEdit() {
    document.getElementById("editBox").style.display = "none";
}


function saveChanges() {
    let name = document.getElementById("nameInput").value;
    if (name !== "") {
        document.getElementById("username").innerText = name;
        localStorage.setItem("username", name);

    }

    let file = document.getElementById("imgInput").files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("profileImage").src = e.target.result;
        }
        reader.readAsDataURL(file);
    }
    alert("Profile updated");

    closeEdit();
}

