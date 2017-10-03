angular.module("starter.services")
    .factory("Story", function ($http, Api) {

        return {
            returnStory: function (domain, storyId) {

                return $http.get(`${Api.baseUrl}stories/${domain}/${storyId}`)
            },
            returnStories: function (domain, number, offset) {

                offset = typeof offset !== 'undefined' ? offset : 0;

                return $http.get(`${Api.baseUrl}stories/${domain}/${number}/${offset}`)
            },
            returnStripsByStory: function (domain, storyId, number, offset) {

                offset = typeof offset !== 'undefined' ? offset : 0;

                console.log(`Load ${number} strips with offset ${offset}`);

                return $http.get(`${Api.baseUrl}strips/stories/${domain}/${storyId}/${number}/${offset}`)
                    .then(function (response) {
                    return response;
                });
            }
        }
    });
