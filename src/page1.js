import module1 from './module1';
import module2 from './module2';
import $ from 'jquery';

console.log(module1);
console.log(module2);
console.log($);

import(/* webpackChunkName: 'asyncModule1' */ './asyncModule1').then(
  (result) => {
    console.log(result);
  }
);
