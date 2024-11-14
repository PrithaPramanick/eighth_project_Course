import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Add_Description = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [getCategory, setGetCategory] = useState([]);
    const [fileInfo, setFileInfo] = useState({ selectedFile: null, fname: '' });
    const navigate = useNavigate();

    const fetchCategory = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/book_category`);
            setGetCategory(response.data);
        } catch (error) {
            alert("Error fetching categories");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const generateBookId = () => {
        return `book_${Math.random().toString(36).substr(2, 9)}`;
    };

    const submitForm = async (data) => {
        try {
            data.book_id = generateBookId();
            const selectedCategory = getCategory.find(cat => cat.id === data.book_s);
            if (selectedCategory) {
                data.book_s = selectedCategory.book_s;
            }
            await axios.post(`http://localhost:3000/bookdetails`, data);
            if (fileInfo.selectedFile) {
                await onFileUpload();
            }
            reset();
            alert("Book details added successfully");
        } catch (error) {
            alert("Error adding book details");
            console.error(error);
        }
    };

    const onFileChange = (event) => {
        setFileInfo({ ...fileInfo, selectedFile: event.target.files[0] });
    };

    const onFnameChange = (event) => {
        setFileInfo({ ...fileInfo, fname: event.target.value });
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('fileData', fileInfo.selectedFile, fileInfo.selectedFile.name);
        formData.append('fname', fileInfo.fname);

        try {
            const result = await axios.post(`https://acesoftech.co.in/API/image_upload/insert.php`, formData);
            if (result.data.status === 'valid') {
                alert('File Uploaded');
            } else {
                alert('File not Uploaded');
            }
        } catch (error) {
            alert('Error uploading file');
            console.error(error);
        }
    };

    const fileData = () => {
        if (fileInfo.selectedFile) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {fileInfo.selectedFile.name}</p>
                    <p>File Type: {fileInfo.selectedFile.type}</p>
                    <p>Last Modified: {new Date(fileInfo.selectedFile.lastModified).toDateString()}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    return (
        <div className="container_p">
            <h1>Add Your Book Details Here</h1>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="col-md-6 mb-3">
                    <label>Select a Category</label>
                    <select
                        id="book_s"
                        className={`form-control ${errors.book_s ? 'is-invalid' : ''}`}
                        {...register('book_s', { required: 'Please select a category' })}
                    >
                        <option value="">Select a category</option>
                        {getCategory.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.book_s}
                            </option>
                        ))}
                    </select>
                    {errors.book_s && <div className="invalid-feedback">{errors.book_s.message}</div>}
                </div>

                <div className="col-md-6 mb-3">
                    <label>Book Name</label>
                    <input
                        type="text"
                        id="bookname"
                        className={`form-control ${errors.bookname ? 'is-invalid' : ''}`}
                        placeholder="Enter book Name"
                        {...register('bookname', { required: 'Please enter a name' })}
                    />
                    {errors.bookname && <div className="invalid-feedback">{errors.bookname.message}</div>}
                </div>

                <div className="col-md-12 mb-3">
                    <label>Book Description</label>
                    <textarea
                        id="bookdescription"
                        className={`form-control ${errors.bookdescription ? 'is-invalid' : ''}`}
                        placeholder="Enter book description"
                        {...register('bookdescription', { required: 'Please enter a description' })}
                    />
                    {errors.bookdescription && <div className="invalid-feedback">{errors.bookdescription.message}</div>}
                </div>

                <div className="mb-3">
                    <label>Book Author</label>
                    <input
                        type="text"
                        id="bookauthor"
                        className={`form-control ${errors.bookauthor ? 'is-invalid' : ''}`}
                        placeholder="Enter book author's name"
                        {...register('bookauthor', { required: 'Please enter the author name' })}
                    />
                    {errors.bookauthor && <div className="invalid-feedback">{errors.bookauthor.message}</div>}
                </div>

                <div>
                    <div>
                        File Name:
                        <input type="text" onChange={onFnameChange} />
                    </div>
                    <div>
                        <input type="file" onChange={onFileChange} />
                        <button type="button" onClick={onFileUpload}>Upload!</button>
                    </div>
                    {fileData()}
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Add Book Details</button>
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{ marginLeft: '3%' }}
                        onClick={() => navigate('/view_des')} 
                    >
                        View description
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Add_Description;
