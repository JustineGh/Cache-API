const express = require('express');
const cacheDataRouter = express.Router();
const cacheDataController = require('../controllers/cache-data-controller');

cacheDataRouter.post('/:key', cacheDataController.createOrUpdate);
cacheDataRouter.get('/', cacheDataController.getAllCacheData);
cacheDataRouter.get('/:key', cacheDataController.getCacheDataByKey);

module.exports = cacheDataRouter;