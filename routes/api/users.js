const router = require("express").Router();
const API = require('../../config/connection');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Completes api path to .../eyAPI/users/...
router.get("/", function (req, res) {
    res.status(200).send({
        message: 'Welcome to the Users API'
    });
});

router.get('/all', (req, res) => {
    API.get('/customers')
        .then((response) => {
            let responseData = { response };
            res.status(200).send(responseData);
        })
        .catch((err) => {
            console.log(err)
        })
});

router.get('/current', (req, res) => {
    var appClientId = "rsxgw189jn69wb778y160794ysu9iew";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                console.log('Customer JWT:\n' + xmlhttp.responseText);
            }
            else if (xmlhttp.status == 404) {
                console.log('Not logged in!');
            }
            else {
                console.log('Something went wrong');
            }
        }
    };
    xmlhttp.open("GET", "https://eystudios-stencil.mybigcommerce.com/customer/current.jwt?app_client_id=" + appClientId, true);
    xmlhttp.send();
});






module.exports = router;
