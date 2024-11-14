import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className="container-fluid p-4 ">
            <div className="d-flex justify-content-between align-items-center">
                <h1 className="display-4 mb-0 text-black bold">Udemy</h1>
                <nav className="navbar navbar-expand-lg navbar-dark">
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" 
                        aria-controls="navbarNav" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link text-black bold fs-4" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black bold fs-4" to="/courses">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black bold fs-4" to="/books">Books</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-black bold fs-4" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Header;
