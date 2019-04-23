import axios from 'axios';

export default {

	storeInfo: function () {
		return axios.get(`/eyAPI/store/info`)
	}
}
