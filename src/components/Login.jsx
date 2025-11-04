import { Link } from "react-router-dom";
const Login = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    } 
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h1>Login Page</h1>
                    <form onSubmit={handleSubmit}>
                        <input className="form-control mb-3 border border-gray-300" type="text" name="email" placeholder="Email" />
                        <input className="form-control mb-3 border border-gray-300" type="password" name="password" placeholder="Password" />
                        <button className="btn btn-primary w-full mt-3 border border-gray-300" type="submit">Login</button>
                        <Link to="/register" className="text-center mt-3">Don't have an account? Register</Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
