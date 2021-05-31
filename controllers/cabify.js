const { validationResult } = require("express-validator");
const axios = require('axios');

// get getAUTH
exports.authCabify = async (req, res) => {
    axios.post('https://cabify-sandbox.com/auth/api/authorization?grant_type=client_credentials&client_id=54b97d8fcb6746b98d379987b97294c4&client_secret=VW-CLqjQBNns0sM0', {})
        .then(function (response) {
            console.log(response.data);
            return res
                .status(200)
                .json({ token: response.data.access_token })
        })
        .catch(function (error) {
            console.log(error);
        });
};

exports.getEstimate = (req, res) => {
    const headers = {
        'Authorization': 'Bearer ' + req.body.token
    }
    console.log('paso')
    axios.post('https://cabify-sandbox.com/api/v3/graphql', {
        "query": "query estimates ($estimateInput: EstimatesInput) {    estimates (estimateInput: $estimateInput) {        distance        duration        eta {            formatted            lowAvailability            max            min        }        priceBase {            amount            currency        }        product {            description {                en                es                pt            }            icon            id            name {                ca                en                es                pt            }        }        route        supplements {            description            kind            name            payToDriver            price {                amount                currency                currencySymbol                formatted            }            taxCode        }        total {            amount            currency        }    }}",
        "variables": {
            "estimateInput": {
                "requesterId": "fef1c049f27a53e9e185037423d49108",
                "startAt": "",
                "startType": "ASAP",
                "stops": [{
                    "loc": req.body.start
                }, {
                    "loc": req.body.finish
                }]
            }
        }
    }, { headers: headers })
        .then(function (response) {
            console.log('PASO');

            return res.status(200).json({ data: response.data.data.estimates });
        })
        .catch(function (error) {
            console.log('error');
        });
};

