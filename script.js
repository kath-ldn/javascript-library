//global object to hold books
let myLibrary = [
    {
        "title": "The Hobbit",
        "author": "J.R.R. TOLKIEN",
        "pages": "310 pages",
        "read": "Read"
    },
    {
        "title": "Green: Simple Ideas for Small Outdoor Spaces",
        "author": "Ula Maria",
        "pages": "176 pages",
        "read": "In Progress"
    },
    {
        "title": "The Midnight Library",
        "author": "Matt Haig",
        "pages": "304 pages",
        "read": "Not Read"
    },
    {
        "title": "The Very Hungry Caterpillar",
        "author": "Eric Carle",
        "pages": "24 pages",
        "read": "Read"
    },
    {
        "title": "Ottolenghi SIMPLE",
        "author": "Yotam Ottolenghi",
        "pages": "320 pages",
        "read": "Not Read"
    }
];

// Global variables for containers
const container = document.getElementById("books-container");
const container2 = document.getElementById("books-container-2");
let currentContainer = container2;

//book constructor - using class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
};

//function to create new book from form
function newBookData(form){
    let title = newBookForm.bookName.value;
    let author = newBookForm.bookAuthor.value;
    let pages = newBookForm.numberPages.value;
    let read;
    for (i = 0; i < 3; i++) {
        if (newBookForm.readBooks[i].checked) {
        read = newBookForm.readBooks[i].value;
        } else {
        read = 'Not Read';
        }
    }
    event.preventDefault();
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addLocalStorage();
    showBooks();
    newBookForm.reset();
};

//adds submit button event listener
(function addSubmitEvent(){
    const submitButton = document.getElementById("submit-button");
    submitButton.addEventListener('click', newBookData);
})();

// bootstrap flex wrapping workaround
function pickCol(){
    currentContainer === container ? currentContainer = container2 : currentContainer = container;
};

//function to display book
function displayBook(item) {
    const bookDiv = document.createElement('div');
    const bookBody = document.createElement('div');
    const titleDiv = document.createElement('h5');
    const authorDiv = document.createElement('h6');
    const pagesDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.classList.add('card');
    bookDiv.classList.add('w-100');
    bookDiv.classList.add('mb-3');
    bookDiv.classList.add('me-3');
    bookDiv.setAttribute('id', bookDiv + myLibrary.indexOf(item));

    bookBody.classList.add('bookBody');
    bookBody.classList.add('card-body');
    bookDiv.appendChild(bookBody);

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    titleDiv.classList.add('card-title');
    bookBody.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    authorDiv.classList.add('card-subtitle');
    authorDiv.classList.add('mb-2');
    authorDiv.classList.add('text-muted');
    bookBody.appendChild(authorDiv);

    pagesDiv.textContent = item.pages;
    pagesDiv.classList.add('pages');
    pagesDiv.classList.add('mb-2');
    bookBody.appendChild(pagesDiv);

    readBtn.textContent = item.read;
    readBtn.classList.add('readBtn');
    readBtn.classList.add('btn');
    bookBody.appendChild(readBtn);
    if(item.read === 'Read') {
        readBtn.classList.add('read');
    } else if(item.read === 'In Progress') {
        readBtn.classList.add('inProgress');
    } else {
        readBtn.classList.add('notRead');
    }

    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('btn');
    removeBtn.classList.add('btn-link');
    removeBtn.setAttribute('id', 'removeBtn');
    bookBody.appendChild(removeBtn);

    pickCol();
    currentContainer.appendChild(bookDiv);

    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item),1);
        addLocalStorage()
        showBooks();
    });

    readBtn.addEventListener('click', ()=> {
        if(item.read === 'Read') {
            readBtn.classList.remove('read');
            item.read = 'In Progress';
            readBtn.classList.add('inProgress');
        } else if(item.read === 'In Progress') {
            readBtn.classList.remove('inProgress');
            item.read = 'Not Read';
            readBtn.classList.add('notRead');
        } else if (item.read === 'Not Read') {
            readBtn.classList.remove('notRead');
            item.read = 'Read';
            readBtn.classList.add('read');
        }
        readBtn.textContent = item.read;
        addLocalStorage()
    });
};

function removeBooks(book){
    let parent = book.parentElement;
    parent.removeChild(book);
};

function showBooks() {
    const books = document.querySelectorAll(".book");
    books.forEach(book => removeBooks(book));
    for (let i=0; i < myLibrary.length; i++) {
        displayBook(myLibrary[i]);
    }
};

//stores library locally
function addLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

//pulls books from local storage on refresh
(function restore() {
    if(!localStorage.myLibrary) {
        showBooks();
    } else {
        let objects = localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        showBooks();
    }
})();

//clear stored books
const deleteAll = document.getElementById("delete-all");
deleteAll.addEventListener('click', () => {
    myLibrary = [];
    addLocalStorage();
    showBooks();
});

const resetToDemo = document.getElementById("reset-demo");
resetToDemo.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});


localStorage.clear();