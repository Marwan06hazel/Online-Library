function openEdit() {
    document.getElementById("editBox").style.display = "block";
}

function closeEdit() {
    document.getElementById("editBox").style.display = "none";
}

// Image preview
const imgInput = document.getElementById("imgInput");
const profileImage = document.getElementById("profileImage");

if (imgInput && profileImage) {
    imgInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            // read image file using FileReader
            reader.onload = function(e) {
                // convert it to Base64 string
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}