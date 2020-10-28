let myLibrary = [ //tested Y
    {
        "title": "The Hobbit",
        "author": "J.R.R. TOLKIEN",
        "pages": "310 pages",
        "read": "Read"
    },
    {
        "title": "The Fellowship of the Ring",
        "author": "J.R.R. TOLKIEN",
        "pages": "423 pages",
        "read": "Not Read"
    },
];

//book constructor - using class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
};

// obtain book data from form - tested
//radios button not working - to fix
function newBookData(form){
    var title = newBookForm.bName.value;
    var author = newBookForm.bAuthor.value;
    var pages = newBookForm.noPages.value;
    for (i = 0; i < 3; i++) {
        if (newBookForm.readBooks[i].checked) {
        var read = newBookForm.readBooks[i].value;
        } else {
        var read = 'Not Read';
        }
    }
    event.preventDefault();
    newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addLocalStorage();
    showBook();
    newBookForm.reset();
}

const submitButton = document.getElementById("submitButton");
submitButton.addEventListener('click', newBookData);

// show library books on page
const container = document.getElementById("container");

function createBook(item) {
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const removeBtn = document.createElement('button');
    const readBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', bookDiv + myLibrary.indexOf(item));

    titleDiv.textContent = item.title;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add('author');
    bookDiv.appendChild(authorDiv);

    pagesDiv.textContent = item.pages;
    pagesDiv.classList.add('pages');
    bookDiv.appendChild(pagesDiv);

    readBtn.textContent = item.read;
    readBtn.classList.add('readBtn');
    bookDiv.appendChild(readBtn);
    if(item.read === 'Read') {
        readBtn.setAttribute('id', 'isRead');
    } else if(item.read === 'In Progress') {
        readBtn.setAttribute('id', 'isInProgress');
    } else {
        readBtn.setAttribute('id', 'isNotRead');
    }

removeBtn.textContent = 'Remove';
removeBtn.setAttribute('id', 'removeBtn');
bookDiv.appendChild(removeBtn);

container.appendChild(bookDiv);

removeBtn.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(item),1);
    addLocalStorage()
    showBook();
});

readBtn.addEventListener('click', ()=> {
    if(item.read === 'Read') {
        item.read = 'In Progress';
    } else if(item.read === 'In Progress') {
        item.read = 'Not Read';
    } else if (item.read === 'Not Read') {
        item.read = 'Read';
    }
    addLocalStorage()
    showBook();
});
};

function showBook() {
    const books = document.querySelectorAll(".book");
    books.forEach(book => container.removeChild(book)); //test what its like without this

    for (let i=0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

//stores library locally
function addLocalStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

//pulls books from local storage on refresh
function restore() {
    if(!localStorage.myLibrary) {
        showBook();
    } else {
        let objects = localStorage.getItem('myLibrary');
        objects = JSON.parse(objects);
        myLibrary = objects;
        showBook();
    }
}

restore();

//clear stored books
const clearStorageButton = document.getElementById("clearStorageButton");
clearStorageButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});