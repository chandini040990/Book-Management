// initialize the empty array to store the books

let books = JSON.parse(localStorage.getItem('books')) || [];

// function to save the books to localstorage
function saveToLocalStorage() {
    localStorage.setItem("books", JSON.stringify(books)); //convert books array to json and save
}

// function to add the new book

function addBook(title, author) {
    // create a new book object with the unique ID

    const book = {
        id: Date.now().toString(),  //use the current timestamp (as ID)
        title: title, //assign the title
        author: author, //assing the author
    };

    books.push(book); //adding the book to the books array
    saveToLocalStorage();
    renderBooks();
}

// function to update the existing book
function updateBook(id, title, author) {

    // loop through the books array
    for (let i = 0; i < books.length; i++) {
        // if the current book ID matched with the given ID
        if (books[i].id === id) {
            books[i].title = title; //updating the title
            books[i].author = author; //updating the author
            break;
        }
    }
    saveToLocalStorage();
    renderBooks();
}


// function to delete the book
function deleteBook(id) {
    // filter the book with the Given id
    books = books.filter(function (book) {
        return book.id !== id; //keep the book that do not match the id
    })
    saveToLocalStorage();
    renderBooks();

}

// function to render the list of books

function renderBooks() {
    const tbody = document.getElementById("books-tbody"); //get the table body element
    tbody.innerHTML = ''; //clear the existing rows 

    // loop through the books array
    books.forEach(function (book) {
        const row = document.createElement('tr'); //create the new table row

        // set the inner HTML for the row 

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>
            <button onclick = "editBook('${book.id}')">Edit</button>
            <button class = "delete" onclick = "deleteBook('${book.id}')">Delete</button>
        </td>
        
        `;
        tbody.appendChild(row);
    })
}

// function to handle the form submission

function handleFormSubmit(event) {
    event.preventDefault();

    const id = document.getElementById("book-id").value;
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (id) {
        updateBook(id, title, author)
    } else {
        addBook(title, author)
    }
    document.getElementById("form").reset();
    document.getElementById('book-id').value = ''; //clear the book id 

}



// function to populate the form for editing a book

function editBook(id) {
    const book = books.find(function (b) {
        return b.id === id; //we are going to find book with the given ID
    })

    // populate the form fields with the book data
    document.getElementById("book-id").value = book.id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;

}

// attach event listener to the form 
document.getElementById("form").addEventListener("submit", handleFormSubmit)

renderBooks();