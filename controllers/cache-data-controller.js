const CacheData = require('../models/cache-data');
const generateTtl = require('../utils/generate-ttl');
const hanldeDataLimit = require('../utils/handle-data-limit');
const generateString = require('../utils/generate-string');
const hanldeDataTtl = require('../utils/handle-data-ttl');
const { config } = require('../config/config');
const HttpError = require('../models/http-error');

const createOrUpdate = async (req, res, next) => {
  const { key } = req.params;
  const { value } = req.body;

  let cacheData = await CacheData.findOne({key});

  if(!cacheData) {
    const dbSize = await CacheData.countDocuments();
    let data;
    if(dbSize < config.db_items_limit) {
        try {
            data = new CacheData({
                key,
                value,
                createdAt: new Date(),
                expiresAt: generateTtl()
            });
            await data.save();
        } catch (err) {
            const error = new HttpError(
                'Creating data failed, please try again.',
                500
              );
            return next(error);
        }
    } else {
        data = await hanldeDataLimit(key, value);
    }
    
    res.status(201).json('Data created successfully!');

  } else {
      cacheData.value = value;
      // Reset TTL on cache hit
      cacheData.expiresAt = generateTtl();
      try {
        await cacheData.save();
      } catch (err) {
        const error = new HttpError(
            'Updating data failed, please try again.',
            500
          );
        return next(error);
      }
      res.status(200).json('Data updated successfully!');
    }
}

const getAllCacheData = async (req,res,next) => {
        try {
            let allCacheData = await CacheData.find({});
            let allValidCacheData = await hanldeDataTtl(allCacheData);
        } catch (err) {
            const error = new HttpError(
                'Something went wrong',
                500
              );
            return next(error);
        }

        res.status(200).json({ allValidCacheData });

  }

const getCacheDataByKey = async (req,res,next) => {
    const { key } = req.params;
    let cacheData;

    try {
        cacheData = await CacheData.findOne({key});
        if(!cacheData) {
            console.log('Cache Miss');
            const dbSize = await CacheData.countDocuments();
            let randomValue = generateString(5);
            if(dbSize < config.db_items_limit) {
                try {
                    cacheData = new CacheData({
                        key,
                        value: randomValue,
                        createdAt: new Date(),
                        expiresAt: generateTtl()
                    });
                    await cacheData.save();
                } catch (err) {
                    const error = new HttpError(
                        'Retrieving data failed, please try again.',
                        500
                      );
                    return next(error);
                }
                res.status(200).json({ randomValue });

            } else {
                cacheData = await hanldeDataLimit(key, randomValue);
                res.status(200).json({ randomValue });
            }
        } else {
            console.log('Cache hit');
            // Reset TTL on cache hit
            cacheData.expiresAt = generateTtl();
            await cacheData.save();
            res.status(200).json({ cacheData });
        }
    } catch (err) {
        const error = new HttpError(
            'Retrieving data failed, please try again.',
            500
          );
        return next(error);
    }

}

const removeCacheDataByKey = async (req, res, next) => {
    const { key } = req.params;

    let cacheData;
    try {
        cacheData = await CacheData.findOne({key});
        if(!cacheData) {
            const error = new HttpError(
                'Could not find data for the provided key.',
                404
              );
            return next(error);
        } else {
            await cacheData.remove();
            res.status(200).json({ message: 'Deleted cache data.' });
        }
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, please try again.',
            500
          );
        return next(error);
    }
}

const removeAllCacheData = async (req, res, next) => {
    try {
        await CacheData.remove();
        res.status(200).json({ message: 'Deleted all cache data.' });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, please try again.',
            500
          );
        return next(error);
    }
    
}

exports.createOrUpdate = createOrUpdate;
exports.getAllCacheData = getAllCacheData;
exports.getCacheDataByKey = getCacheDataByKey;
exports.removeCacheDataByKey = removeCacheDataByKey;
exports.removeAllCacheData = removeAllCacheData;

