'use strict';

angular.module('mohsen1.json-schema-view', []).directive('jsonSchemaView', function () {
  var value = 0;

  return {
    restrict: 'AE',
    templateUrl: 'json-schema-view.html',
    replcae: true,
    scope: {
      'schema': '='
    },
    link: function ($scope) {
      $scope.properties = $scope.schema.properties.map(function (prop) {
        return prop;
      });

      /*
       * Returns true if property is required in given schema
      */
      $scope.isRequired = function(property, schema){
        schema = schema || $scope.schema;

        if (Array.isArray(schema.required) && property.name) {
          return schema.required.indexOf(property.name) > -1;
        }

        return false;
      };
    }
  };
});