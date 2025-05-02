const router = require("express").Router();
const { appendTransfers } = require("../controllers/transferControllers.js");

router.post("/transfer-money", appendTransfers);

module.exports = router;