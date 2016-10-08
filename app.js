( function(){ 
    angular.module('NarrowItDownApp',[])

    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);



    function FoundItemsDirective(){
        var ddo = {                         //directive definition object
            template: '<div> <ul data-ng-model="narrowit.found"> <li ng-repeat="item in narrowit.items"> {{item.name}} ({{item.short_name}}) {{item.description}}  <button ng-click="narrowit.onRemove({index: $index})">Dont want this one</button></li> </ul></div>',
            restrict: 'E',
            scope: {
                items: "<",
                onRemove: "&"
            },
            controller: NarrowItDownController,
            controllerAs: 'narrowit',
            bindToController: true,
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['$scope','MenuSearchService']

    function NarrowItDownController($scope, MenuSearchService) {
       var narrowit = this;    
       var found=[];
       narrowit.getlist = function(searctTerm){

             MenuSearchService.getMatchedMenuItems(narrowit.searchTerm).then(function(result){
                // console.log(Object.getOwnPropertyNames(result));

                narrowit.found = result;
                console.log(narrowit.found);

             }); 
                        
        }; //end of getList
        narrowit.removeItem = function (itemIndex) {
                    //console.log(itemIndex);
                  
                    narrowit.found.splice(itemIndex,1);
                   
                };  
    };

     MenuSearchService.$inject = ['$http'];
     function MenuSearchService($http){
         var service = this;
        var foundItems = [];
         service.getMatchedMenuItems = function (searchTerm) { //input searchTerms
             return $http({
                 method: "GET",
                 url: "https://davids-restaurant.herokuapp.com/menu_items.json"
             }).then(function(result){
                
                 //alert(JSON.stringify(result));
                
                 
                 for (var i = 0; i < result.data.menu_items.length; i++) {
                    var description = result.data.menu_items[i].description;
                    if (description.indexOf(searchTerm) !== -1) {
                        foundItems.push(result.data.menu_items[i]);
                    }
                    }

 
                return foundItems;
                  
             });
             
         };

     }  
}());