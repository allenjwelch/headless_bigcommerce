var router = require('express').Router();
var API = require('../../config/connection');
const axios = require('axios');
require('dotenv').config()

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// res.header("Accept", `application/json`)
	// res.header("Content-Type", `application/json`)
	// res.header("X-Auth-Client", `${process.env.CID}`)
	// res.header("X-Auth-Token", `${process.env.TOKEN}`)
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

	// let data = {
	// 	host: ``,
	// 	config: {
	// 		hash: process.env.HASH,
	// 		token: process.env.TOKEN,
	// 		cid: process.env.CID,
	// 		host: process.env.HOST, //The BigCommerce API Host
	// 	}
	// }

	// let headers = {
	// 	'Accept': 'application/json',
	// 	'Content-Type': 'application/json',
	// 	'X-Auth-Client': process.env.CID,
	// 	'X-Auth-Token': process.env.TOKEN
	// }


	axios.get(`https://api.bigcommerce.com/stores/${process.env.HASH}/v2/store`,
		{headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'X-Auth-Client': process.env.CID,
			'X-Auth-Token': process.env.TOKEN
		}})
		.then((response) => {
			console.log('success')
			// console.log(response)
			let responseData = { response };
			console.log(responseData.response.data)
			res.status(200).send(responseData.response.data);
			// JSON.stringify(response)
			// var cache = [];
			// JSON.stringify(response, function (key, value) {
			// 	if (typeof value === 'object' && value !== null) {
			// 		if (cache.indexOf(value) !== -1) {
			// 			// Duplicate reference found
			// 			try {
			// 				// If this value does not reference a parent it can be deduped
			// 				return JSON.parse(JSON.stringify(value));
			// 			} catch (error) {
			// 				// discard key if value cannot be deduped
			// 				return;
			// 			}
			// 		}
			// 		// Store value in our collection
			// 		cache.push(value);
			// 	}
			// 	return value;
			// });
			// console.log(cache.pop())
		})
		.catch((err) => {
			console.log('fail')
			console.log(err)
		})
})

module.exports = router;
