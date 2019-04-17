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
	console.log(req.body.lineItems)

	axios({
		method: 'post',
		url: 'https://eystudios-stencil.mybigcommerce.com/api/storefront/carts',
		data: {
			"lineItems": [req.body.lineItems ]
			// 	{
			// 		"quantity": 1,
			// 		"productId": 130
			// 	}
			// ]
		}
	})
	.then(cart => {
		console.log(cart.data)
		res.json(cart.data)
	})
	.catch(err => console.log(err))
})

router.get("/mycart/:cartId", function(req, res) {
	console.log(req.params)
	axios({
		method: 'get',
		url: `https:///eystudios-stencil.mybigcommerce.com/api/storefront/carts/${req.params.cartId}`,
	})
	.then((response) => {
		let responseData = { response };
		res.status(200).send(responseData);
	})
	.catch(err => console.log(err))
})

// router.put()
// router.delete()
// https://developer.bigcommerce.com/api-reference/cart-checkout/storefront-cart-api/cart/getacart


module.exports = router;
