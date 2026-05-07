const urlParams = new URLSearchParams(window.location.search);
const BOOK_ID = Number(urlParams.get("id"));

const books = JSON.parse(localStorage.getItem("books")) || [];
const book = books.find(b => b.id === BOOK_ID);

if (!localStorage.getItem("books")) {
    fetch("../Storage/Books.json")
        .then(res => res.json())
        .then(data => {
            localStorage.setItem("books", JSON.stringify(data.books));
        });
}

if (book) {
    fillForm(book);
}

// Fill form
function fillForm(book) {
    document.querySelector(".edit-book-cover-pic").src = book.cover;
    document.querySelector('[name="edit-title"]').value = book.title;
    document.querySelector('[name="edit-author"]').value = book.author;
    document.querySelector('[name="edit-ID"]').value = book.id;
    document.querySelector('[name="edit_genre"]').value = book.Category;
    document.querySelector('[name="edit-description"]').value = book.Description;
    document.querySelector('[name="edit-copies"]').value = book["Total-Copies"];
    document.querySelector('[name="edit-available-copies"]').value = book["available-copies"];
    document.querySelector('[name="edit-publisher"]').value = book.Publisher;
    document.querySelector('[name="edit-date"]').value = book["Publish-Date"];
    document.querySelector('[name="edit-pages-num"]').value = book.pages;
}

// Image upload
function triggerNewImage() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            document.querySelector(".edit-book-cover-pic").src = event.target.result;
        };

        reader.readAsDataURL(file);
    };

    input.click();
}

// Save changes logic
document.querySelector(".Edit-btn").addEventListener("click", saveChanges);

function saveChanges() {
    let books = JSON.parse(localStorage.getItem("books")) || []; 

    const index = books.findIndex(b => b.id === BOOK_ID);
    if (index === -1) return;

    books[index] = {
        ...books[index], // Keep unchanged properties then override with new values
        title: document.querySelector('[name="edit-title"]').value,
        author: document.querySelector('[name="edit-author"]').value,
        id: Number(document.querySelector('[name="edit-ID"]').value),
        Category: document.querySelector('[name="edit_genre"]').value,
        Description: document.querySelector('[name="edit-description"]').value,
        "Total-Copies": document.querySelector('[name="edit-copies"]').value,
        "available-copies": document.querySelector('[name="edit-available-copies"]').value,
        Publisher: document.querySelector('[name="edit-publisher"]').value,
        "Publish-Date": document.querySelector('[name="edit-date"]').value,
        pages: document.querySelector('[name="edit-pages-num"]').value,
        cover: document.querySelector(".edit-book-cover-pic").src
    };

    localStorage.setItem("books", JSON.stringify(books));

    alert("Book updated successfully!");

    window.location.href = "adminpage.html";
}
