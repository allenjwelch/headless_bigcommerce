import axios from 'axios';

export default {

	createCart: function(lineItems) {
		return axios.post(`/eyAPI/cart/create`, {lineItems})
	},
	getCart: function(cartId) {
		console.log('hittin')
		return axios.get(`/eyAPI/cart/mycart/${cartId}`)
	}

}
