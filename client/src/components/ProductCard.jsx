import React, { Component } from 'react';
import API from '../utils/productsAPI';
import './css/productCard.css';


class ProductCard extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	state = {
		images: [],
	}

	componentDidMount() {
		this.getProductImages()
	}

	getProductImages() {
		API.getProductImages(this.props.id)
			.then(res =>
				this.setState({ images: res.data.response.data}, () => {
					console.log(this.state.images)
				}))
	}

	render() {
		return (
			<main className="product-card">
				<h1>{this.props.title}</h1>

				{
					this.state.images.length > 0 ?
						<img src={this.state.images[0].url_standard} alt=""/>
					: <p>No Image</p>
				}
			</main>

		)
	}

}

export default ProductCard;
