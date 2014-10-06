'use strict';

var app = angular.module('demo', ['ngSanitize', 'mohsen1.json-schema-view']);

app.controller('MainCtrl', function ($scope) {

  // A simple schema with only on string property
  $scope.string = {
    properties: [{
      name: 'value',
      type: 'string'
    }],
    required: ['value']
  };
})