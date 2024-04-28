document.querySelector('.btn1').addEventListener('click', function() {
  document.querySelector('.image-wrap').style.transform = 'translate(0px)';
});
document.querySelector('.btn2').addEventListener('click', function() {
  document.querySelector('.image-wrap').style.transform = 'translate(-1000px)';
});
document.querySelector('.btn3').addEventListener('click', function() {
  document.querySelector('.image-wrap').style.transform = 'translate(-2000px)';
});
document.querySelector('.btn4').addEventListener('click', function() {
  document.querySelector('.image-wrap').style.transform = 'translate(-3000px)';
});
document.querySelector('.btn5').addEventListener('click', function() {
  document.querySelector('.image-wrap').style.transform = 'translate(-4000px)';
});

//? 1. 다음 / 이전 버튼 만들기
//? 2. 확장성잡기 (그림 / 버튼이 몇 개여도 잘 동작하게 하려면?)