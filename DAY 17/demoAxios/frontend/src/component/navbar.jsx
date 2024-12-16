import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 bg-light bg-white rounded">
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="https://cdn4.iconfinder.com/data/icons/seo-183/32/SEO_website_coding-512.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                    &nbsp;Employee DashBoard
                </a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;