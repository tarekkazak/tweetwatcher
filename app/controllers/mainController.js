angular.module('twitterApp.controllers')
    .controller('mainController', ['$scope', 'settings', '$filter', 'tweetService', 'twitterUser', '$q', function($scope, settings, $filter, tweetService, TwitterUser, $q) {
        var me = this,
            appDirect, laughingSquid, techCrunch,
            currentSettings = settings.get();
        if(currentSettings) {
            appDirect = currentSettings.appDirect;
            laughingSquid = currentSettings.laughingSquid;
            techCrunch = currentSettings.techCrunch;
            $scope.skin = currentSettings.skin;
         }else {
             appDirect = new TwitterUser('AppDirect', 1);
            laughingSquid = new TwitterUser('LaughingSquid', 2);
            techCrunch = new TwitterUser('TechCrunch', 3);
            $scope.skin = 'default';
            currentSettings = {
                appDirect : appDirect,
                laughingSquid : laughingSquid,
                techCrunch : techCrunch,
                skin : $scope.skin
            };
         }
        $scope.settingsEnabled = settings.enabled;
        $scope.editMode = false;        


        me.parseTweets = function(data) {
            var parsed = _.map(data.data, function(item) {
                var user = item.entities.user_mentions.length > 0 ? item.entities.user_mentions[0].screen_name : item.user.name;
                return {
                    user:'@' + user,
                    creationDate:$filter('date')(new Date(item.created_at), 'EEE MMM dd yyyy'),
                    content:item.text,
                    url:'https://twitter.com/' + item.user.name + '/status/' + item.id_str
                };
            });
            return parsed;
        };
        
        $q.all([
           tweetService.get('/tweets/laughingsquid').then(function(data) {
                laughingSquid.tweets =  me.parseTweets(data); 
           }),

           tweetService.get('/tweets/techcrunch').then(function(data) {
                techCrunch.tweets =  me.parseTweets(data); 
           }),
           
           tweetService.get('/tweets/appdirect').then(function(data) {
                appDirect.tweets =  me.parseTweets(data); 
           })
       ]).then(function(values) {
           $scope.users = [appDirect, laughingSquid, techCrunch];
       });

       $scope.updateSettings = function() {
            currentSettings.skin = $scope.skin;
            settings.store(currentSettings);
            $scope.editMode = false;
       };
       
       
       $scope.pushLeft = function(index) {
           var user,
               l = $scope.users.length,
               i = 0;
                
            while(i < l) {
                user = $scope.users[i];
                if(user.index === 1) {
                    user.index = 3;
                } else {
                    user.index--;
                }
                i++;
            }
       };
       
       $scope.pushRight = function() {
           var user,
               l = $scope.users.length,
               i = 0;
                
            while(i < l) {
                user = $scope.users[i];
                if(user.index === 3) {
                    user.index = 1;
                } else {
                    user.index++;
                }
                i++;
            }
       };
       
    }]);
