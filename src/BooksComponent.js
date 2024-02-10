import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BooksComponent.css';

const BooksComponent = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('/api/books/');
            setBooks(response.data);
        } catch (error) {
            console.error('Failed to fetch books', error);
        }
    };

    const selectBook = async (id) => {
        try {
            const response = await axios.get(`/api/books/${id}`);
            setSelectedBook(response.data);
        } catch (error) {
            console.error(`Failed to fetch book with id ${id}`, error);
        }
    };

    const editBook = async (bookData) => {
        try {
            await axios.put('/api/books/', bookData);
            fetchBooks();
            setSelectedBook(null);
        } catch (error) {
            console.error('Failed to edit the book', error);
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`/api/books/${id}`);
            fetchBooks();
            setSelectedBook(null);
        } catch (error) {
            console.error(`Failed to delete book with id ${id}`, error);
        }
    };

    return (
        <div className="books-container">
            <h2 className="books-header">Books</h2>
            <ul className="books-list">
                {books.map((book) => (
                    <li className="books-list-item" key={book.id} onClick={() => selectBook(book.id)}>
                        {book.author.name} {book.name}
                    </li>
                ))}
            </ul>

            {selectedBook && (
                <div className="edit-book-container">
                    <h3 className="edit-book-header">Edit Book</h3>
                    <div className="edit-book-row">
                        <label htmlFor="book-name">Book name </label>
                        <input type="text" id="book-name" value={selectedBook.name} onChange={(e) => setSelectedBook({
                            ...selectedBook, name: e.target.value
                        })}/>
                    </div>
                    <div className="edit-book-row">
                        <label htmlFor="author-name">Author name </label>
                        <input type="text" value={selectedBook.author.name} onChange={(e) => setSelectedBook(prevState => ({
                            ...prevState,
                            author: {
                                ...prevState.author,
                                name: e.target.value
                            }
                        }))}/>
                    </div>
                    <div className="edit-book-row">
                        <label htmlFor="genre-name">Genre name </label>
                        <input type="text" value={selectedBook.genre.name} onChange={(e) => setSelectedBook(prevState => ({
                            ...prevState,
                            genre: {
                                ...prevState.genre,
                                name: e.target.value
                            }
                        }))}/>
                    </div>
                    <button onClick={() => editBook(selectedBook)}>Save</button>
                    <button onClick={() => deleteBook(selectedBook.id)}>Delete</button>
                </div>
            )}
        </div>
    );
};

export default BooksComponent;