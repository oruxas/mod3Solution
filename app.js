( function(){ 
    angular.module('NarrowItDownApp',[])

    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective);



    function FoundItemsDirective(){
        var ddo = {                         //directive definition object
            template: '<div> <ul > <li ng-repeat="item in narrowit.items"> {{item.name}} ({{item.short_name}}) {{item.description}}  <button ng-click="narrowit.onRemove({index: $index})">Dont want this one</button></li> </ul></div>',
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
       narrowit.searchTerm="";
       //narrowit.showError = true;
       narrowit.getlist = function(searchTerm){
           console.log('click');
           if( (narrowit.searchTerm.length === 0 || (narrowit.searchTerm == ""))){
                narrowit.showError = true;
                console.log(narrowit.showError);
               narrowit.found = [];
              
           } else{
               
               MenuSearchService.getMatchedMenuItems(narrowit.searchTerm).then(function(result){
                // console.log(Object.getOwnPropertyNames(result)); 
                     narrowit.found = result;
                    console.log(narrowit.found);
                    narrowit.showError = false;
             }); 
           }
           
        }; //end of getList
        narrowit.removeItem = function (itemIndex) {
                    //console.log(itemIndex);
                  
                    narrowit.found.splice(itemIndex,1);
                   
                };  
    };

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