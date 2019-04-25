var router = require('express').Router();
var API = require('../../config/connection');
const axios = require('axios');
require('dotenv').config()

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Completes api path to .../eyAPI/store/...
router.get("/", function (req, res) {
	res.status(200).send({
		message: 'Welcome to the Store API'
	});
});

router.get("/info", function (req, res) {
	console.log(process.env.HASH)

	axios.get(`https://api.bigcommerce.com/stores/${process.env.HASH}/v2/store`,
		{headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Auth-Client': process.env.CID,
			'X-Auth-Token': process.env.TOKEN
		}})
		.then((response) => {
			console.log('success')
			let responseData = { response };
			// console.log(responseData.response.data)
			res.status(200).send(responseData.response.data);
		})
		.catch((err) => {
			console.log('fail')
			console.log(err)
		})
})

module.exports = router;
