import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Edit_des = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]); // Categories for dropdown
    const [bookDetails, setBookDetails] = useState(null); // Book details

    useEffect(() => {
        fetchCategories();
        fetchBookDetails();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://localhost:5000/book_category");
            setCategories(response.data); // Assume the response is an array of categories
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    };

    const fetchBookDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/bookdetails/${id}`);
            const bookData = response.data;
            setBookDetails(bookData); // Update book details state
        } catch (error) {
            console.error("Error fetching book details", error);
        }
    };

    // Set form values when bookDetails are fetched
    useEffect(() => {
        if (bookDetails) {
            setValue("book_s", bookDetails.book_s); // Set category
            setValue("bookname", bookDetails.bookname);
            setValue("bookdescription", bookDetails.bookdescription);
            setValue("bookauthor", bookDetails.bookauthor);
        }
    }, [bookDetails, setValue]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:3000/bookdetails/${id}`, data);
            navigate("/view_des"); // Redirect after update
        } catch (error) {
            console.error("Error updating book details", error);
        }
    };

    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form className="p-5 shadow-lg rounded bg-light" onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="mb-4 text-center">Update Book</h3>

                        {/* Category Selection */}
                        <div className="form-group mb-3">
                            <label htmlFor="book_s">Category</label>
                            <select
                                name="book_s"
                                className={`form-control ${errors.book_s ? "is-invalid" : ""}`}
                                {...register("book_s", { required: "Please select a category" })}
                            >
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.book_s}
                                        selected={bookDetails && bookDetails.book_s === category.book_s} // Pre-select if it matches
                                    >
                                        {category.book_s}
                                    </option>
                                ))}
                            </select>
                            {errors.book_s && <div className="invalid-feedback">{errors.book_s.message}</div>}
                        </div>

                        {/* Book Name */}
                        <div className="form-group mb-3">
                            <label htmlFor="bookname">Book Name</label>
                            <input
                                type="text"
                                name="bookname"
                                className={`form-control ${errors.bookname ? "is-invalid" : ""}`}
                                {...register("bookname", { required: "Please enter the book name" })}
                            />
                            {errors.bookname && <div className="invalid-feedback">{errors.bookname.message}</div>}
                        </div>

                        {/* Book Description */}
                        <div className="form-group mb-3">
                            <label htmlFor="bookdescription">Book Description</label>
                            <textarea
                                name="bookdescription"
                                className={`form-control ${errors.bookdescription ? "is-invalid" : ""}`}
                                {...register("bookdescription", { required: "Please enter the book description" })}
                                rows="3"
                            />
                            {errors.bookdescription && <div className="invalid-feedback">{errors.bookdescription.message}</div>}
                        </div>

                        {/* Author Name */}
                        <div className="form-group mb-4">
                            <label htmlFor="bookauthor">Author</label>
                            <input
                                type="text"
                                name="bookauthor"
                                className={`form-control ${errors.bookauthor ? "is-invalid" : ""}`}
                                {...register("bookauthor", { required: "Please enter the author's name" })}
                            />
                            {errors.bookauthor && <div className="invalid-feedback">{errors.bookauthor.message}</div>}
                        </div>

                        {/* Submit Button */}
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary shadow btn-4d"> Update Book</button>
                            <button type="button" className="btn btn-secondary" style={{ marginLeft: '3%' }} onClick={() => navigate('/view_des')}>
                    Cancel
                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Edit_des;
