import Cart from '../../utils/cartAPI';


export default {

	create: function (lineItems) {
		console.log('creating cart')
		Cart.createCart(lineItems)
			.then(res => {
				console.log(res)
				localStorage.setItem('cart', res.data.id) // probably not the best way, but fuck it.
			})
			.catch(err => console.log(err))
	},
	addTo: function() {
		console.log('adding')
	},
	get: function() {
		console.log('getting cart')
		Cart.getCart(localStorage.getItem('cart'))
			.then(res => {
				console.log(res)
			})
			.catch(err => console.log(err))
	}





}
