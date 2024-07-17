// const book1 = new book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
// console.log(book1.info());
const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`;
  };
}
function addBookToLibrary(title, author, pages, readStatus) {
  let book = new Book(title, author, pages, readStatus);
  myLibrary.push(book);
}

// addBookToLibrary("The Hobbit ako", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1178, "Read");
//form
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = form.querySelector("#title").value;
  const author = form.querySelector("#author").value;
  const pages = form.querySelector("#pages").value;
  const readCheck = form.querySelector("#read");

  const readStatus = readCheck.checked ? "Read" : "Unread";

  console.log(title, author, pages);
  addBookToLibrary(title, author, pages, readStatus);
  form.reset();
  modal.close();
  displayBooks();
});

// Modal Form
const openModal = document.querySelector("[data-open-modal]");
const closeModal = document.querySelector("[data-close]");
const modal = document.querySelector("[data-modal]");

openModal.addEventListener("click", () => {
  modal.showModal();
});
closeModal.addEventListener("click", () => {
  modal.close();
});

function displayBooks() {
  const display = document.querySelector("#display");
  display.innerHTML = "";

  myLibrary.forEach((book) => {
    const div = document.createElement("div");
    const divTitle = document.createElement("div");
    const divInfo = document.createElement("div");
    const divCta = document.createElement("div");

    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");

    const button = document.createElement("button");
    const readButton = document.createElement("button");

    div.classList.add("card");
    divTitle.classList.add("card__title");
    divInfo.classList.add("card__info");
    divCta.classList.add("card__cta");

    p.classList.add("card__author");
    p1.classList.add("card__pages");
    p2.classList.add("card__read-status");

    divCta.classList.add("card__cta");

    readButton.classList.add("button");
    button.classList.add("button", "remove");

    h2.textContent = book.title;
    p.textContent = `by ${book.author}`;
    p1.textContent = `${book.pages} pages`;
    p2.textContent = book.readStatus;
    button.textContent = "Remove";

    if (book.readStatus == "Read") {
      readButton.textContent = "Unread";
    } else {
      readButton.textContent = "Read";
    }

    readButton.addEventListener("click", () => {
      const checker = myLibrary[myLibrary.indexOf(book)].readStatus;
      if (checker == "Read") {
        book.readStatus = "Unread";
      } else {
        book.readStatus = "Read";
      }
      displayBooks();
    });

    button.addEventListener("click", () => {
      myLibrary.splice(myLibrary.indexOf(book), 1);
      displayBooks();
    });

    display.appendChild(div);
    div.appendChild(divTitle);
    div.appendChild(divInfo);
    div.appendChild(divCta);
    divTitle.appendChild(h2);
    divInfo.appendChild(p);
    divInfo.appendChild(p1);
    divInfo.appendChild(p2);
    divCta.appendChild(button);
    divCta.appendChild(readButton);
  });
}

displayBooks();
