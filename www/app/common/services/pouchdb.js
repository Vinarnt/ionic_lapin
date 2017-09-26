function PouchDBCache() {
    console.log("Init pouchdb");

    let cacheDB = new PouchDB("database.db");

    return {
        addToCache: function (key, value) {

            console.log(`Add item ${key} to cache : ${value}`);

            let cacheDocument = {
                _id: key,
                value: value
            };
            cacheDB.put(cacheDocument, function (error, result) {
                if (error)
                    console.log(error);
                else
                    console.log(result);
            });
        },
        getFromCache: function (key) {

            console.log("Get item " + key + " from cache");

            return cacheDB.get(key).value;
        },
        removeFromCache: function (key) {
            console.log(`Remove item ${key} from cache`);
        }
    };
}

angular.module('starter.services')
    .service('PouchDBCache', PouchDBCache);