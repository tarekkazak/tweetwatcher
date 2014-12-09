angular.module('twitterApp.directives')
    .directive('recentTweets', function() {
        return {
            restrict : 'E',
            scope : {
                source : '='
            },
            replace:true,
            templateUrl : 'templates/recentTweets.html',
            link : function(scope, elem, attrs) {
                scope.$watch('source.count', function(value) {
                    if(value) {
                        scope.tweets = scope.source.tweets.slice(0, value);
                    }
                });
                scope.$watch('source', function(value) {
                    if(value) {
                        scope.tweets = value.tweets.slice(0, value.count);
                    }
                });            
            }

        };
    });
