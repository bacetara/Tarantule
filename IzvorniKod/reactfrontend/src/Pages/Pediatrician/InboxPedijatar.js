import './InboxPedijatar.css'

export default function InboxPedijatar(){
    return(
        <div className="MainContainer">
            <div className="InboxContainer">
                <div className="EmailContainer">prvimailpedijatar</div>
                <div className="EmailContainer">drugimailpedijatar</div>
                <div className="EmailContainer">trecimailpedijatar</div>
                <div className="EmailContainer">cetvrtimailpedijatar</div>
                <div className="EmailContainer">petimailpedijatar</div>

            </div>
            <div className="AdditionalInfo">
                <p> placeholder za sliku</p>
                <button className="PediatricianMessage">dijagnoza</button>
                <button className="PediatricianMessage">nalaz iz laboratorija</button>
                <button className="PediatricianMessage">specijalist</button>

            </div>
        </div>
    )
}