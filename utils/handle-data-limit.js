const CacheData = require('../models/cache-data');
const generateTtl = require('./generate-ttl');
const HttpError = require('../models/http-error');

async function hanldeDataLimit(key, value) {
    let oldestCacheData;
    try {
        oldestCacheData = await CacheData.find({}).sort({
            expiresAt: 1,
            createdAt: 1
        }).findOne();

        await oldestCacheData.updateOne({
            key,
            value,
            createdAt: new Date(),
            expiresAt: generateTtl()
        });
        
        return oldestCacheData;

    } catch(error) {
        const error = new HttpError(
            'Something went wrong, please try again.',
            500
          );
        return next(error);
    }
}

module.exports = hanldeDataLimit;