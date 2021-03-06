const dotenv = require('dotenv');
dotenv.config();

const env = process.env.NODE_ENV || 'dev';

const config = {
    port: process.env.PORT || 3000,
    db_url: env == 'dev' ? process.env.MONGO_DB_URL_DEV : process.env.MONGO_DB_URL_TEST,
    env,
    db_items_limit: process.env.MAX_NBR_ITEMS_IN_DB || 10
}

exports.config = config;