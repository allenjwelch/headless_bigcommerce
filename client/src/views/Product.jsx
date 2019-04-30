import React, { Component } from 'react'
import Products from '../utils/productsAPI'
import ColorSwatch from '../components/ColorSwatch'
import ProductPickList from '../components/ProductPickList'
import ProductCard from '../components/ProductCard'
import loading from '../assets/images/loading.svg'


import './css/product.css';

class Product extends Component {

	state = {
		images: [],
		data: {},
		options: [],
		modifiers: [],
		// related_products: [],
		qty: 1,
		errorResponse: '',
		inCart: false,
	}

	componentDidMount() {
		this.getProductData()
	}

	getProductData() {
		Products.getProductById(this.props.id)
			.then(res =>
				this.setState({ data: res.data.response.data }, () => {
					console.log(this.state.data)
					this.getRelatedProducts()
				}))
			.catch(err => console.log(err))

		Products.getProductImages(this.props.id)
			.then(res =>
				this.setState({ images: res.data.response.data }, () => {
					// console.log(this.state.images)
				}))
			.catch(err => console.log(err))

		Products.getProductModifiers(this.props.id)
			.then(res =>
				this.setState({ modifiers: res.data.response.data }, () => {
					console.log(this.state.modifiers)
				}))
			.catch(err => console.log(err))

		Products.getProductOptions(this.props.id)
			.then(res =>
				this.setState({ options: res.data.response.data }, () => {
					console.log(this.state.options)
				}))
			.catch(err => console.log(err))
	}

	getRelatedProducts() {
		if (this.state.data.related_products[0] === -1) { // if not manually chosen, select 4 from category
			console.log('getting related products from category')
			this.setState({ random_related_prodcuts : [130, 131, 132] }, () => { //! HARDCODED needs to pull in category id and search for products of same category
				console.log(this.state.random_related_prodcuts)
			})
		}
	}


	consoleClick() {
		console.log(this.state)
	}



	removeHTML(str) { //! TODO: Need a better way to parse html string ---->>>> USE REGEX ig
		let result = str.replace(/<div>/ig, '');
		result = result.replace(/<\/div>/ig, '');
		result = str.replace(/<br \/>/ig, '');
		result = result.replace(/<p>/ig, '');
		result = result.replace(/<\/p>/ig, '');
		result = result.replace(/<strong>/ig, '');
		result = result.replace(/<\/strong>/ig, '');
		result = result.replace(/<ul>/ig, '');
		result = result.replace(/<\/ul>/ig, '');
		result = result.replace(/<li>/ig, '');
		result = result.replace(/<\/li>/ig, '');
		result = result.replace(/<a.*?<\/a >/ig, '');

		return result;
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
								<img onClick={() => {this.consoleClick()}} id="product-image" src={this.state.images[0].url_standard} alt="main"/>

								<div className="productView-thumbnails">
									{
										this.state.images.map(image => {
											return <img key={image.id} src={image.url_standard} alt="" className="product-thumbnail" />
										})
									}
								</div>
							</div>

						: <img src={loading} alt="loading"/>
						// <img src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="" />
					}
					</article>


					<article className="productView-details">
						{
							this.state.data.inventory_level > 0 ?
								<div className="productView-details-container">
									<h2>Price: ${this.state.data.price}</h2>
									<h3>Inventory: {this.state.data.inventory_level}</h3>

									<h2>Description: </h2>
									{ this.removeHTML(this.state.data.description) }

									{
										this.state.options.length > 0 ?
											<div className="productView-options">
												<h2>Options:</h2>

												{
													this.state.options.map(option => {
														return <div key={option.id} className={option.display_name}>
															<h3>{option.display_name}</h3>
															<ul>
																{
																	option.option_values.map(value => {
																		if (option.type === 'swatch') {
																			return <ColorSwatch key={value.id} color={value.value_data.colors[0]} />
																		} else if (option.type === 'product_list_with_images') {
																			console.log(value)
																			return <ProductPickList key={value.id} id={value.value_data.product_id} />
																		} else {
																			return <li key={value.id}>{value.label}</li>
																		}
																	})
																}
															</ul>
														</div>


														// option.type === 'swatch'
													})
												}

											</div>

											: this.state.modifiers.length > 0 ?
												<div className="productView-options">
													<h2>Options:</h2>

													{
														this.state.modifiers.map(option => {
															return <div key={option.id} className={option.display_name}>
																<h3>{option.display_name}</h3>
																<ul>
																	{
																		option.option_values.map(value => {
																			if (option.type === 'swatch') {
																				return <ColorSwatch key={value.id} color={value.value_data.colors[0]} />
																			} else if (option.type === 'product_list_with_images') {
																				return <ProductPickList key={value.id} id={value.value_data.id} />
																			} else {
																				return <li key={value.id}>{value.label}</li>
																			}
																		})
																	}
																</ul>
															</div>


															// option.type === 'swatch'
														})
													}

												</div>

												: <h1>no options</h1>
									}



									{
										this.state.data.inventory_level > 0 ?
											<div className="productView-actions">

												{
													this.state.data.availability === 'available' ?

														<button className="add-to-cart"
															onClick={() => this.props.addToCart({
																"line_items": [
																	{
																		"quantity" : this.state.qty,
																		"product_id" : this.state.data.id,
																	}
																]
															})}>Add to Cart</button>
														: <button className="add-to-cart"
															onClick={() => this.props.addToCart({
																"line_items": [
																	{
																		"quantity": this.state.qty,
																		"product_id": this.state.data.id,
																	}
																]
															})}>Pre-Order</button>
												}

												<button className="add-to-wishlist">Wishlist</button>

												{
													this.state.cartResponse && <h3>Sorry. {this.state.cartResponse}</h3>
												}

												{
													this.state.inCart && <h3>This item is in your cart!</h3>
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

				<section className="related-products">
					<h2>Related Products</h2>
					{
						this.state.data.related_products && this.state.data.related_products[0] !== -1 ?
							this.state.data.related_products.map(id =>
								<ProductCard key={id} id={id} />
							)
						: this.state.random_related_prodcuts ?
							this.state.random_related_prodcuts.map(id =>
								<ProductCard key={id} id={id} />
							)
						: <h1>no related products</h1>
					}
					{/* {

						this.state.related_products &&
						<div>related

							{
							this.state.related_products.map(product => {
								return <h1>product</h1>
							// return <ProductCard key={product.id} id={product.id} title={product.name} url={product.custom_url.url} description={product.description} />
							})

							}
						</div>
						// : <h1>not related</h1>


					} */}
				</section>

			</main>
		)
	}

}

export default Product;
