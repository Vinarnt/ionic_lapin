angular.module('starter')
    .config(function ($httpProvider) {

        /**
         ** Interceptor to queue HTTP requests.
         **/
        $httpProvider.interceptors.push(['$q', $q => {

            let imageQueue = [];
            let generalQueue = [];

            /**
             ** Executes the top function on the general queue (if any).
             **/
            function executeGeneralTail() {

                if (generalQueue.length === 0) {
                    return;
                }

                generalQueue[0]();
            }

            /**
             ** Executes the top function on the image queue (if any).
             **/
            function executeImageTail() {

                if (imageQueue.length === 0) {
                    return;
                }

                imageQueue[0]();
            }

            return {
                /**
                 ** Blocks each request on the queue. If the first request, processes immediately.
                 **/
                request: config => {

                    if (isHttp(config)) {

                        console.log(config);

                        let deferred = $q.defer();

                        let isImage = isImageRequest(config);
                        let queue;

                        if(isImage) {
                            queue = imageQueue;
                        } else {
                            queue = generalQueue;
                        }

                        queue.push(function () {

                            deferred.resolve(config);
                        });

                        if (!isImage && generalQueue.length === 1) {

                            executeGeneralTail();
                        } else if (imageQueue.length === 1) {

                            executeImageTail();
                        }

                        return deferred.promise;
                    } else {

                        return config;
                    }
                },

                /**
                 ** After each response completes, unblocks the next request.
                 **/
                response: response => {

                    if (isHttp(response.config)) {

                        if(isImageRequest(response.config)) {

                            imageQueue.shift();
                            executeImageTail();
                        } else {

                            generalQueue.shift();
                            executeGeneralTail();
                        }
                    }

                    return response;
                },

                /**
                 ** After each response errors, unblocks the next request.
                 **/
                responseError: responseError => {

                    if (isHttp(responseError.config)) {

                        if(isImageRequest(responseError.config)) {

                            imageQueue.shift();
                            executeImageTail();
                        } else {

                            generalQueue.shift();
                            executeGeneralTail();
                        }
                    }

                    return $q.reject(responseError);
                },
            };
        }]);

        let isHttp = config => {

          return config.url.substring(0, 4) === 'http';
        };

        let isImageRequest = config => {

            return config.url.includes('strips/image');
        }
    });
