var router = require('express').Router();
var API = require('../../config/connection');

router.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Completes api path to .../eyAPI/brands/...
router.get("/", function (req, res) {
	res.status(200).send({
		message: 'Welcome to the Brands API'
	});
});

router.get('/all', (req, res) => {
	API.get('/catalog/brands')
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
});

router.get("/:id", function (req, res) {
	API.get(`/catalog/brands/${req.params.id}`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})



module.exports = router;
