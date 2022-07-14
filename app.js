// BOOK Constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

// UI Constructor
class UI {
  constructor() {}

  addBookToList(book) {
    const list = document.getElementById("book-list");

    const row = document.createElement("tr");

    // Insert to html

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href ="#" class = "delete">X<a></td>
    `;

    list.appendChild(row);
  }

  //   show alerts
  showAlert(message, className) {
    // create element
    const div = document.createElement("div");
    // add class
    div.className = `alert ${className}`;
    // add text
    div.appendChild(document.createTextNode(message));
    // get parent
    const container = document.querySelector(".container");
    // get form so we can insert alert message before
    const form = document.querySelector("#book-form");
    // insert alert
    container.insertBefore(div, form);

    // Clear error message after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  // Delete book list
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }

  // clear fields
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Event Listener for add book

document.querySelector("#book-form").addEventListener("submit", submitBtn);

function submitBtn(e) {
  // Get form values
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  // Instatiate Book Constructor
  const book = new Book(title, author, isbn);

  // Instatiate UI constructor
  const ui = new UI();

  console.log(ui)

  // Alert sucess or error
  if (title === "" || author === "" || isbn === "") {
    // Error alert
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);
    ui.showAlert("Book added", "sucess");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
}

// Event listener for delete book list
document.getElementById("book-list").addEventListener("click", deleteList);

function deleteList(e) {
  // Instatiate UI constructor
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show alert when deleted
  
  if(e.target.classList.contains('delete')){
    ui.showAlert("Book removed", "sucess");

    console.log(e.target)
  }

  e.preventDefault();
}
