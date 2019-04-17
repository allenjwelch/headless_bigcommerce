import React, { Component } from 'react';
import Products from '../utils/productsAPI';
import ProductCard from '../components/ProductCard';


class Category extends Component {

	state = {
		products: [],
	}


	componentDidMount() {
		this.getProducts()
		const { id, name } = this.props.location.state
		this.setState({id, name})
	}

	getProducts() {
		Products.getAllProducts()
			.then(res =>
				this.setState({ products: res.data.response.data }, () => {
					console.log(this.state.products)
				}))
	}


	render() {
		return (
			<main className="category-page">
				<h1>{this.state.name}</h1>
				<h3>Category Page</h3>

				{
					this.state.products.filter(product => {
						for(let i = 0; i < product.categories.length; i++) {
							if (product.categories[i] === this.state.id) {
								return true
							}
						}
					}).map(product => {
						return <ProductCard key={product.id} id={product.id} title={product.name} url={product.custom_url.url} description={product.description} />
					})
				}

			</main>

		)
	}

}

export default Category;
