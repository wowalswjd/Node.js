var M = {
  v:'v';
  f:function() {
    console.log(this.v);
  }
}

module.exports = M;
//m객체를 모듈 바깥에서 사용할 수 있도록 export하겠다
