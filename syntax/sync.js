var fs = require('fs');
//fs모듈을 불러와서 변수 fs에 대입

//readFileSync
/*
console.log('A');
var result = fs.readFileSync('syntax/sampletext.txt', 'utf8');
console.log(result);
console.log('C');
*/

//readFile
console.log('A');
fs.readFile('syntax/sampletext.txt', 'utf8', function(err, result){
  console.log(result);
});
console.log('C');
