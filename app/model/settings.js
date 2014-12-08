angular.module('twitterApp.model')
    .factory('settings', ['$window', function($window) {
        var storage, enabled;
        if(!_.isUndefined(typeof(Storage))) {
            storage = $window.localStorage;
            enabled = true;
        } else {
            storage = {
                getItem : function(key) {
                    return false;
                },
                setItem : function(key, data) {
                    return false;
                }
            }
            enabled = false;
        }

        return {
            enabled : enabled,
            get : function() {
                return JSON.parse(storage.getItem('appd'));
            },
            store : function(data) {
                storage.setItem('appd', JSON.stringify(data));
            }
        };
    }]);
