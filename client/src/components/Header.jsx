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

			<p>Cart: {props.cartTotal}</p>

			<div className="links">

				<Link to="/" className="header-links">Home</Link>
				<Link to="/category" className="header-links">All Products</Link>

				{
					props.mainCategories.map(tlc => {
						return <Link
									key={tlc.id}
									to={{ pathname: tlc.custom_url.url,
										  state: {
											  id: tlc.id,
											  name: tlc.name
										  }
										}}
									className="header-links">{tlc.name}</Link>
					})
				}
			</div>
		</header>
	)

}

export default Header;
