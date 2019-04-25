import axios from 'axios';

export default {

	getAllProducts: function () {
		return axios.get(`/eyAPI/products/all`)
	},
	getProductById: function (id) {
		return axios.get(`/eyAPI/products/${id}`)
	},
	getProductImages: function(id) {
		return axios.get(`/eyAPI/products/${id}/images`)
	},
	getProductOptions: function (id) {
		return axios.get(`/eyAPI/products/${id}/options`)
	},
	getProductModifiers: function (id) {
		return axios.get(`/eyAPI/products/${id}/modifiers`)
	},
	getAllCategories: function() {
		return axios.get(`/eyAPI/categories/all`)
	},

}
