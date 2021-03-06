
const mongoose = require('mongoose');
const CacheDataModel = require('../models/cache-data');
const express = require('express'); 
const bodyParser = require('body-parser');
const routes = require("../routes/index");
const request = require("supertest");
const { config } = require('../config/config');
const app = express();

beforeAll(async () => {
    app.use(bodyParser.json());
    app.use("/api", routes);
    await mongoose.connect(config.db_url)
    .then(() => 
        app.listen(config.port)
     ).catch((error) => {
       console.log('Error: ', error);
     })
  });

describe('API Calls', () => {

    test('POST createOrUpdate', async () => {
        const initialDbDataSize = await CacheDataModel.countDocuments();
        return request(app)
        .post('/api/data/2')
        .send({
            value: 'test2'
        })
        .then( async (res) => {
            const newDbDataSize = await CacheDataModel.countDocuments();
            expect(newDbDataSize).toEqual(initialDbDataSize+1);
        });
    });

    test('GET allCacheData', async () => {
        const dbDataSize = await CacheDataModel.countDocuments();
        return request(app)
        .get('/api/data')
        .then( res => {
            expect(res.body.allValidCacheData.length).toEqual(dbDataSize);
        });
    });

    test('GET cacheDataByKey', async () => {
        return request(app)
        .get('/api/data/2')
        .then(res => {
            expect(res.body.cacheData.key).toEqual('2');
        });
    });

    test('DELETE cacheDataByKey', async () => {
        const initialDbDataSize = await CacheDataModel.countDocuments();
        return request(app)
        .delete('/api/data/2')
        .then( async (res) => {
            const newDbDataSize = await CacheDataModel.countDocuments();
            expect(newDbDataSize).toEqual(initialDbDataSize-1);
        });
    });

    test('DELETE allCacheData', async () => {
        return request(app)
        .delete('/api/data')
        .then( async (res) => {
            const newDbDataSize = await CacheDataModel.countDocuments();
            expect(newDbDataSize).toEqual(0);
        });
    });
})