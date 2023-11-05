import logo from './logo.svg';
import './App.css';


function App() {
    return (
        <>
            <div className="header">

                <div className="logo"> logo </div>
                <div className="gumbi">
                    <div className="register">registracija</div>
                    <div className="login">prijava</div>
                </div>

            </div>

            <div className="textbox">
                Dobro bošli na aplikaciju <i style={{ color: '#65B58A' }}>Ozdravi</i>.. platformu koja sjedinjuje moderne doktore i roditelje djece koja će uskoro ozdraviti.
            </div>
            </>

    );
}

export default App;
