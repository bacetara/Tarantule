import './Login.css'

const Login = ()  => {
    return (
        <div className="container">
            <div className="text">OIB
            </div>
            <div>
                <input className="oib" type="text" />
            </div>
            <div className="text">lozinka</div>
            <div>
                <input className="lozinka" type="text" />
            </div>
            <button className="loginbutton" >
                prijava/registracija
            </button>
        </div>
    );
};
export default Login;