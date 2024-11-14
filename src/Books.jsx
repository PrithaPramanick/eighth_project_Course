import { Link } from 'react-router-dom';


function Books() {
    return (
        <div className="container my-4" >
            <div className="row text-center">
                <div className="col-md-6 mb-3" >
                    <Link to="/add_category" className="btn btn-primary" style={{width: '60%' ,marginTop:'20%' ,marginLeft:'60%' }}>Add Category</Link>
                </div>
                <div className="col-md-6 mb-3">
                    <Link to="/book_des" className="btn btn-primary" style={{ width: '60%' , marginTop:'20%', marginLeft: '50%' }}>Add Book Description</Link>
                </div>
            </div>
        </div>
    );
}

export default Books;
