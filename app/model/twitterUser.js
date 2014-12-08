angular.module('twitterApp.model')
    .factory('twitterUser', function() {
        return function(user, index) {
            this.count = 30; //default value
            this.tweets= [];
            this.user = user;
            this.index = index;
        };
    });
