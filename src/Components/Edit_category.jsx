import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const Edit_Category = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // Fetch the category data when the component mounts
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/book_category/${id}`);
                // Ensure the response data has the expected structure
                reset({ book_s: response.data.book_s }); // Prepopulate the form with the fetched data
            } catch (error) {
                console.error('Error fetching category:', error);
                alert("Failed to fetch category. Please try again.");
            }
        };

        fetchCategory();
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            await axios.put(`http://localhost:5000/book_category/${id}`, data);
            alert("Category updated successfully");
            navigate('/view'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating category:', error);
            alert("Something went wrong! Please check the console for details.");
        }
    };

    return (
        <div className="container" style={{ marginLeft: '50%', marginTop: '10%' }}>
            <h1 className="my-4">Edit Category</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                    <label htmlFor="book_s" className="form-label">Edit your book category:</label>
                    <input
                        type="text"
                        id="book_s"
                        className={`form-control ${errors.book_s ? 'is-invalid' : ''}`}
                        style={{ width: '40%' }}
                        placeholder="Edit Category"
                        {...register('book_s', {
                            required: 'Please provide a book category',
                            minLength: {
                                value: 3,
                                message: 'Category name must be more than 3 characters',
                            }
                        })}
                    />
                    {errors.book_s && <div className="invalid-feedback">{errors.book_s.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
                <button type="button" className="btn btn-secondary" style={{ marginLeft: '3%' }} onClick={() => navigate('/view')}>
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default Edit_Category;
