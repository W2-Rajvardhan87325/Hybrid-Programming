import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light shadow p-3 mb-5 bg-light bg-white rounded">
            <div class="container">
                <a className="navbar-brand" href="#">
                    <img src="https://cdn4.iconfinder.com/data/icons/seo-183/32/SEO_website_coding-512.png" width="30" height="30" class="d-inline-block align-top" alt="" />
                    &nbsp;Employee DashBoard
                </a>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Services</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;