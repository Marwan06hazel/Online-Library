/**
 * PART 1: FOR THE CATALOG PAGE
 * This function is triggered by: onclick="showDetails('Book Title')"
 */
function showDetails(bookTitle) {
    // 1. Save the clicked book title to the browser's local memory
    localStorage.setItem('selectedBook', bookTitle);
    
    // 2. Redirect the user to the details page
    window.location.href = "Details.html";
}

/**
 * PART 2: THE BOOK DATABASE
 * Add all your book information here. 
 * The name MUST match what you put in the onclick='' exactly.
 */
const bookDatabase = {
    "Harry Potter and the Sorcerer's Stone": {
        author: "J.K. Rowling",
        description: "A young boy discovers he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.",
        isbn: "978-0590353427",
        pages: "309",
        publisher: "Scholastic",
        date: "September 1, 1998",
        type: "Fantasy",
        image: "../Pics/Harry_Potter.jpg",
        copies: 6,
        available: "2 Available"
    },
    "It Ends With Us": {
        author: "Colleen Hoover",
        description: "Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants.",
        isbn: "978-1501110368",
        pages: "384",
        publisher: "Atria Books",
        date: "August 2, 2016",
        type: "Romance",
        image: "../Pics/it-ends-with-us.jpg",
        copies: 3,
        available: "1 Available"
    },
    "The Summer I Turned Pretty": {
        author: "Jenny Han",
        description: "Belly has always lived for the summer, because everything good happens between June and August.",
        isbn: "978-1416968290",
        pages: "276",
        publisher: "Simon & Schuster",
        date: "May 5, 2009",
        type: "Romance",
        image: "../Pics/The_summer_i_turend_pretty.jpg",
        copies: 5,
        available: "3 Available"
    }
};

/**
 * PART 3: FOR THE DETAILS PAGE (Details.html)
 * This runs automatically when the details page opens.
 */
window.onload = function() {
    // Only run this logic if we are on the Details page (checks for placeholders)
    if (document.body.innerText.includes('[')) {
        
        // 1. Retrieve the saved book name from memory
        const selectedBookTitle = localStorage.getItem('selectedBook');
        const bookData = bookDatabase[selectedBookTitle];

        if (bookData) {
            // 2. Define the mapping of placeholders to data
            const mapping = {
                "[Book Name]": selectedBookTitle,
                "[Author Name]": bookData.author,
                "[Book Description]": bookData.description,
                "[ISBN NO]": bookData.isbn,
                "[No. Pages]": bookData.pages,
                "[Publisher Name]": bookData.publisher,
                "[Publisher Date]": bookData.date,
                "[Book Type]": bookData.type,
                "[Copies No.]": bookData.copies,       // Static value
                "[No.Available]": bookData.available    // Static value
            };

            // 3. Find every element that contains a placeholder and replace it
            const allElements = document.querySelectorAll('body *');
            
            allElements.forEach(element => {
                // If element is a text container and contains '['
                if (element.children.length === 0 && element.innerText.includes('[')) {
                    for (const [placeholder, value] of Object.entries(mapping)) {
                        if (element.innerText.includes(placeholder)) {
                            element.innerText = element.innerText.replace(placeholder, value);
                        }
                    }
                }
            });

            // 4. Update the book cover image if the <img> tag exists
            const coverImg = document.querySelector('.book-cover-img');
            if (coverImg && bookData.image) {
                coverImg.src = bookData.image;
            }
            
        } else if (selectedBookTitle) {
            console.error("No data found in bookDatabase for: " + selectedBookTitle);
        }
    }
};
