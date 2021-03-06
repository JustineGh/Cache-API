const express = require('express');
const cacheDataRoutes = require('./cache-data-routes');

const router = express.Router();

router.use('/data', cacheDataRoutes);

module.exports = router;

