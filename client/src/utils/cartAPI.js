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
	},
	updateCartItem: function (cartId, itemId, lineItems) {
		return axios.put(`/eyAPI/cart/mycart/update/${cartId}/${itemId}`, { lineItems })
	},
	deleteCartItem: function (cartId, itemId) {
		return axios.delete(`/eyAPI/cart/mycart/delete/${cartId}/${itemId}`)
	}

}
