import './Inbox.css'

export default function InboxDijete(){
    return(
        <div className="MainContainer">
            <div className="InboxContainer">
                <div className="EmailContainer">prvimaildijete</div>
                <div className="EmailContainer">drugimaildijete</div>
                <div className="EmailContainer">trecimaildijete</div>
                <div className="EmailContainer">cetvrtimaildijete</div>
                <div className="EmailContainer">petimaildijete</div>

            </div>
            <div className="AdditionalInfo">
                <p> placeholder za sliku</p>
                <button className="Message">naruči</button>

            </div>
        </div>
    )
}