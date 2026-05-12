const backBtn = document.querySelector(".back-btn");

if (backBtn) {
    backBtn.addEventListener("click", () => {
        history.back();
    });
}

// ================= IMAGE HOVER EFFECT =================

const bookImage = document.querySelector(".book-cover-img");

if (bookImage) {
    bookImage.addEventListener("mouseenter", () => {
        bookImage.style.transform = "scale(1.03)";
        bookImage.style.transition = "0.3s ease";
    });
    bookImage.addEventListener("mouseleave", () => {
        bookImage.style.transform = "scale(1)";
    });
}

// ================= BUTTON ANIMATION =================

const buttons = document.querySelectorAll(".borrow-btn, .details-btn");

buttons.forEach(button => {
    button.addEventListener("mouseenter", () => {
        button.style.transform = "translateY(-2px)";
    });
    button.addEventListener("mouseleave", () => {
        button.style.transform = "translateY(0)";
    });
});