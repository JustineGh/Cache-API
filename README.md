# Cache-API

# Overview
Follow these steps to run the server:
1. **Npm install**

2. **Create .env same as .env-example**

3. **Connect to MongoDB**

4. **Npm start**

5. **Npm test**

# Endpoints
## /api/data/2
* This call is used to createOrUpdate

* Method: POST

Sample request:

      {
         "value": "test2"
	     }

Sample response:
~~~
{
    "message": "Data created successfully!"
}
~~~

## /api/data/2
* This call is used to retrieve data for the provided key

* Method: GET

Sample response:
~~~
{
    
    "cacheData": {
        "_id": "60438d7859d78f41a4be190d",
        "key": "2",
        "value": "test2",
        "createdAt": "2021-03-06T14:11:04.025Z",
        "expiresAt": "2021-03-13T14:11:37.139Z",
        "__v": 0
    }

}
~~~


## /api/data
* This call is used to retrieve all data

* Method: GET

Sample response:
~~~
{
    "allValidCacheData": [
        {
            "_id": "60438d7859d78f41a4be190d",
            "key": "2",
            "value": "test2",
            "createdAt": "2021-03-06T14:11:04.025Z",
            "expiresAt": "2021-03-13T14:12:53.879Z",
            "__v": 0
        }
    ]
}
~~~

## /api/data/2
* This call is used to delete data for the provided key
 
* Method: DELETE

Sample response:
~~~
{
    "message": "Deleted cache data."
}
~~~

## /api/data
* This call is used to delete all cache data

* Method: DELETE

Sample response:
~~~
{
    "message": "Deleted all cache data."
}
~~~



