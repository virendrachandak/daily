"use strict";   //JSHint:use the function form of "use strict";

/**
 * Eliminate with
 */
with (location) { //JSHint: "with" is not allowed in strict mode
  alert(href);    //JSHint: alert is not defined;
}

/**
 * Prevents accidental globals
 */
(function() {
  someUndeclaredVar = "foo";  //JSHint: 'someundeclaredvar' is not declared
})();

/**
 * Eliminates this coercion
 */
window.color = "red";   //JSHint: 'window' in not defined
function sayColor() {
  alert(this.color);  //JSHint: possible strict violation
}

// Throws an error in strict mode, "red" otherwise
sayColor();

// Throws an error in strict mode, "red" otherwise
sayColor.call(null);

function Person(name) {
  this.name = name;
}

// Error in strict mode
var me = Person("Nicholas");  //JSHint: Missing 'new' prefix when invoking a constructor

/**
 * No duplicates
 */
// Error in strict mode - duplicate arguments
function doSomething(value1, value2, value1) {  //JSHint: 'value1' is already defined
  // code
}

// Error in strict mode - duplicate properties
var object = {
  foo: "bar",
  foo: "baz"  //JSHint: duplicate key 'foo'
}

/**
 * Safer eval()
 */

(function () {
  eval("var x = 10;");

  // Non-strict mode, alerts 10
  // Strict mode, throws an error because x is undeclared
  alert(x);
}());


// You can return a value from eval
(function() {
  var result = eval("var x = 10, y = 20; x + y");

  // Works in strict and non-strict mode (30)
  alert(result);
}());

/**
 * Errors for immutables
 */
var person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Nicholas"
});

// Fails silently in non-strict mode, throws error in strict mode
person.name = "John";

// If using any of ECMAScript attribute capabilities, strongly encourage you to use strict mode.
