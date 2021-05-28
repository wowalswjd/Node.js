var args = process.argv;
console.log(args[2]);
//위 코드를 args로 바꾸면 node.js runtime 위치, 현재 파일 경로, 입력값이 나옴
console.log('A');
console.log('B');
if(args[2]=='1') {
  //3번째 입력값이 1이면
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');
