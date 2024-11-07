import { Link} from "react-router-dom";

const AdminHeader = () => {

  const logoutHandler=()=>{
    localStorage.removeItem('authToken')
    window.location.href = '/'
  }
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Home
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <Link class="nav-link" aria-current="page" to='/admin/dashboard'>
                Users 
              </Link>
            </li>
            <li class="nav-item">
            <Link class="nav-link" to="/admin/product">
                Products
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/admin/order">
                Orders
              </Link>
            </li>
            <li>
            <Link className="nav-link" onClick={logoutHandler}>
              Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
