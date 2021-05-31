const express = require("express");
const router = express.Router();
const cabify = require("../controllers/cabify");

// api/pushNotifications/getAllTokens
router.post("/authorization", cabify.authCabify);
router.post("/estimate", cabify.getEstimate)
module.exports = router;
