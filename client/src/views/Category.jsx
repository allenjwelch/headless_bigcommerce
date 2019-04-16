import React, { Component }  from 'react';
import API from '../utils/productsAPI';
import ProductCard from '../components/ProductCard';


class Category extends Component {

	state = {
		products: [],
	}


	componentDidMount() {
		this.getProducts()
	}

	getProducts() {
		API.getAllProducts()
			.then(res =>
				this.setState({ products: res.data.response.data }, () => {
					console.log(this.state.products)
				}))
	}


	render() {
		return (
			<main className="category-page">
				<h1>Category Page</h1>

				{
					this.state.products.map(product => {
						return <ProductCard key={product.id} id={product.id} title={product.name} description={product.description}/>
					})
				}

			</main>

		)
	}

}

export default Category;
