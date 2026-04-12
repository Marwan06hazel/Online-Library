//--- Handling Return logic + Updating Two Lists (borrowed, history)

function returnBook(idToRemove) {
    let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];
    let historyBooks = JSON.parse(localStorage.getItem("historyBooks")) || [];

    // find the book before removing it
    const bookToReturn = borrowedBooks.find(book => book.id === idToRemove);

    //  remove it from borrowed list
    const updatedList = borrowedBooks.filter(book => book.id !== idToRemove);
    
    // add it to reading history
    if (bookToReturn) {
        historyBooks.push({
            id: bookToReturn.id,
            borrowDate: bookToReturn.borrowDate, // keep original data (from Borrow_Page)
            dueDate: bookToReturn.dueDate,
            returnDate: new Date().toLocaleDateString()
        });
    }

    // save both lists
    localStorage.setItem("borrowedBooks", JSON.stringify(updatedList));
    localStorage.setItem("historyBooks", JSON.stringify(historyBooks));
    window.location.reload();
}

//--- Rendering UI Upadtes

// get all books data
const books = JSON.parse(localStorage.getItem("books")) || []; 

// generic function for all lists
function renderCards(containerSelector, storageKey, emptyMessage, showExtraInfo){ // 1) gets element by nested className, specifies which list, message displayed when empty list(array), function to display different card info
    const container = document.querySelector(containerSelector);
    const list = JSON.parse(localStorage.getItem(storageKey)) || [];

    if (container) {
        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML = `<p>${emptyMessage}</p>`;
        } else {

            list.forEach(item => { // book: full data of a book (from books object), item: book data that comes from the list (borrowed, favorites, history)

                const book = books.find(b => b.id === item.id); 
  
                if (book) {
                    const card = document.createElement("div");
                    card.className = "card";

                    card.innerHTML = `
                        <div class="card-content">
                            <img src="${book.cover}" alt="${book.title}">
                            <h3>${book.title}</h3>
                            ${showExtraInfo(book, item)} 
                        </div>
                    `;

                    container.appendChild(card);
                }
            });
        }
    }
}

renderCards(
    ".borrowed .cards", "borrowedBooks", "No borrowed books to show.", 
    (book, item) => `
        <p>Borrow Date: ${item.borrowDate}</p>
        <p>Due Date: ${item.dueDate}</p>
        <button onclick="returnBook(${book.id})">Return</button>
    `
);

renderCards(
    ".history .cards", "historyBooks","No previously read books.",
    (book, item) => `
        <p>Category: ${book.Category || "N/A"}</p>
        <p>Borrow Date: ${item.borrowDate}</p>
        <p>Due Date: ${item.dueDate}</p>
        <p>Returned on: ${item.returnDate}</p>
    `
);





