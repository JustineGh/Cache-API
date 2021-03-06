const express = require('express');
const cacheDataRouter = express.Router();
const cacheDataController = require('../controllers/cache-data-controller');

cacheDataRouter.post('/createOrUpdate/:key', cacheDataController.createOrUpdate);
cacheDataRouter.get('/get', cacheDataController.getAllCacheData);
cacheDataRouter.get('/get/:key', cacheDataController.getCacheDataByKey);
cacheDataRouter.delete('/remove/:key', cacheDataController.removeCacheDataByKey);
cacheDataRouter.delete('/remove', cacheDataController.removeAllCacheData);

module.exports = cacheDataRouter;