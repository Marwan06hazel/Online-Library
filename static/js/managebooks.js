// Image hover preview
const coverInput = document.querySelector('input[name="cover"]');
const coverImg = document.querySelector(".edit-book-cover-pic");

if (coverInput && coverImg) {
    coverInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            // Fill form
            reader.onload = (e) => {
                coverImg.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
}