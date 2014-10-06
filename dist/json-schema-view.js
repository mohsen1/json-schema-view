/*!
 * angular-directive-boilerplate
 * https://github.com/mohsen1/angular-directive-boilerplate
 * Version: 0.0.7 - 2014-10-06T18:27:10.978Z
 * License: MIT
 */


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
angular.module("mohsen1.json-schema-view").run(["$templateCache", function($templateCache) {$templateCache.put("json-schema-view.html","<div class=\"json-schema-view\"><div>The value is {{getValue()}}</div><button ng-click=\"increment()\">+</button></div>");}]);