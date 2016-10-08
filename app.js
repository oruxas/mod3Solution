( function(){ 
    angular.module('NarrowItDownApp',[])

    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);



    function FoundItemsDirective(){
        var ddo = {                         //directive definition object
            templateUrl: '',
            restrict: 'E',
            scope: {
                foundItems: "<",
                onRemove: "&"
            }  
        };
        return ddo;
    }

    

    // function FoundItemsDirectiveController($scope){
    //     var list = this;

    //      list.removeItem = function(){
    //          var index = $scope.found.indexOf(item);
    //         $scope.found.splice(index,1);
    //      }   
        
    // }

    NarrowItDownController.$inject = ['MenuSearchService']

    function NarrowItDownController(MenuSearchService) {
       var narrowit = this;    
       var menuSearch = MenuSearchFactory();

       narrowit.getlist = function(searctTerm){
             MenuSearchService.getMatchedMenuItems(narrowit.searchTerm).then(function(result){
                // console.log(Object.getOwnPropertyNames(result));

                narrowit.found = result;
                console.log(narrowit.found);
                 
            });     
        }   

        narrowit.removeItem = function (itemIndex) {
            alert('clicked');
            //console.log("'this' is: ", this);
            //this.lastRemoved = "Last item removed was " + this.foundItems[itemIndex].name;
            MenuSearchService.removeItem(itemIndex);
           // this.title = origTitle + " (" + list.items.length + " items )";
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

                 for (var i = 0; i < result.data.menu_items.length; i++) {
                    var description = result.data.menu_items[i].description;
                    if (description.indexOf(searchTerm) !== -1) {
                        foundItems.push(result.data.menu_items[i]);
                    }
                    }
                return foundItems;
                  //return foundItems
             });
             
         };

           service.removeItem = function (itemIndex) {
                    foundItems.splice(itemIndex, 1);
                };
     } ; 

    function MenuSearchFactory() {
    var factory = function () {
        return new MenuSearchService();
    };

    return factory;
    }

}());