import React from 'react';
import Products from '../utils/productsAPI'

class ProductPickList extends React.Component {

	state = {
		image: '',
	}

	componentDidMount() {
		Products.getProductImages(this.props.id)
			.then(res => {
				this.setState({ image: res.data.response.data[0].url_standard }, () => {
					// console.log(this.state.image)
				})
			})
			.catch(err => console.log(err))
	}
	// (function() {
	// 	console.log(this.props)
	// 	Products.getProductImages(this.props.id)
	// 	.then(res => {
	// 		console.log(res)
	// 		this.setState({ image: res.data.response.data[0].url_standard}, () => {
	// 			console.log(this.state.image)
	// 		})
	// 		image = res.data.response.data[0].url_standard;
	// 	})
	// 	.catch(err => console.log(err))
	// })();

	style = {
		height: "40px",
		width: "40px",
		padding: "0px"
	}

	render() {
		return (
			<li style={this.style}>
				{
					this.state.image.length > 0 && <img src={this.state.image} style={this.style} alt="" />
				}
			</li>
		)
	}
}


export default ProductPickList;
