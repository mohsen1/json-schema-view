'use strict';

angular.module('mohsen1.json-schema-view', ['RecursionHelper'])

.directive('jsonSchemaView', function(RecursionHelper) {
  function link($scope) {
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
        Object.keys(schema.properties).forEach(function(propertyName) {
          schema.properties[propertyName].name = propertyName;
          addPropertyName(schema.properties[propertyName]);
        });
      }
    }

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

    /*
     * Converts anyOf, allOf and oneOf to human readable string
    */
    $scope.convertXOf = function(type) {
      return type.substring(0, 3) + ' of';
    };
    $scope.isCollapsed = $scope.open < 0;
    $scope.refresh = function() {
      if ($scope.schema && $scope.schema.$ref && $scope.refObject) {
        var keys = $scope.schema.$ref.split('/');
        if (keys[0] !== '#') throw new Error("Only local $refs are supported");
        keys.shift();
        var cur = $scope.refObject;
        keys.forEach(function(k) {cur = cur[k];});
        $scope.label = keys[keys.length - 1];
        if (!$scope.isCollapsed) {
          $scope.schema = cur;
        } else {
          $scope.schema.properties = {};
        }
      }

      addPropertyName($scope.schema);

      // Determine if a schema is an array
      $scope.isArray = $scope.schema && $scope.schema.type === 'array';

      // Determine if a schema is a primitive
      $scope.isPrimitive = $scope.schema &&
        !$scope.schema.properties &&
        !$scope.schema.items &&
        $scope.schema.type !== 'array' &&
        $scope.schema.type !== 'object';
    };

    $scope.$watch('isCollapsed', $scope.refresh);
    $scope.$watch('schema', $scope.refresh);
  }

  return {
    restrict: 'E',
    templateUrl: 'json-schema-view.html',
    replace: true,
    scope: {
      'schema': '=',
      'open': '=',
      'refObject': '=',
    },
    compile: function(element) {

      // Use the compile function from the RecursionHelper,
      // And return the linking function(s) which it returns
      return RecursionHelper.compile(element, link);
    }
  };
});
