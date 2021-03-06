const CacheData = require('../models/cache-data');
const generateTtl = require('./generate-ttl');
const generateString = require('./generate-string');

async function hanldeDataTtl(cacheData) {
    const currentDate = new Date();
    cacheData.map(async (data) => {
        // If expired, generate new random value
        if(data.expiresAt < currentDate) {
            data.value = generateString(5);
        }
        // Reset TTL on every Read
        data.expiresAt = generateTtl();
        await data.save();
        return data;
    });

    return cacheData;
}

module.exports = hanldeDataTtl;