const CacheData = require('../models/cache-data');

const createOrUpdate = async (req,res,next) => {
  const { key } = req.params;
  const { value } = req.body;

  let cacheData = await CacheData.findOne({key});

  if(!cacheData) {
      let data = new CacheData({
          key,
          value,
          createdAt: new Date(),
          expiresAt: new Date()
      });

      try {
        await data.save();
      } catch (err) {
          console.log('error', error);
      }
      res.status(201).json({ data });

  } else {
      cacheData.value = value;
      try {
        await cacheData.save();
      } catch (err) {
          console.log('error', error);
      }
      res.status(200).json({ cacheData });
    }
}


exports.createOrUpdate = createOrUpdate;

