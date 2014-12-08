angular.module('twitterApp.services')
    .factory('tweetService', ['$http', function($http) {
        return (function() {
           
            return {
                get : function(url) {
                    return $http.get(url);         
                }
           }; 
        }());  
        
    }]);
