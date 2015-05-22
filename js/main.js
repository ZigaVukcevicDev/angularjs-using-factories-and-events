angular.module('demo', []);

angular.module('demo').controller('DemoController', function($scope, ExampleFactory) {

    $scope.tasks = ExampleFactory.tasks();

    $scope.create = function(task) {
        ExampleFactory.create(task);
    }

    $scope.edit = function() {
        $scope.showItem = false; 
        $scope.showInput = true; 
        $scope.showEditButton = false;
        $scope.showCloseButton = true;
    }

    $scope.close = function() {
        $scope.showItem = true; 
        $scope.showInput = false; 
        $scope.showEditButton = true;
        $scope.showCloseButton = false;
    }

    $scope.remove = function(index) {
        ExampleFactory.remove(index);
    }
});

angular.module('demo').factory('ExampleFactory', function($rootScope) {
    var tasks = [];

    return {
        create : function(task) { 
            tasks.push(task);
            data = { msg : 'Nova naloga dodana.' };
            $rootScope.$broadcast('newTaskAddedEvent', data);
    },
        remove : function(index) { tasks.splice(index, 1) },
        tasks : function() { return tasks; }
    };
});

angular.module('demo').controller('EventController', function($scope) {
    $scope.$on('newTaskAddedEvent', function(event, data) {
        $scope.msg = data.msg;
    });
});