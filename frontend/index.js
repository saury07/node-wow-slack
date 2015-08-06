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
            {value:0, display:"Tout"},
        ];

        $scope.selectCharacter = function(character){
            $http.get('loots/'+character.name).success(function(data){
                $scope.loots = data.data;
                $scope.selectedCharacter = character;
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
        };

        init()

    }]);