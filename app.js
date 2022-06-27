"use strict";
const Books = [];
const addButton = document.getElementById('add-book');
// const removeButtons = document.querySelectorAll('.remove-button');
const bookForm = document.getElementById('book-form');
const bookList = document.querySelector('.books');

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBook(form) {
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  return new Book(title, author)
}

function removeBook(index) {
  Books.splice(index, 1)
}

function list(collection) {
  return collection.map((item, index) => ` <li class="book-item">
                    <div class="book-title">${item.title}</div>
                    <div class="book-author">${item.author}</div>
                    <div class="action">
                        <button type="button" class="remove-button" id="${index}">Remove</button>
                    </div>
                    <hr>
                </li> `).join(' ');
}

function setText(target, value) {
  target.innerHTML = value
}

addButton.addEventListener('click', (ev) => {
  ev.preventDefault();
  let book = addBook(bookForm);
  Books.push(book);
  setText(bookList, list(Books));
});

bookList.addEventListener('click', function (ev) {
  if (ev.target.classList.contains('remove-button')) {
    removeBook(ev.target.id);
    setText(bookList, list(Books));
  }
});

