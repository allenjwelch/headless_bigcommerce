var router = require('express').Router();
var API = require('../../config/connection');
const axios = require('axios');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Completes api path to .../eyAPI/cart/...
router.get("/", function (req, res) {
	res.status(200).send({
		message: 'Welcome to the Cart API'
	});
});

router.post("/create", function (req, res) {
	console.log('Data Received: ', req.body.lineItems)

	API.post('/carts', req.body.lineItems)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log('this shit')
			console.log(err)
		})
})

router.get("/mycart/:cartId", function(req, res) {
	console.log(req.params)
	API.get(`/carts/${req.params.cartId}`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.post("/mycart/addto/:cartId", function(req, res) {
	console.log('adding to cart')
	console.log(req.body.lineItems)
	console.log(req.params.cartId)
	API.post(`/carts/${req.params.cartId}/items`, req.body.lineItems)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.put("/mycart/update/:cartId/:itemId", function(req, res) {
	console.log('updating cart item')
	console.log(req.body.lineItems)
	console.log('cartId: ', req.params.cartId)
	console.log('itemId: ', req.params.itemId)
	API.put(`/carts/${req.params.cartId}/items/${req.params.itemId}`, req.body.lineItems)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.delete("/mycart/delete/:cartId/:itemId", function (req, res) {
	console.log('deleting cart item...')
	console.log('cartId: ', req.params.cartId)
	console.log('itemId: ', req.params.itemId)
	API.delete(`/carts/${req.params.cartId}/items/${req.params.itemId}`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})
// https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api/cart/getacart


module.exports = router;
