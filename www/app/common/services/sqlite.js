function SQLite() {

    console.log("Init sqlite service");
}

angular.module('starter')
    .run(function (DS) {
        DS.registerAdapter('sql', new SqlAdapter({
            knexOpts: {
                client: 'sqlite3'
            }
        }))
    });

angular.module('starter.services')
    .service('SQLite', SQLite);
