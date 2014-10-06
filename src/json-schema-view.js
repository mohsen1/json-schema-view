'use strict';

angular.module('mohsen1.json-schema-view', []).directive('jsonSchemaView', function () {
  var value = 0;

  return {
    restrict: 'AE',
    templateUrl: 'json-schema-view.html',
    replcae: true,
    link: function ($scope) {

      $scope.getValue = function () {
        return value;
      };
      $scope.increment = function () {
        value++;
      };
    }
  };
});