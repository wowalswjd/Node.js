console.log(Math.round(1.6)); //2
//Math라는 객체에 있는 반올림 함수
console.log(Math.round(1.4)); //1

function sum(first, second) {
  //여기서 first와 second는 매개변수(=parameter)이며, 밑의 인자(2, 4)를 받아서 함수에 넣어줌
  console.log('a');
  return first+second;
  console.log('b'); //return을 만나면 함수는 실행종료됨!!!
  /*출력을 꼭 console창에만 출력할 필요는 없음. 텍스트 파일에 할 수도 있고,, 이메일로 결과를 보낼 수도 있음..
  return을 사용함으로써 first+second값을 콘솔창이나 print문으로만 출력하지 않고 다른 함수에 보내는 등 다양한 방법으로 출력할 수 있게 됨
  (즉 return은 1. 함수를 종료시킨다는 의미, 2. 값을 출력한다는 의미를 동시에 지님.)*/

}
console.log(sum(2,4)); //여기서 2와 4를 인자(=argument)라고 함
