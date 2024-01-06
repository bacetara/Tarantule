import './RoditeljPocetna.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
export default function RoditeljPocetna() {
	return (
		<>
			<div className="header">
				<div className="backOptions">
					<div className="logOut">
						<FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{color: "white"}}/>
						<p id="logOutText">log out</p>
					</div>
				</div>

				<div className="profileName">parent [989898899]</div>
			</div>
			<div className="infocontainer">
				<div>
					<p>ime i prezime</p>
				</div>
				<div>
					<p>dijete</p>
				</div>
				<div>
					<p>nesto trece</p>
				</div>
			</div>
		</>
	);
}
