angular.module('PizzaApp', [])

.controller('PizzaController', ['$scope', 'LocalStorageService', function($scope, LocalStorageService) {
    $scope.Sizes = [{
        name: "Select Size"
    }, {
        name: "Small [10\"]"
    }, {
        name: "Medium [12\"]"
    }, {
        name: "Large [14\"]"
    }];

    $scope.Size = $scope.Sizes[0];

    $scope.Crusts = [{
        name: "Hand Tossed"
    }, {
        name: "Handmade Pan"
    }, {
        name: "Crunchy Thin Crust"
    }, {
        name: "Brooklyn Style"
    }, {
        name: "Gluten Free Crust"
    }];

    $scope.Crust = $scope.Crusts[0];

    $scope.Cheeses = [{
        name: "Cheese"
    }, {
        name: "Double Cheese"
    }, {
        name: "No Cheese"
    }];

    $scope.Cheese = $scope.Cheeses[0];

    $scope.Sauces = [{
        name: "Select Sauce"
    }, {
        name: "Robust Inpired Tomato Sauce"
    }, {
        name: "Hearty Marinara Sauce"
    }, {
        name: "BBQ Sauce"
    }, {
        name: "Garlic Parmesan White Sauce"
    }, {
        name: "Alfredo Sauce"
    }, {
        name: "No Sauce"
    }];

    $scope.Sauce = $scope.Sauces[0];

    $scope.Toppings = [
        
        {name: 'Pepperoni'},
        {name: 'Italian Sausage'},
        {name: 'Sliced Italian Sausage'},
        {name: 'Beef'},
        {name: 'Philly Steak'},
        {name: 'Ham'},
        {name: 'Bacon'},
        {name: 'Salami'},
        {name: 'Premium Chicken'},
        {name: 'Cheedar Cheese'},
        {name: 'Shredded Parmesan Assiago'},
        {name: 'Shredded Provolone Cheese'},
        {name: 'Banana Peppers'},
        {name: 'Black Olives'},
        {name: 'Green Peppers'},
        {name: 'Jalapeno Peppers'},
        {name: 'Mushrooms'},
        {name: 'Pineapple'},
        {name: 'Roasted Red Peppers'},
        {name: 'Spinach'},
        {name: 'Diced Tomatoes'},
        {name: 'Hot Sauce'}
    ];
    
    $scope.SelectedToppings = [];
    
    //$scope.BuiltPizza = [];
    
    $scope.clean = function(){
        $scope.BuiltPizza = [];
        console.log(angular.toJson($scope.BuiltPizza));
        return LocalStorageService.setData('my-storage', angular.toJson($scope.BuiltPizza));
        
    };
    
    $scope.update = function(Topping) {

        $scope.SelectedToppings.push(Topping);
        
    };
    
    $scope.remove = function($index){

		$scope.SelectedToppings.splice($index, 1);
		
	};
	
	$scope.select = function($index)
    {
        // $scope.pizza = $scope.BuiltPizza[$index];
        
        var i = $index;
        
        $scope.ind = function(i)
        {
            return i;
        };
        
        $scope.pizza = $scope.BuiltPizza[$scope.BuiltPizza.findIndex($scope.ind)];
        console.log("works");
    };
	
	$scope.removePizza = function($index){
	    $scope.BuiltPizza.splice($index, 1);
	    return LocalStorageService.setData('my-storage', angular.toJson($scope.BuiltPizza));
	};
	
	$scope.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
	
	$scope.updatePizza = function (){
	    $scope.BuiltPizza = $scope.latestData();
	    
	    if($scope.BuiltPizza == null){
	        console.log("There are no pizzas");
			$scope.BuiltPizza = [];
		}else{
		    console.log("There are pizzas");
		}
		
	    $scope.pizza = { 
	        name: "Your Pizza",
	        crust: $scope.Crust, 
	        size: $scope.Size, 
	        cheese: $scope.Cheese, 
	        sauce: $scope.Sauce,
	        toppings: $scope.SelectedToppings
	    };
	    
	    $scope.BuiltPizza.push($scope.pizza);
	    
	    console.log(angular.toJson($scope.BuiltPizza));
	    
	    return LocalStorageService.setData('my-storage', angular.toJson($scope.BuiltPizza));
	};
    
    $scope.BuiltPizza = $scope.latestData();
    if($scope.BuiltPizza == null){
	    console.log("There are no pizzas");
	    $scope.BuiltPizza = [];
	}else{
		console.log("There are pizzas");
    }


}])

.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});