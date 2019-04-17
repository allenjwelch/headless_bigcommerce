import axios from 'axios';

export default {

	getAllProducts: function () {
		return axios.get(`/eyAPI/products/all`)
	},
	getProductImages: function(id) {
		return axios.get(`/eyAPI/products/${id}/images`)
	},
	getAllCategories: function() {
		return axios.get(`/eyAPI/categories/all`)
	},
	getProductById: function (id) {
		return axios.get(`/eyAPI/products/${id}`)
	}

}
