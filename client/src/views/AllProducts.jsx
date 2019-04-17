import React, { Component }  from 'react';
import Products from '../utils/productsAPI';
import ProductCard from '../components/ProductCard';


class AllProducts extends Component {

	state = {
		products: [],
	}


	componentDidMount() {
		this.getProducts()
		console.log(this.props)
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
				<h1>All Products</h1>
				<h3>{this.props.id}</h3>

				{
					this.state.products.map(product => {
						return <ProductCard key={product.id} id={product.id} title={product.name} description={product.description}/>
					})
				}

			</main>

		)
	}

}

export default AllProducts;
