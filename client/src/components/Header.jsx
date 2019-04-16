import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import logo from '../logo.svg';

const Header = (props) => {
	console.log(props)


	return (
		<header>
			{
				// props.user.length > 0 ? <h1>Hello {props.user}!</h1> : <h1>Welcome</h1>
			}
			<img src={logo} className="App-logo" alt="logo" />

			<div className="links">
				{/* {
					props.user.length > 0 ?
						<span onClick={props.signOut} className="header-links">Sign Out</span> :
						<span onClick={props.signInModal} className="header-links">Sign In</span>
				} */}
				<Link to="/" className="header-links">Home</Link>
				<Link to="/category" className="header-links">All Category</Link>

				{
					props.mainCategories.map(tlc => {
						return <Link key={tlc.id} to={tlc.custom_url.url} className="header-links">{tlc.name}</Link>
					})
				}
			</div>
		</header>
	)

}

export default Header;
