import { useEffect, useState } from "react";
import store from "./BookStore";
import BookAddForm from "./BookAddForm";
import Book from "./Book";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    store.getBooks();
    store.emitter.addListener("GET_BOOKS_SUCCESS", () => {
      setBooks(store.data);
    });
  }, []);

  const addBook = (Book) => {
    store.addBook(Book);
  };

  const deleteBook = (id) => {
    store.deleteBook(id);
  };

  const saveBook = (id, Book) => {
    store.saveBook(id, Book);
  };

  return (
    <div>
      <h3>List of Books</h3>
      {books.map((e) => (
        <Book key={e.id} item={e} onDelete={deleteBook} onSave={saveBook} />
      ))}
      <BookAddForm onAdd={addBook} />
    </div>
  );
}

export default BookList;
