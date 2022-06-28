let Books = [];
const bookForm = document.getElementById('book-form');
const bookList = document.querySelector('.books');

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function createBook(form) {
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  return new Book(title, author);
}

function store(books) {
  window.localStorage.setItem('books', JSON.stringify(books));
}

function addBook() {
  Books.push(createBook(bookForm));
  store(Books);
}

function setText(target, value) {
  target.innerHTML = value;
}

function displayInfoMsg() {
  const noBookFoundMsg = '<li class=\'list-group-item\'><div class=\'alert alert-info\'> No Book Found, Please Add First !!!</div></li>';
  bookList.classList.remove('border');
  setText(bookList, noBookFoundMsg);
}

function removeBook(index) {
  Books.splice(index, 1);
  store(Books);
}

function listBooks() {
  const collection = JSON.parse(localStorage.getItem('books'));
  return collection.map((item, index) => ` <li class='book-item d-flex justify-content-between p-2 ${index % 2 === 0 ? 'bg-secondary text-white' : ''}'>
                    <div class='book-info d-flex w-100 align-items-center text-20'>
                    <div class='book-title mr-1'> ${item.title} </div><span>&nbsp; by &nbsp;</span>
                    <div class='book-author mr-1'> ${item.author} </div>
</div>
                    <div class='action '>
                        <button type='button' class='remove-button btn btn-danger ml-auto small' id='${index}'>Remove</button>
                    </div>
                    <hr>
                </li> `).join(' ');
}

bookForm.addEventListener('submit', (ev) => {
  addBook();
  bookList.classList.add('border');
  setText(bookList, listBooks());
  ev.preventDefault();
});

bookList.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('remove-button')) {
    removeBook(ev.target.id);
    setText(bookList, listBooks());
    if (Books.length === 0) displayInfoMsg();
  }
});

if (!localStorage.getItem('books') || JSON.parse(localStorage.getItem('books')).length === 0) {
  displayInfoMsg();
} else {
  Books = [...JSON.parse(localStorage.getItem('books'))];
  setText(bookList, listBooks());
}
