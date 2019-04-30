import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Products from '../utils/productsAPI';
import loading from '../assets/images/loading.svg'

import './css/productCard.css';


class ProductCard extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	state = {
		images: [],
		noImage: false,
	}

	componentDidMount() {
		this.getProductImages()
		console.log(this.props)
		const { id, title, description, url } = this.props
		this.setState({ id, title, description, url }, () => {
			console.log(this.state)
			this.getProductData()

		})
	}

	getProductData() {
		console.log('getting product data')
		if (this.state.title === undefined || this.state.url === undefined) {
			Products.getProductById(this.props.id)
				.then(res =>
					this.setState({ title: res.data.response.data.name, description: res.data.response.data.description, url: res.data.response.data.custom_url.url }, () => {
						console.log(this.state)
					}))
				.catch(err => console.log(err))
		}
	}

	getProductImages() {
		Products.getProductImages(this.props.id)
			.then(res =>
				this.setState({ images: res.data.response.data}, () => {
					if(this.state.images.length === 0) {
						this.setState({noImage: true})
						console.log(this.state.images)
					}
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
						this.state.noImage ?
							<img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="" />
						: this.state.images.length > 0 ?
							<img src={this.state.images[0].url_standard} alt=""/>
						: <img src={loading} alt="" />
					}
			</Link>

		)
	}

}

export default ProductCard;
