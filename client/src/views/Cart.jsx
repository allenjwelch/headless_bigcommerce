import React, { Component } from 'react'
// import Products from '../utils/productsAPI'
import Cart from '../utils/cartAPI'

import remove from '../assets/images/remove.png';

// import Cart from '../assets/js/cart'

import './css/cart.css';

class CartPage extends Component {

	state = {
		// cart: []
	}

	componentDidMount() {
		this.props.getCart()
	}

	// getCart() {
	// 	console.log('getting cart')
	// 	console.log(this.state.cart)

	// 	if (localStorage.getItem('cart') !== null) { // first check to see if a cart has already been created.
	// 		Cart.getCart(localStorage.getItem('cart'))
	// 			.then(res => {
	// 				this.setState({ cart: res.data.response.data }, () => {
	// 					console.log(this.state.cart)
	// 					if(this.state.cart.length === 0) {
	// 						console.log('removing local storage')
	// 						localStorage.removeItem('cart')
	// 					}
	// 				})
	// 			})
	// 			.catch(err => console.log(err))
	// 	}
	// }



	// deleteCartItem(cartId, itemId) {
	// 	console.log('deleting cart item...')

	// 	Cart.deleteCartItem(cartId, itemId)
	// 		.then(res => {
	// 			console.log(res)
	// 			this.getCart()
	// 		})
	// 		.catch(err => console.log(err))
	// }

	render() {
		return (
			<main className="cart-page">
				<h1>Cart Page</h1>

				<section className="cart-content">
					<table className="cart-table">
						<tbody>

						<tr>
							<th className="cart-item-name">Item</th>
							<th className="cart-item-quantity">Quantity</th>
							<th className="cart-item-price">Price</th>
							<th className="cart-item-subtotal">Subtotal</th>
							<th className="cart-item-remove"></th>
						</tr>
						{
							this.props.cart ?
									this.props.cart.line_items.physical_items.map(item => {
								return <tr key={item.id} className="cart-item">
									<td className="cart-item-name">
										<p>{item.name}</p>
										<img src={item.image_url} alt={item.name} />
									</td>
									<td className="cart-item-quantity">
										<button qty={item.quantity} id="cart-quantity-decrease"
											onClick={() => this.props.updateCartItem(this.props.cart.id, item.id,
												{
													"line_item":
													{
														"quantity": item.quantity - 1,
														"product_id": item.product_id,
														"list_price": item.list_price
													}

												}
											)}> - </button>
										<span>{item.quantity}</span>
										<button qty={item.quantity} id="cart-quantity-increase"
											onClick={()=> this.props.updateCartItem(this.props.cart.id, item.id,
												{
													"line_item":
														{
															"quantity": item.quantity + 1,
															"product_id": item.product_id,
															"list_price": item.list_price
														}

												}
											)}> + </button>
									</td>
									<td className="cart-item-price">${item.sale_price}</td>
									<td className="cart-item-subtotal">${item.quantity * item.sale_price}</td>
									<td className="cart-item-remove">
										<img src={remove} alt="remove from cart" onClick={() => this.props.deleteCartItem(this.props.cart.id, item.id)} />
									</td>
								</tr>
							})

							:
							<tr>
								<td>No items in cart</td>
							</tr>
						}
						</tbody>
					</table>
				</section>
			</main>
		)
	}

}

export default CartPage;
