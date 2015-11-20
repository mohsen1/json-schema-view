# JSON Schema View

[![Build Status](https://travis-ci.org/mohsen1/json-schema-view.svg?branch=master)](https://travis-ci.org/mohsen1/json-schema-view)

**An AngularJS directive for rendering JSON Schema in HTML.**

JSON Schema is very verbose and hard to read in JSON. This directive helps rendering a JSON Schema in a user readable format.

The same module is also available in pure JavaScript with no dependencies. **Check it out [here](https://github.com/mohsen1/json-schema-view-js)**

[Try it in action](http://azimi.me/json-schema-view/demo/demo.html)

[![Screenshot](/images/screenshot.png?raw=true)](http://mohsenweb.com/json-schema-view/demo/demo.html)

### Installation

Install via bower

```shell
bower install json-schema-view --save
```

### Usage

Add it as a dependency to your app and then use `<json-schema-view>` in your HTML as following

```js
angular.module('myApp', ['...', 'mohsen1.json-schema-view']);
```

```html
<json-schema-view schema="{properties: {value: {type: 'string'}}}" open="2"></json-schema-view>
```

* **`schema`**(**required**) attribute will accepts a schema object 
* **`open`** attribute accepts a number that indicates how many levels deep the schema should be open

### Development

Install Gulp via npm if you don't have it
```shell
npm install -g gulp
```

#### Available commands

* `gulp`: build and test the project
* `gulp build`: build the project and make new files in`dist`
* `gulp serve`: start a server to serve the demo page and launch a browser then watches for changes in `src` files to reload the page. It also runs tests and keep test browser open for development. Watches for changes in source and test files to re-run the tests
* `gulp test`: run tests

### License
MIT
