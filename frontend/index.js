angular.module('wowApp', [])
    .filter('moment',function(){
        return function(dateString, format) {
            return moment(dateString).format(format);
        };
    })
    .controller('WoWLootsController', ['$scope','$http',function($scope, $http) {

        $scope.characters = [];

        $scope.loots = [];

        $scope.ilvlFilter = {value:695, display:">=695"};

        $scope.ilvlFilterOptions = [
            {value:695, display:">=695"},
            {value:685, display:">=685"},
            {value:670, display:">=670"},
            {value:0, display:"Tout"}
        ];

        $scope.rankFilterOptions = [
            {value:1, display:"Roster"},
            {value:0, display:"Tout"}
        ];
        $scope.rankFilter = {value:1, display:"Roster"};

        $scope.selectGuildLoots = function() {
            $http.get('loots/guild/lootsOfTheDay').success(function(data){
                $scope.loots = data.data;
                $scope.selectedCharacter = 'Guilde';
            });
        };

        $scope.selectCharacter = function(character){
            $http.get('loots/'+character.name).success(function(data){
                $scope.loots = data.data;
                $scope.selectedCharacter = character.name;
            });
        };

        $scope.updateCharacters = function() {
            $http.get('characters/update').success(function(data){
                $scope.characters = data.characters;
            });
        };

        var init = function(){
            $http.get('characters').success(function(data){
                $scope.characters = data.characters;
            });
            $http.get('/loots/guild/lootsOfTheDay').success(function(data){
                $scope.loots = data.data;
                $scope.selectedCharacter = 'Guilde';
            });
        };

        init()

    }]);