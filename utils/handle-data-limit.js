const CacheData = require('../models/cache-data');
const generateTtl = require('./generate-ttl');

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

    }
}

module.exports = hanldeDataLimit;