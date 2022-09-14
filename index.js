class Book {
    constructor(title, desc, author, pages, HTML) {
        this.title = title;
        this.desc = desc;
        this.author = author;
        this.pages = parseInt(pages);
        this.HTML = HTML;
    };
};

Book.prototype.toggleRead = function() {
    if(this.HTML.classList.contains('read')) {
        this.HTML.classList.remove('read');
    } else {
        this.HTML.classList.add('read');
    };
};

library = {
    books: [],
    HTML: document.getElementById('library'),

    createBook: function(title, desc, author, pages) {
        newBookHTML = document.createElement('div');
        newBookHTML.classList.add('book');

        bookHeader = document.createElement('div');
        bookHeader.classList.add('book-header');
        newBookHTML.appendChild(bookHeader);

        bookTitle = document.createElement('h4');
        bookTitle.textContent = title;
        bookAuthor = document.createElement('p');
        bookAuthor.textContent = 'By: ' + author;
        bookHeader.appendChild(bookTitle);
        bookHeader.appendChild(bookAuthor);

        bookReadContainer = document.createElement('div');
        bookReadContainer.classList.add('book-read');
        bookReadButton = document.createElement('button');
        bookReadButton.textContent = '';
        bookReadContainer.appendChild(bookReadButton);
        newBookHTML.appendChild(bookReadContainer);

        bookDescription = document.createElement('p');
        bookDescription.classList.add('book-desc');
        bookDescription.textContent = desc;
        newBookHTML.appendChild(bookDescription);

        bookPages = document.createElement('p');
        bookPages.classList.add('book-pages');
        bookPages.textContent = pages + ' pages';
        newBookHTML.appendChild(bookPages);

        bookDeleteContainer = document.createElement('div');
        bookDeleteContainer.classList.add('book-delete');
        bookDeleteButton = document.createElement('button');
        bookDeleteButton.textContent = 'X';
        bookDeleteContainer.appendChild(bookDeleteButton);
        newBookHTML.appendChild(bookDeleteContainer);

        let newBook = new Book(title, desc, author, pages, newBookHTML);
        this.books.push(newBook);

        newBook.index = this.books.indexOf(newBook);
        newBook.HTML.setAttribute('data-index', newBook.index);

        bookDeleteButton.addEventListener('click', () => {
            library.deleteBook(newBook.index);
        });

        bookReadButton.addEventListener('click', () => {
            newBook.toggleRead();
        });

        return newBook;
    },

    addBook: function(book) {
        book.HTML.setAttribute('index', this.books.indexOf(book));
        this.HTML.appendChild(book.HTML);
    },

    deleteBook: function(index) {
        book = this.books[index];
        this.HTML.removeChild(book.HTML);
        delete(book);
    },
};

newBookButton = document.querySelector('main button');

modal = document.querySelector('form');
modalBackground = document.querySelector('.modalbg');
cancelBookButton = document.getElementById('cancel');
storeBookButton = document.getElementById('send');


titleInput = document.getElementById('title');
descInput = document.getElementById('desc');
authorInput = document.getElementById('auth');
pagesInput = document.getElementById('pages');
modalInputs = [titleInput, descInput, authorInput, pagesInput];

hideModal = function() {
    modal.classList.add('hidden');
    modalBackground.classList.add('hidden');
};

clearModalInputs = function() {
    for(i = 0;i<modalInputs.length;i++) {
        modalInputs[i].value = '';
    };
};

pagesInput.addEventListener('input', () => {
    if (pagesInput.value > 9999) {
        pagesInput.value = 9999;
    };
});

newBookButton.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modalBackground.classList.remove('hidden');
});

modalBackground.addEventListener('click', () => {
    hideModal();
});

cancelBookButton.addEventListener('click', () => {
    hideModal();
    clearModalInputs();
});

storeBookButton.addEventListener('click', () => {
    r = library.createBook(titleInput.value, descInput.value,
         authorInput.value, pagesInput.value);
    library.addBook(r);
    hideModal();
    clearModalInputs();
})