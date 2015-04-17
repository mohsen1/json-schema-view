'use strict';

var app = angular.module('demo', ['mohsen1.json-schema-view', 'jsonFormatter']);

app.controller('MainCtrl', function($scope) {

  $scope.schemas = [
    {
      title: 'Simple',
      schema: {
        title: 'Name',
        description: 'A name',
        type: 'string'
      }
    },

    {
      title: 'Object',
      schema: {
        type: 'object',
        title: 'Person',
        description: 'A simple person object',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'integer'
          }
        }
      }
    },

   {
      title: 'Array',
      schema: {
        type: 'array',
        title: 'Names',
        description: 'An array of names',
        items: {
          type: 'string'
        }
      }
    },

    {
      title: 'Primitive Enum',
      schema: {
        description: 'This string can only be one of predefined values',
        type: 'string',
        enum: ['one', 'two', 'three']
      }
    },

    {
      title: 'Object Enum',
      schema: {
        description: 'Car can only be one of two available options',
        type: 'object',
        title: 'Car',
        properties: {
          make: {type: 'string'},
          model: {type: 'string'}
        },
        enum: [
          {
            make: 'Toyota',
            model: 'Camry'
          },
          {
            make: 'Nissan',
            model: 'Rouge'
          }
        ]
      }
    },

    {
      title: 'Array Enum',
      schema: {
        description: 'ways to count 10 items',
        title: 'Numbers',
        type: 'array',
        maxItems: 10,
        minItems: 10,
        items: {type: 'string'},
        enum: [
          ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
          ['alpha', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa']
        ]
      }
    },

    {
      title: 'Required',
      schema: {
        properties: {
          accountNumber: {
            type: 'integer'
          }
        },
        required: ['accountNumber']
      }
    },

    {
      title: 'Title and Description',
      schema: {
        title: 'Person',
        description: 'A person schema that has name and age fields',
        properties: {
          name: {
            type: 'string'
          },
          age: {
            type: 'integer'
          }
        }
      }
    },

    {
      title: 'Format, Minimum, Maximum, MinLength, and MaxLength',
      schema: {
        properties: {
          accountNumber: {
            type: 'integer',
            format: 'int64',
            minimum: 400000,
            maximum: 900000
          },
          bankName: {
            type: 'string',
            minLength: 5,
            maxLength: 100
          }
        },
        required: ['accountNumber']
      }
    },

    {
      title: 'Nested Array and Objects',
      schema: {
        description: 'A teacher',
        properties: {
          name: {
            type: 'string'
          },
          students: {
            type: 'array',
            items: {
              type: 'integer'
            }
          },
          classes: {
            type: 'array',
            items: {
              properties: {
                id: {
                  type: 'integer'
                },
                name: {
                  type: 'string'
                }
              }
            }
          }
        }
      }
    },

    {
        title: 'Deep',
        schema: {
            title: 'Level 1',
            properties: {
                child: {
                    title: 'Level 2',
                    properties: {
                        child: {
                            title: 'Level 3',
                            properties: {
                                child: {
                                    title: 'Level 4',
                                    properties: {
                                        value: {
                                            type: 'string'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    {
      title: 'Complex',
      schema: {
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
      }
    },

    {
      title: 'Complex Array',
      schema: {
        title: 'ComplexArray',
        type: 'array',
        minItems: 1,
        maxItems: 100,
        uniqueItems: true,
        items: {
          type: 'string'
        }
      }
    }
  ];
});
