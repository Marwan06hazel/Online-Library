let books = [];

function addBook(title, author, category) {
    const book = {
        id: Date.now(), 
        title: title,
        author: author,
        category: category
    };

    books.push(book);

    console.log("Book added:", book);
    return book;
}


function editBook(id, newTitle, newAuthor, newCategory) {
    const book = books.find(b => b.id === id);

    if (!book) {
        console.log("Book not found");
        return;
    }

    book.title = newTitle;
    book.author = newAuthor;
    book.category = newCategory;

    console.log("Book updated:", book);
    return book;
}


function deleteBook(id) {
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        console.log("Book not found");
        return;
    }

    const deleted = books.splice(index, 1);

    console.log("Book deleted:", deleted[0]);
    return deleted[0];
}