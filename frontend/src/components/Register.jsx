const Register = () => {
  return (
    <div>
      <h2>Register</h2>
      <form>
        <div className="mb-3">
          <label for="name" class="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            placeholder="Name"
          />
        </div>
        <div className="mb-3">
          <label for="email" class="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Email"
          />
        </div>
        <div className="mb-3">
          <label for="password" class="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
          />
        </div>
        <input type="submit" className="btn btn-success"/>
      </form>
    </div>
  );
};

export default Register;
