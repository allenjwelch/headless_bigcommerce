import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Category from './views/Category';
import CartPage from './views/Cart';
import Product from './views/Product';
import AllProducts from './views/AllProducts';
import Header from './components/Header';
import Footer from './components/Footer';
import Products from './utils/productsAPI';
import Cart from './utils/cartAPI';
// import Cart from './assets/js/cart'


class App extends Component {
	constructor() {
		super()
		this.getCart = this.getCart.bind(this)
		this.addToCart = this.addToCart.bind(this)
		this.deleteCartItem = this.deleteCartItem.bind(this)
	}

	state = {
		allCategories: [],
		mainCategories: [],
		allProducts: [],
		cart: null,
		cartTotal: 0,
	}

	componentDidMount() {
		this.getAllCategories()
		this.getProducts()
		this.getCart()
	}

	getAllCategories() {
		Products.getAllCategories()
			.then(res =>
				this.setState({ allCategories: res.data.response.data }, () => {
					console.log(this.state.allCategories)
					const mainCategories = this.state.allCategories.filter(category => category.parent_id === 0 && category.is_visible === true)
					this.setState({mainCategories}, () => {
						console.log(this.state.mainCategories)
					})
				}))
	}

	getProducts() {
		Products.getAllProducts()
			.then(res =>
				this.setState({ allProducts: res.data.response.data }, () => {
					console.log(this.state.allProducts)
				}))
	}

	getCart() {
		if (localStorage.getItem('cart') !== null) { // first check to see if a cart has already been created.
			console.log('getting cart...')
			Cart.getCart(localStorage.getItem('cart'))
				.then(res => {
					this.setState({ cart: res.data.response.data }, () => {
						console.log(this.state.cart)
						this.calcCartTotal()
					})
				})
				.catch(err => console.log(err))
		}
	}

	calcCartTotal() {
		let cartTotals = [];
		this.state.cart.line_items.physical_items.forEach(item => cartTotals.push(item.quantity))
		this.state.cart.line_items.custom_items.forEach(item => cartTotals.push(item.quantity))
		this.state.cart.line_items.digital_items.forEach(item => cartTotals.push(item.quantity))
		this.state.cart.line_items.gift_certificates.forEach(item => cartTotals.push(item.quantity))
		cartTotals = cartTotals.reduce( (a, b) => a + b)

		this.setState({ cartTotal: cartTotals }, () => {
			console.log(this.state.cartTotal)
		})
	}

	addToCart(lineItems) {
		// let btn = document.querySelector('.add-to-cart')
		// btn.innerHTML = "Adding to cart..."
		// btn.disabled = true

		console.log(this);
		if (localStorage.getItem('cart') !== null) { // first check to see if a cart has already been created.
			console.log('cart exists')
			Cart.addToCart(localStorage.getItem('cart'), lineItems)
				.then(res => {
					console.log(res)
					this.setState({ inCart: true }, () => {
						console.log(this.state.inCart)
						this.getCart()
					})
				})
				.then(() => {
					// btn.innerHTML = "Add to Cart"
					// btn.disabled = false
				})
				.catch(err => console.log(err))

		} else {
			console.log('creating new cart...')
			Cart.createCart(lineItems)
				.then(res => {
					console.log(res)
					localStorage.setItem('cart', res.data.response.data.id) // probably not the best way, but fuck it.
					this.setState({ cart: res.data.response.data }, () => {
						console.log(this.state.cart)
						this.getCart()
					})
				})
				.then(() => {
					// btn.innerHTML = "Add to Cart"
					// btn.disabled = false
				})
				.catch(err => {
					console.log(err)
					// this.setState({ cartResponse: err }, () => {
					// 	console.log(this.state.cartResponse)
					// })
				});
		}
	}

	deleteCartItem(cartId, itemId) {
		console.log('deleting cart item...')

		Cart.deleteCartItem(cartId, itemId)
			.then(res => {
				console.log(res)
				console.log(this.state.cartTotal)
				if (this.state.cartTotal >= 1) {
					localStorage.removeItem('cart')
					this.setState({cart: null, cartTotal: 0})
				}
			})
			.catch(err => console.log(err))
	}

	updateCartItem(cartId, itemId, lineItems) {
		console.log('Updating cart item...')

		Cart.updateCartItem(cartId, itemId, lineItems)
			.then(res => {
				console.log(res);
				this.getCart()
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header allCategories={this.state.allCategories} mainCategories={this.state.mainCategories} cartTotal={this.state.cartTotal}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/category" component={AllProducts} />
						<Route exact path="/cart" render ={props => <CartPage
							cart={this.state.cart}
							getCart={this.getCart}
							deleteCartItem={this.deleteCartItem}
							updateCartItem={this.updateCartItem}
						/>}/>

						{
							this.state.mainCategories.map(tlc => {
								return <Route key={tlc.id} id={tlc.id} exact path={tlc.custom_url.url} component={Category} />
							})
						}

						{
							this.state.allProducts.map(product => {
								return <Route key={product.id} exact path={product.custom_url.url} render={props => <Product addToCart={this.addToCart} id={product.id} />} />
							})
						}

					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App;
