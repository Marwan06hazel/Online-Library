const borrowedContainer = document.querySelector(".borrowed .cards");
const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

if (borrowedContainer) {
    fetch('../Storage/Books.json')
        .then(response => response.json())
        .then(data => {
            borrowedContainer.innerHTML = "";

            if (borrowedBooks.length === 0) {
                borrowedContainer.innerHTML = "<p>No books borrowed yet.</p>";
                return;
            }

            borrowedBooks.forEach(item => {
                const book = data.books.find(b => b.id === item.id);

                if (book) {
                    const card = document.createElement("div");
                    card.className = "card";
                    card.innerHTML = `
                        <div class="card-content">
                            <img src="${book.cover}" alt="${book.title}">
                            <h3>${book.title}</h3>
                            <p>Borrow Date: ${new Date().toLocaleDateString()}</p>
                            <p><strong>Due Date: ${item.date}</strong></p> 
                        </div>
                        <button type="button" onclick="returnBook(${book.id})">Return</button>
                    `;
                    borrowedContainer.appendChild(card);
                }
            });
        })
}

function returnBook(idToRemove) {
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    const updatedList = borrowedBooks.filter(book => book.id !== idToRemove);
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedList));
    window.location.reload();
}
