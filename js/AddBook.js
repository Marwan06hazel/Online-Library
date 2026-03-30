function addBook() {
    let title = document.getElementById("title").value;
    let bookId = document.getElementById("bookId").value;
    let author = document.getElementById("author").value;
    let category = document.getElementById("category").value;
    let description = document.getElementById("description").value;
    let cover = document.getElementById("cover").files[0];
    let idNumber = Number(bookId);

    
    if (!title || !bookId || !author || !category) {
        alert("Please fill all required fields!");
        return;
    }

    if (idNumber <= 0) {
        alert ("Book ID must be a positive number!");
        return;
    } 

    let books = JSON.parse(localStorage.getItem("books")) || [];

    let exists = books.some(book => book.id === idNumber);

    if (exists) {
        alert("This Book ID already exists!");
        return;
    }

    let reader = new FileReader();

    reader.onload = function () {
        let book = {
            title: title,
            id: idNumber,
            author: author,
            category: category,
            description: description,
            cover: reader.result 
        };

        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

        alert("Book added successfully!");

        document.getElementById("AddBookForm").reset();
    };

    if (cover) {
        reader.readAsDataURL(cover);
    } else {
        reader.onload(); 
    }
}