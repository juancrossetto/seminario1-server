const express = require("express");
const router = express.Router();
const uber = require("../controllers/uber");

// api/pushNotifications/getAllTokens
router.post("/authorization", uber.authUber);
router.post("/estimate", uber.getEstimate)
module.exports = router;
