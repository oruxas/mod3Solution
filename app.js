( function(){

   var NarrowItDownAppp = angular.module('NarrowItDownApp',[]);

    NarrowItDownApp.controller('NarrowItDownController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
    }])
    .service('MenuSearchService', function(){
        var menuSearch = this;
        menuSearch.getMatchedMenuItems = function(searchTerm) { //input searchTerms
            return $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
            }).then(function (result) {
            // process result and only keep items that match
            var data;
            console.log(result.data);
            // for(data in result.data){

            // }
                //sconsole.log(result.data);
            var foundItems = [];

            // return processed items
            return foundItems;
        });
        }
    })

}());