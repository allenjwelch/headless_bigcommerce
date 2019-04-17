import React, { Component } from 'react';
import './css/home.css';

class Home extends Component {



	render() {
		return (
			<main className="home-page">
				<h1>Home Page</h1>

				<section className="top-kickers">
					<img src="https://via.placeholder.com/500x300" alt="" />
					<img src="https://via.placeholder.com/500x300" alt=""/>
				</section>

				<section className="bottom-kickers">
					<img src="https://via.placeholder.com/300x300" alt="" />
					<img src="https://via.placeholder.com/300x300" alt="" />
					<img src="https://via.placeholder.com/300x300" alt="" />
					<img src="https://via.placeholder.com/300x300" alt="" />
					<img src="https://via.placeholder.com/300x300" alt="" />
					<img src="https://via.placeholder.com/300x300" alt="" />
				</section>
			</main>
		)
	}

}

export default Home;
