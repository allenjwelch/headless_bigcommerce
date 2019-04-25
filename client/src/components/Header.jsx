import React from 'react';
import { Link } from 'react-router-dom';
import './css/header.css';
import logo from '../logo.svg';
import cartIcon from '../assets/images/cart-icon.png';

const Header = (props) => {
	// console.log(props)


	return (
		<header>
			<div className="header-container">
				{
					props.store &&
					<section className="store-logo" >
						<img src={props.store.logo.url} alt="store logo" />
					</section>
				}


				<section className="site-info">
					{
						props.store ? <h1>{props.store.name}</h1> : <h1>Welcome!</h1>
					}
				</section>
				<section className="cart-nav">
					<Link to="/cart" >
						<img src={cartIcon} alt="cart"/>
						{
							props.cartTotal ? <span>{props.cartTotal}</span> : <span>0</span>
						}
					</Link>
				</section>

				<section className="links">

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
				</section>
			</div>
		</header>
	)

}

export default Header;
