let myLibrary = [];

function Book(title, author, pages, isReaded) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isReaded = isReaded;
}

Book.prototype.info = function () {
    return `${title} by ${author}, ${pages}. `
}

const listItems = document.querySelector('.listItems');
listItems.addEventListener('click', (e) => {
    if (e.target.closest('button')) {
        const index = e.target.dataset.index

        removeBookFromLibrary(myLibrary, index);
        createBookList(myLibrary);
    }
    if (e.target.closest('input')) {
        const index = e.target.dataset.index;
        myLibrary[index].isReaded = e.target.checked;
    }
})

const addBook = document.querySelector('#addBook');
addBook.addEventListener('click', (e) => {
    e.preventDefault();
    let book = getUserInput();
    myLibrary.push(book);
    createBookList(myLibrary);
    clearUserInput();
})

function getUserInput() {
    const titleTextBox = document.querySelector('#title');
    const authorTextBox = document.querySelector('#author');
    const pagesTextBox = document.querySelector('#pages');
    const isReadedBox = document.querySelector('#isReaded');

    return new Book(titleTextBox.value, authorTextBox.value, pagesTextBox.value, isReadedBox.checked);
}

function clearUserInput() {
    const titleTextBox = document.querySelector('#title');
    const authorTextBox = document.querySelector('#author');
    const pagesTextBox = document.querySelector('#pages');
    const isReadedBox = document.querySelector('#isReaded');

    titleTextBox.value = "";
    authorTextBox.value = "";
    pagesTextBox.value = "";
    isReadedBox.checked = false;

}

function removeALlChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function removeBookFromLibrary(arr, id) {
    arr.splice(id, 1);
}

function createBookList(arr) {

    const listTarget = document.querySelector('.listItems')
    removeALlChildNodes(listTarget);

    arr.forEach((book, index) => {
        const listItem = createListItem(book, index);
        listTarget.appendChild(listItem);
    })
}

function createListItem(book, index) {
    const listItem = document.createElement('div');
    listItem.classList.add('bookListItem');

    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = book.title;
    listItem.appendChild(title);

    const author = document.createElement('div');
    author.classList.add('author');
    author.textContent = book.author;
    listItem.appendChild(author);

    const pages = document.createElement('div');
    pages.classList.add('pages');
    pages.textContent = book.pages;
    listItem.appendChild(pages);

    const checkBoxDiv = document.createElement('div');
    checkBoxDiv.classList.add('isReaded');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.setAttribute('data-index', index);
    if (book.isReaded) checkBox.checked = true;
    checkBoxDiv.appendChild(checkBox);
    listItem.appendChild(checkBoxDiv);

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('deleteListItem');
    const button = document.createElement('button');
    button.setAttribute('data-index', index);
    button.textContent = "Delete"
    buttonDiv.appendChild(button);
    listItem.appendChild(buttonDiv);
    return listItem;
}

function fillLibrary() {
    myLibrary.push(new Book('Project Hail Mary', 'Andy Weir', 100, false));
    myLibrary.push(new Book('The Other Queen: A Novel', 'Philippa Gregory', 100, false));
    myLibrary.push(new Book('Dune', 'Frank Herbert', 100, false));
    myLibrary.push(new Book('Piranesi', 'Susanna Clarke', 100, false));
}

fillLibrary();
createBookList(myLibrary);
