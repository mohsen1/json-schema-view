'use strict';

var module = angular.module('mohsen1.json-schema-view', ['RecursionHelper']);

module.directive('jsonSchemaView', function (RecursionHelper) {
  function link($scope) {
    $scope.isCollapsed = false;

    /*
     * Recursively walk the schema and add property 'name' to property objects
    */
    function addPropertyName(schema) {
      if (!schema) {
        return;
      }
      if (angular.isObject(schema.items)) {
        addPropertyName(schema.items);
      }
      else if (angular.isObject(schema.properties)) {
        Object.keys(schema.properties).forEach(function (propertyName) {
          schema.properties[propertyName].name = propertyName;
          addPropertyName(schema.properties[propertyName]);
        });
      }
    }

    addPropertyName($scope.schema);

    if ($scope.schema.type === 'array') {
      $scope.isArray = true;
      $scope.schema = $scope.schema.items;
    }

    /*
     * Toggles the 'collapsed' state
    */
    $scope.toggle = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };

    /*
     * Determines if a property is a primitive
    */
    $scope.isPrimitive = function(property){
      return ['string', 'boolean', 'integer', 'int'].indexOf(property.type) > -1;
    };
  }
  return {
    restrict: 'E',
    templateUrl: 'json-schema-view.html',
    replcae: true,
    scope: {
      'schema': '='
    },
    compile: function(element) {

      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element, link);
    }
  };
});

module.directive('primitiveProperty', function (RecursionHelper) {
  function link($scope) {

    /*
     * Returns true if property is required in given schema
    */
    $scope.isRequired = function(property, schema) {
      schema = schema || $scope.$parent.schema;

      if (Array.isArray(schema.required) && property.name) {
        return schema.required.indexOf(property.name) > -1;
      }

      return false;
    };

    /*
     * Checks and see if an object (_obj_) has a member with _propName_ name
    */
    $scope.has = function(obj, propName) {
      return Object.keys(obj).indexOf(propName) > -1;
    };
    }
  return {
    restrict: 'E',
    templateUrl: 'primitive.html',
    replcae: true,
    scope: {
      property: '='
    },
    compile: function(element) {

      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element, link);
    }
  };
});