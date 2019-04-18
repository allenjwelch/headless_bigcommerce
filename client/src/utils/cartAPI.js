import axios from 'axios';

export default {

	createCart: function(lineItems) {
		return axios.post(`/eyAPI/cart/create`, {lineItems})
	},
	getCart: function(cartId) {
		return axios.get(`/eyAPI/cart/mycart/${cartId}`)
	},
	addToCart: function (cartId, lineItems) {
		return axios.post(`/eyAPI/cart/mycart/addto/${cartId}`, { lineItems })
	}

}
