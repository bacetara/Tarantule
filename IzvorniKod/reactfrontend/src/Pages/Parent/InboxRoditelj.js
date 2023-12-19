import "./Inbox.css"

export default function InboxRoditelj(){
    return(
        <div className="MainContainer">
            <div className="InboxContainer">
                <div className="EmailContainer">prvimailroditelj</div>
                <div className="EmailContainer">drugimailroditelj</div>
                <div className="EmailContainer">trecimailroditelj</div>
                <div className="EmailContainer">cetvrtimailroditelj</div>
                <div className="EmailContainer">petimailroditelj</div>

            </div>
            <div className="AdditionalInfo">
                <p> placeholder za sliku</p>
                <button className="Message">poruka lijecniku</button>

            </div>
        </div>
    )
}