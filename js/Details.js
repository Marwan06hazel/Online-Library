const urlParams = new URLSearchParams(window.location.search);
const CURRENT_BOOK_ID = Number(urlParams.get('id'));

const books = JSON.parse(localStorage.getItem("books")) || [];
const book = books.find(b => b.id === CURRENT_BOOK_ID);

if (book) {
    updatePageContent(book);
}

if (!localStorage.getItem("books")) {
    fetch("../Storage/Books.json")
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("books", JSON.stringify(data.books));
        });
}
function updatePageContent(book) {

    const imgElement = document.querySelector(".book-cover-img");
    if (imgElement) imgElement.src = book.cover;

    const box1 = document.querySelector(".box1");
    const box2 = document.querySelector(".box2");
    if (box1) box1.textContent = `${book["available-copies"]} Available`;
    if (box2) box2.textContent = book.Category;
    
    const title = document.querySelector("h1");
    const authorTop = document.querySelector("h3");
    if (title) title.textContent = book.title;
    if (authorTop) authorTop.textContent = book.author;

    const desc = document.querySelector(".p");
    if (desc) desc.textContent = book.Description;

    const details = document.querySelectorAll(".container2-item h4");

    if (details.length === 6) {
        details[0].textContent = book.author;            // Author
        details[1].textContent = book.id;                // ID
        details[2].textContent = book["Publish-Date"];   // Publish Date
        details[3].textContent = book.pages;             // Pages
        details[4].textContent = book.Publisher;         // Publisher Name
        details[5].textContent = book["Total-Copies"];   // Total Copies
    }

    const borrowBtn = document.querySelector(".borrow-btn");
    if (borrowBtn) {
        borrowBtn.href = `borrowpage.html?id=${book.id}`;
    }
}
