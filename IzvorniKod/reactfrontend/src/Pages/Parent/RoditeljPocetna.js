import { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './RoditeljPocetna.css';
import json from './../../testing.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowRightFromBracket, faUser, faUserDoctor} from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';
export default function RoditeljPocetna() {
	const [user, setUser] = React.useState(null);
	React.useEffect(() => {
        fetch('/api/parent/me')
        .then(data => data.json())
        .then(data => {setUser(data);});

    }, []);

	return (
		<>
			<div className="header">
				<div className="backOptions">
					<div className="logOut">
						<FontAwesomeIcon
							id="logOutIcon"
							icon={faArrowRightFromBracket}
							style={{ color: 'white' }}
						/>
						<p id="logOutText">log out</p>
					</div>
				</div>

				<div className="profileName">{user?.roditelj.ime} {user?.roditelj.prezime} [{user?.roditelj.oib}]</div>
			</div>

			{user && (
			<div className="infocontainer">
				{/* Display information about the parent */}
				<div className="child" key={user.roditelj.oib}>

					<div className="profile">
						<FontAwesomeIcon id="profileIcon3" icon={faUser} />
					</div>
					<Link className="link_na_stranicu" to={`/inbox/${user.roditelj.oib}`}>
						{`${user.roditelj.ime} ${user.roditelj.prezime}`} (my profile)
					</Link>
				</div>

				{user.djeca.length > 0 && user.djeca.map(child => (
					<div className="child" key={child.oib}>
						<div className="profile">

							<FontAwesomeIcon id="profileIcon3" icon={faUser} />

						</div>
						<Link className="link_na_stranicu" to={`/inbox/child/${child.oib}`}>
							{`${child.ime} ${child.prezime}`}
						</Link>
					</div>
				))}

			</div>)}
		</>
	);
}
