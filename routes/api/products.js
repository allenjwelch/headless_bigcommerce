var router = require('express').Router();
var API = require('../../config/connection');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Completes api path to .../eyAPI/products/...
router.get("/", function (req, res) {
    res.status(200).send({
        message: 'Welcome to the Products API'
    });
});

router.get('/all', (req, res) => {
	API.get('/catalog/products')
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
});

router.get("/:id", function (req, res) {
	API.get(`/catalog/products/${req.params.id}`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.get("/:id/images", function (req, res) {
	API.get(`/catalog/products/${req.params.id}/images`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.get("/:id/options", function (req, res) {
	API.get(`/catalog/products/${req.params.id}/options`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.get("/:id/variants", function (req, res) {
	API.get(`/catalog/products/${req.params.id}/variants`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.get("/:id/reviews", function (req, res) {
	API.get(`/catalog/products/${req.params.id}/reviews`)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})

router.get("/sku/:sku", function (req, res) {
	console.log(req.params.sku);
	var skuNumber = req.params.sku;

	API.get('/catalog/products?sku=' + skuNumber)
		.then((response) => {
			let responseData = { response };
			res.status(200).send(responseData);
		})
		.catch((err) => {
			console.log(err)
		})
})















// router.get("/sku/:sku", function (req, res) {
//     console.log(req.params.sku);
//     var skuNumber = req.params.sku;

//     API.get('/catalog/products?sku=' + skuNumber)

// 	.then(function (product) {
//         API.get('optionsets/' + product[0].option_set_id + '/options')
//             .then(function (options) {
//                 var productData = {
//                     productName: product[0].name,
//                     productSku: product[0].sku,
//                     productPrice: product[0].price,
//                     productSalePrice: product[0].sale_price,
//                     productRetailPrice: product[0].retail_price,
//                     productImage: product[0].primary_image.standard_url,
//                     productId: product[0].id,
//                     productOptionsId: product[0].option_set_id,
//                     productOptions: {
//                         options
//                     },
//                     productOptionAttributes: {},
//                     productUrl: product[0].custom_url
//                 };
//                 res.status(200).json(productData);
//             })
//     })
//     .catch((err) => {
//         console.log(err)
//     })
// })


    // app.get("/options/:id", function(req,res) {
    //     console.log(req.params.id);
    //     var optionId = req.params.id;
    //     api.get('option_sets/'+optionId+'/options').then(function(options) {
    //       var optionData = options;
    //       console.log(optionData);
    //       res.status(200).send(optionData);
    //       return optionData;
    //     })
    // });
    // app.get("/product/options/:id", function(req,res) {
    //     console.log(req.params.id);
    //     var productOptionId = req.params.id;
    //     api.get('products/'+productOptionId+'/options').then(function(options) {
    //         var optionData = options;
    //         console.log(optionData);
    //         res.status(200).send(optionData);
    //         return optionData;
    //     })
    // });

// };

module.exports = router;
