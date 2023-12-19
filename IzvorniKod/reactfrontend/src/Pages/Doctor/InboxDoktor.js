import './InboxDoktor.css'

export default function InboxDoktor(){
    return(
        <div className="MainContainer">
            <div className="InboxContainer">
                <div className="EmailContainer">prvimaildoktor</div>
                <div className="EmailContainer">drugimaildoktor</div>
                <div className="EmailContainer">trecimaildoktor</div>
                <div className="EmailContainer">cetvrtimaildoktor</div>
                <div className="EmailContainer">petimaildoktor</div>

            </div>
            <div className="AdditionalInfo">
                <p> placeholder za sliku</p>
                <button className="DoctorMessage">dijagnoza</button>
                <button className="DoctorMessage">nalaz iz laboratorija</button>
                <button className="DoctorMessage">specijalist</button>

            </div>
        </div>
    )
}