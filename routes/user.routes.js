const { searchInXl } = require('../controllers/search')

const express = require("express")

const router = express.Router()

router.post("/search",searchInXl);

module.exports = router