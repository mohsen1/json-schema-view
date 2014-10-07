'use strict';

var app = angular.module('demo', ['ngSanitize', 'mohsen1.json-schema-view']);

app.controller('MainCtrl', function ($scope) {

  // A simple schema with only on string property
  $scope.string = {
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