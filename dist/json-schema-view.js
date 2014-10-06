/*!
 * angular-directive-boilerplate
 * https://github.com/mohsen1/angular-directive-boilerplate
 * Version: 0.0.7 - 2014-10-06T21:20:28.188Z
 * License: MIT
 */


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
    }
  };
});
angular.module("mohsen1.json-schema-view").run(["$templateCache", function($templateCache) {$templateCache.put("json-schema-view.html","<div class=\"json-schema-view\" ng-class=\"{collapsed: isCollapsed}\"><a class=\"toggler\" ng-click=\"toggle()\"></a> <span class=\"title\" ng-click=\"toggle()\">{{schema.title}}</span> <span class=\"opening brace\">{</span><div class=\"description\">{{schema.description}}</div><div class=\"property\" ng-repeat=\"property in properties\"><span class=\"name\">{{property.name}}</span> <span class=\"colon\">:</span> <span class=\"type\">{{property.type}}</span> <span class=\"required\" ng-if=\"isRequired(property, schema)\">*</span></div><span class=\"closeing brace\">}</span></div>");}]);