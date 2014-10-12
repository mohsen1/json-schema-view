'use strict';

var app = angular.module('demo', ['mohsen1.json-schema-view', 'jsonFormatter']);

app.controller('MainCtrl', function ($scope) {

  var types = {
    properties: {
      name: {
        type: "string"
      }
    }
  };

  $scope.types = angular.copy(types);
  $scope.typesJson = angular.copy(types)


  // A simple schema with only on string property
  $scope.sample = {
    title: 'Person',
    description: 'A person in our database',
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      age: {
        type: 'integer',
        format: 'int64',
        minimum: 0
      },
      email: {
        type: 'string'
      },
      single: {
        type: 'boolean'
      },
      school: {
        type: 'object',
        title: 'School',
        description: 'A School',
        properties: {
          name: {
            type: 'string'
          },
          district: {
            type: 'string'
          }
        },
        required: ['name']
      },
      interests: {
        type: 'array',
        items: {
          title: 'Interest',
          description: 'An interest',
          properties: {
            name: {
              type: 'string'
            }
          },
          required: ['name']
        }
      }
    },
    required: ['name', 'age']
  };
});