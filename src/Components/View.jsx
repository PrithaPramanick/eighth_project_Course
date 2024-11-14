import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function View() {
    const [categories, setCategories] = useState([]);
    // const[ parentCategories, setparentCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/book_category');
                setCategories(response.data);
            } catch (error) {
                setError('Error fetching categories');
            } finally {
                setLoading(false);
            }
        };

        // const fetchparentCategories = async () => {
        //     try {
        //         const response = await axios.get('http://localhost:5000/book_category');
        //         setparentCategories(response.data);
        //     } catch (error) {
        //         setError('Error fetching parent categories');
        //     } finally {
        //         setLoading(false);
        //     }
        // };
        // fetchparentCategories();
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/book_category/${id}`);
            setCategories(categories.filter(category => category.id !== id));
            alert('Category deleted successfully');
        } catch (error) {
            alert('Error deleting category');
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit_category/${id}`); 
    };

    // Create a mapping of category ID to category object for easy lookup
    const categoryMap = categories.reduce((acc, category) => {
        acc[category.id] = category;
        return acc;
    }, {});

    // Create rows for the table
    const tableRows = categories.map(category => {
        const parentCategory = category.parentId ? categoryMap[category.parentId] : null;
        return {
            id: category.id,
            name: category.book_s,
            parentName: parentCategory ? parentCategory.book_s : 'None',
            parentId: category.parentId 
        };
    });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
    <>
            <div className="container_c" style={{ marginTop: '6%', marginLeft: '50%', marginRight: '10%' }}>
                <h2>Edit & Delete Categories</h2>
                <table className="table">
                        <thead>
                            <tr>
                                <th>Parent Category</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                    <tbody>
                            {tableRows.map(row => (
                        <tr key={row.id}>
                           <td>{row.parentName}</td>
                            {/* <td>{row.parentId}</td> */}
                                <td>{row.name}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleEdit(row.id)}>Edit</button>
                                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(row.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
    </>
    );
}

export default View;
