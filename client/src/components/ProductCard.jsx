import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Products from '../utils/productsAPI';
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
		// console.log(this.props)
		const { id, title, description, url } = this.props
		this.setState({ id, title, description, url })
	}

	getProductImages() {
		Products.getProductImages(this.props.id)
			.then(res =>
				this.setState({ images: res.data.response.data}, () => {
					// console.log(this.state.images)
				}))
			.catch(err => console.log(err))
	}

	render() {
		return (
			<Link to={{
					pathname: this.state.url,
					state: {
						id: this.state.id,
					}
				}}
				className="product-card">
					<h1>{this.state.title}</h1>
					{
						this.state.images.length > 0 ?
							<img src={this.state.images[0].url_standard} alt=""/>
						: <p>No Image</p>
					}
			</Link>

		)
	}

}

export default ProductCard;
