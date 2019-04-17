import React, { Component } from 'react'
import Products from '../utils/productsAPI'
import Cart from '../utils/cartAPI'
// import Cart from '../assets/js/cart'

import './css/product.css';

class Product extends Component {

	state = {
		images: [],
		data: {},
		qty: 1,
		cartResponse: '',
	}

	componentDidMount() {
		this.getProductData()
	}

	getProductData() {
		Products.getProductById(this.props.location.state.id)
			.then(res =>
				this.setState({ data: res.data.response.data }, () => {
					console.log(this.state.data)
				}))
			.catch(err => console.log(err))

		Products.getProductImages(this.props.location.state.id)
			.then(res =>
				this.setState({ images: res.data.response.data }, () => {
					console.log(this.state.images)
				}))
			.catch(err => console.log(err))
	}

	removeHTML(str) { //! TODO: Need a better way to parse html string
		let result = str.replace('<div>', '');
		result = result.replace('</div>', '');
		result = result.replace('<p>', '');
		result = result.replace('</p>', '');
		result = result.replace('</div>', '');
		return result;
	}

	addToCart(lineItems) {
		let btn = document.querySelector('.add-to-cart')
		btn.innerHTML = "Adding to cart..."
		btn.disabled = true
		Cart.createCart(lineItems)
			.then(res => {
				console.log(res)
				localStorage.setItem('cart', res.data.id) // probably not the best way, but fuck it.
				this.setState({ cartResponse: res.data.title }, () => {
					console.log(this.state.cartResponse)
				})
			})
			.then(() => {
				btn.innerHTML = "Add to Cart"
				btn.disabled = false
			})
			.catch (err => console.log(err))
	}

	render() {
		return (
			<main className="product-page">
				<h1>{this.state.data.name}</h1>
				<h3>Product Page</h3>

				<section className="productView">

					<article className="productView-images">
					{
						this.state.images.length > 0 ?
							<div className="productView-image-container">
								<img id="product-image" src={this.state.images[0].url_standard} alt="main"/>

								<div className="productView-thumbnails">
									{
										this.state.images.map(image => {
											return <img key={image.id} src={image.url_standard} alt="" className="product-thumbnail" />
										})
									}
								</div>
							</div>

						: <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="" />
					}
					</article>


					<article className="productView-details">
						{
							this.state.data.availability === "available" ?
								<div className="productView-details-container">
									<h2>Price: ${this.state.data.price}</h2>
									<h3>Inventory: {this.state.data.inventory_level}</h3>

									<h2>Description: </h2>
									{ this.removeHTML(this.state.data.description) }


									{
										this.state.data.inventory_level > 0 ?
											<div className="productView-actions">
												<button className="add-to-cart"
													onClick={() => this.addToCart({
														"quantity" : this.state.qty,
														"productId" : this.state.data.id,
													})}>Add to Cart</button>
												{/* <button className="add-to-cart"
													onClick={() => Cart.create({
														"quantity": this.state.qty,
														"productId": this.state.data.id,
													})}>Add to Cart</button> */}
												<button className="add-to-wishlist">Wishlist</button>

												{
													this.state.cartResponse && <h3>Sorry. {this.state.cartResponse}</h3>
												}
											</div>
										: <div className="out-of-stock">
											<h2>Sorry, this item is currently out of stock.</h2>
										  </div>
									}

								</div>
							: <p>No details at this time</p>
						}
					</article>




				</section>

			</main>
		)
	}

}

export default Product;