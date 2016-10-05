( function(){ 
    angular.module('NarrowItDownApp',[])

    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);



    function FoundItemsDirective(){
        var ddo = {                         //directive definition object
            template: '<div> <ul ng-model="narrowit.found"> <li ng-repeat="item in narrowit.found">{{item.name}}</li> </ul></div>',
            restrict: 'E'
           
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['$scope','MenuSearchService']

    function NarrowItDownController($scope, MenuSearchService) {
       var narrowit = this;
       var tempArr = [];
       narrowit.getlist = function(searctTerm){
           // alert(narrowit.searchTerm);

             MenuSearchService.getMatchedMenuItems(narrowit.searchTerm).then(function(result){
                 console.log(Object.getOwnPropertyNames(result[0]));

                 for (var i = 0; i < result.length; i++){
                     tempArr.push(result[i]);
                 }
                 console.log(tempArr);
                 narrowit.found = tempArr;
            }); 

           
            
        }
        
      
    }

     MenuSearchService.$inject = ['$http'];
     function MenuSearchService($http){
         var service = this;

         service.getMatchedMenuItems = function (searchTerm) { //input searchTerms
             return $http({
                 method: "GET",
                 url: "https://davids-restaurant.herokuapp.com/menu_items.json"
             }).then(function(result){
                
                 //alert(JSON.stringify(result));
                var foundItems = [];
                //  for(var i = result.data.menu_items.length; i--;){
                //      for (key in result.data.menu_items[i]){
                //          if( result.data.menu_items[i].hasOwnProperty(key) && result.data.menu_items[key].indexOf(searchTerm) != -1 )
                         
                //             foundItems.push(result[i]);
                //             console.log(foundItems);
                //      }
                //  }
                var arr = result.data.menu_items;
                var matches = [];

                for (var i = arr.length; i--; ){
                    if(arr[i].description.match(searchTerm)){
                       foundItems.push(arr[i]);
                        //console.log(JSON.stringify(foundItems));
                    }
                    
                }
                return foundItems;
                  //return foundItems
             });
             
         };
     }  
}());