/*
var M = {
  v:'v';
  f:function() {
    console.log(this.v);
  }
}
*/

var part = require('./mpart.js');
//변수 part는 모듈을 로딩한 결과를 파트에 담았는데 콘솔창에서 보면 객체가 들어있고
console.log(part);

//M.f();
part.f();
