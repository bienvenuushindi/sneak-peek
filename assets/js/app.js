const bookForm = document.getElementById('book-form');
const bookList = document.querySelector('.books');
const msgBlock = document.getElementById('msg-block');

class Book {
  static list = [];
  
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  
  store() {
    Book.list.push(this);
  }
  
  static remove(index) {
    return Book.list.splice(index, 1);
  }
  
  get details() {
    return this.title + ' by ' + this.author;
  }
  
  static updateLocalStorage() {
    localStorage.setItem('books', JSON.stringify(Book.list));
  }
  
  static retrieveFormLocalStorage() {
    Book.list = [...JSON.parse(localStorage.getItem('books'))];
    return Book.list
  }
}

class BookUI {
  static noBookFoundMsg = 'No Book Found, Please Add First !';
  static deleteMsg = 'Book deleted successfully.';
  static insertMsg = 'Book added successfully.';
  
  static set(target, value) {
    target.innerHTML = value;
  }
  
  static alert(msg = this.noBookFoundMsg, classList = 'alert-info') {
    return `<div class=\'alert ${classList}\'>${msg}</div> `;
  }
  
  static listAll() {
    return Book.retrieveFormLocalStorage().map((book, index) => ` <li class='book-item d-flex justify-content-between p-2 ${index % 2 === 0 ? 'bg-secondary text-white' : ''}'>
                    <div class='book-info d-flex w-100 align-items-center text-20'>
                         <div class='book-title mr-1'> ${book.title} </div>
                         <span>&nbsp; by &nbsp;</span>
                         <div class='book-author mr-1'> ${book.author} </div>
                    </div>
                    <div class='action '>
                        <button type='button' class='remove-button btn btn-danger ml-auto small' id='${index}'>Remove</button>
                    </div>
                    <hr>
                </li> `).join(' ');
  }
}

bookForm.addEventListener('submit', (ev) => {
  const title = bookForm.elements.title.value;
  const author = bookForm.elements.author.value;
  const book = new Book(title, author);
  book.store();
  Book.updateLocalStorage();
  const itemList = BookUI.listAll;
  BookUI.set(bookList, itemList());
  BookUI.set(msgBlock, BookUI.alert(BookUI.insertMsg, 'alert-success'));
  bookList.classList.add('border');
  ev.preventDefault();
});

bookList.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('remove-button')) {
    const id = ev.target.id;
    Book.remove(id);
    Book.updateLocalStorage();
    const itemList = BookUI.listAll;
    BookUI.set(bookList, itemList());
    BookUI.set(msgBlock, BookUI.alert(BookUI.deleteMsg, 'alert-danger'));
    if (Book.list.length === 0) {
      BookUI.set(msgBlock, BookUI.alert());
      bookList.classList.remove('border');
    }
  }
});

if (!localStorage.getItem('books') || Book.retrieveFormLocalStorage().length === 0) {
  BookUI.set(msgBlock, BookUI.alert());
  bookList.classList.remove('border');
} else {
  const itemList = BookUI.listAll;
  BookUI.set(bookList, itemList());
}
