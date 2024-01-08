import { useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import './RoditeljPocetna.css';
import json from './../../testing.json';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";

export default function RoditeljPocetna() {
	useEffect(() => {
		console.log(json);
	}, []); // Empty dependency array means this effect runs once when the component mounts

	return (
		<>
			<div className="header">
				<div className="backOptions">
					<div className="logOut">
						<FontAwesomeIcon id="logOutIcon" icon={faArrowRightFromBracket} style={{ color: "white" }} />
						<p id="logOutText">log out</p>
					</div>
				</div>

				<div className="profileName">Roditelj [904238734]</div>
			</div>
			<div className="infocontainer">
				{json.map(record => (
					record.rodOIB === "01020304050" && (
						<div className="child" key={record.OIB}>
							{/* Use the Link component for routing */}
							<Link className="link_na_stranicu" to={`/inbox/${record.OIB}`}>
								{`${record.Ime} ${record.Prezime}`}
							</Link>
						</div>
					)
				))}
			</div>
		</>
	);
}
