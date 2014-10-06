'use strict';

angular.module('mohsen1.json-schema-view', []).directive('jsonSchemaView', function () {
  var value = 0;

  return {
    restrict: 'E',
    templateUrl: 'json-schema-view.html',
    replcae: true,
    scope: {
      'schema': '='
    },
    link: function ($scope) {
      $scope.isCollapsed = false;
      $scope.properties = $scope.schema.properties.map(function (prop) {
        return prop;
      });

      /*
       * Returns true if property is required in given schema
      */
      $scope.isRequired = function(property, schema) {
        schema = schema || $scope.schema;

        if (Array.isArray(schema.required) && property.name) {
          return schema.required.indexOf(property.name) > -1;
        }

        return false;
      };

      $scope.toggle = function() {
        $scope.isCollapsed = !$scope.isCollapsed;
      };

      $scope.has = function(obj, propName) {
        return Object.keys(obj).indexOf(propName) > -1;
      };
    }
  };
});