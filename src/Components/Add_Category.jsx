import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

function Add_Category() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [parentCategories, setParentCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch existing parent categories when the component mounts
  useEffect(() => {
    const fetchParentCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/book_category');
        setParentCategories(response.data);
      } catch (error) {
        console.error("Error fetching parent categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParentCategories();
  }, []);

 
  const submitForm = async (data) => {
    try {
      // Create a new category object, including the parent category ID
      const newCategory = {
        book_s: data.book_s,
        parentId: data.parent_cata !== "0" ? data.parent_cata : null // Set parentId to null if "0" is selected
      };

      const response = await axios.post('http://localhost:5000/book_category', newCategory);
      
      alert("Category added successfully");

      // Reset the form fields
      reset();

      // Update local state to include the new category
      setParentCategories(prev => [...prev, { id: response.data.id, name: newCategory.book_s }]);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Check it.");
    }
  };

  return (
    <div className="container" style={{ marginLeft: '50%', marginTop: '10%' }}>
      <form onSubmit={handleSubmit(submitForm)} className="mb-3">
        <h1 className="my-4">Parent Category</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <select
            id="parent_cata"
            name="parent_cata"
            className="form-control"
            style={{ width: '40%' }}
            {...register('parent_cata')}
          >
            <option value="0">Select Parent Category</option>
            {parentCategories.map(category => (
              <option key={category.id} value={category.id}>{category.book_s || category.name}</option>
            ))}
          </select>
        )}

        <h1 className="my-4">Add Category</h1>
        <input
          type="text"
          id="book_s"
          name="book_s"
          className={`form-control ${errors.book_s ? 'is-invalid' : ''}`}
          style={{ width: '40%' }}
          placeholder="Enter Category"
          {...register('book_s', {
            required: 'Please add your book name',
            minLength: {
              value: 3,
              message: 'Book description must be more than 3 characters',
            }
          })}
        />
        {errors.book_s && <div className="invalid-feedback">{errors.book_s.message}</div>}
        
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>

      <button type="button" className="btn btn-primary" style={{ marginTop: '10px' }} onClick={() => navigate('/view')}>
        View Category
      </button>
    </div>
  );
}

export default Add_Category;
