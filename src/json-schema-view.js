'use strict';

var module = angular.module('mohsen1.json-schema-view', ['RecursionHelper']);

module.directive('jsonSchemaView', function (RecursionHelper) {
  function link($scope) {
    $scope.isCollapsed = $scope.open < 1;

    // Determine if a schema is an array
    $scope.isArray = $scope.schema && $scope.schema.type === 'array';

    // Determine if a schema is a primitive
    $scope.isPrimitive = $scope.schema &&
      !$scope.schema.properties &&
      !$scope.schema.items &&
      $scope.schema.type !== 'array' &&
      $scope.schema.type !== 'object';

    /*
     * Toggles the 'collapsed' state
    */
    $scope.toggle = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    /*
     * Returns true if property is required in given schema
    */
    $scope.isRequired = function(schema) {
      var parent = $scope.$parent.schema;

      if (parent && Array.isArray(parent.required) && schema.name) {
        return parent.required.indexOf(schema.name) > -1;
      }

      return false;
    };

    /*
     * Returns true if the schema is too simple to be collapsible
    */
    $scope.isPrimitiveCollapsible = function() {
      return $scope.schema.description ||
        $scope.schema.title;
    };
  }

  return {
    restrict: 'E',
    templateUrl: 'json-schema-view.html',
    replcae: true,
    scope: {
      'schema': '=',
      'open': '='
    },
    compile: function(element) {

      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element, link);
    }
  };
});
