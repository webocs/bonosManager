// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-example-angular
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('ComprasController', ['$scope', '$state', 'Compra', function($scope,
      $state, Compra) {
    $scope.compras = [];
    function getCompras() {
      Compra
        .find()
        .$promise
        .then(function(results) {
          console.log(results);
          $scope.compras = results;
        });
    }
    getCompras();

    /*$scope.addCompra = function() {
      Todo
        .create($scope.newTodo)
        .$promise
        .then(function(todo) {
          $scope.newTodo = '';
          $scope.todoForm.content.$setPristine();
          $('.focus').focus();
          getTodos();
        });
    };

    $scope.removeTodo = function(item) {
      Todo
        .deleteById(item)
        .$promise
        .then(function() {
          getTodos();
        });
    };*/
  }]);
