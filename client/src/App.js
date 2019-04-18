import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './views/Home';
import Category from './views/Category';
import Product from './views/Product';
import AllProducts from './views/AllProducts';
import Header from './components/Header';
import Products from './utils/productsAPI';
import Cart from './utils/cartAPI';
// import Cart from './assets/js/cart'


class App extends Component {

	state = {
		allCategories: [],
		mainCategories: [],
		allProducts: [],
		cart: null
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

	getCart() { //! Not working correctly...
		console.log('getting cart')
		Cart.getCart(localStorage.getItem('cart'))
			.then(res => {
				this.setState({ cart: res.data.response.data }, () => {
					console.log(this.state.cart)
				})
			})
			.catch(err => console.log(err))
	}

	render() {
		return (
			<Router>
				<div className="App">
					<Header allCategories={this.state.allCategories} mainCategories={this.state.mainCategories} cart={this.state.cart}/>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route exact path="/category" component={AllProducts} />
						{
							this.state.mainCategories.map(tlc => {
								return <Route key={tlc.id} id={tlc.id} exact path={tlc.custom_url.url} component={Category} />
							})
						}

						{
							this.state.allProducts.map(product => {
								return <Route key={product.id} id={product.id} exact path={product.custom_url.url} component={Product} />
							})
						}
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
