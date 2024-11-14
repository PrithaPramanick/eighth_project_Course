import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const View_des = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/bookdetails`);
            setBooks(response.data);
        } catch (error) {
            alert("Error fetching book details");
            console.error(error);
        }
    };

    const deleteBook = async (bookId) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                await axios.delete(`http://localhost:3000/bookdetails/${bookId}`);
                alert("Book deleted successfully");
                fetchBooks(); // Refresh the list
            } catch (error) {
                alert("Error deleting book");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="container_x my-5  ">
            <h1 className="text-center mb-4">Book Details</h1>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Category</th>
                            <th>Book Name</th>
                            <th>Book Description</th>
                            <th>Book Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.book_s}</td>
                                    <td>{book.bookname}</td>
                                    <td>{book.bookdescription}</td>
                                    <td>{book.bookauthor}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => navigate(`/edit_des/${book.id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => deleteBook(book.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No books found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default View_des;
